'use client'; // This is crucial for Next.js 13+ App Router

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

// GLSL Shaders
const vertexShader = `
  uniform float uTime;
  uniform float uWaveFrequency;
  uniform float uWaveAmplitude;
  uniform float uNoiseScale;
  uniform float uNoiseSpeed;

  varying vec2 vUv;
  varying float vDisplacement;
  varying vec3 vNormal;
  varying vec3 vWorldPosition;

  // Classic Perlin 3D noise
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  vec3 fade(vec3 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }

  float cnoise(vec3 P) {
    vec3 Pi0 = floor(P); // Integer part for indexing
    vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
    Pi0 = mod289(Pi0);
    Pi1 = mod289(Pi1);
    vec3 Pf0 = fract(P); // Fractional part for interpolation
    vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = Pi0.zzzz;
    vec4 iz1 = Pi1.zzzz;

    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0);
    vec4 ixy1 = permute(ixy + iz1);

    vec4 gx0 = ixy0 * (1.0 / 7.0);
    vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
    gx0 = fract(gx0);
    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
    vec4 sz0 = step(gz0, vec4(0.0));
    gx0 -= sz0 * (step(0.0, gx0) - 0.5);
    gy0 -= sz0 * (step(0.0, gy0) - 0.5);

    vec4 gx1 = ixy1 * (1.0 / 7.0);
    vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
    gx1 = fract(gx1);
    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
    vec4 sz1 = step(gz1, vec4(0.0));
    gx1 -= sz1 * (step(0.0, gx1) - 0.5);
    gy1 -= sz1 * (step(0.0, gy1) - 0.5);

    vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
    vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
    vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
    vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
    vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
    vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
    vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
    vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
    g000 *= norm0.x;
    g010 *= norm0.y;
    g100 *= norm0.z;
    g110 *= norm0.w;
    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
    g001 *= norm1.x;
    g011 *= norm1.y;
    g101 *= norm1.z;
    g111 *= norm1.w;

    float n000 = dot(g000, Pf0);
    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
    float n111 = dot(g111, Pf1);

    vec3 fade_xyz = fade(Pf0);
    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
    return 2.2 * n_xyz;
  }

  // Function to compute normal using finite differences
  vec3 getNormal(vec3 pos, float epsilon) {
    float noise1 = cnoise(pos * uNoiseScale + uTime * uNoiseSpeed);
    float noiseX = cnoise(vec3(pos.x + epsilon, pos.y, pos.z) * uNoiseScale + uTime * uNoiseSpeed);
    float noiseY = cnoise(vec3(pos.x, pos.y + epsilon, pos.z) * uNoiseScale + uTime * uNoiseSpeed);
    float noiseZ = cnoise(vec3(pos.x, pos.y, pos.z + epsilon) * uNoiseScale + uTime * uNoiseSpeed);

    vec3 tangent = vec3(epsilon, 0.0, noiseX - noise1);
    vec3 bitangent = vec3(0.0, epsilon, noiseY - noise1);
    // vec3 normalVec = normalize(cross(bitangent, tangent)); // This might be reversed depending on coord system
    
    // Simplified normal calculation based on displacement gradient
    // This is an approximation and might need refinement for perfect normals
    vec3 displacedPos = position + normal * noise1 * uWaveAmplitude;
    vec3 displacedPosX = position + normal * noiseX * uWaveAmplitude;
    vec3 displacedPosY = position + normal * noiseY * uWaveAmplitude;

    vec3 tangentX = displacedPosX - displacedPos;
    vec3 tangentY = displacedPosY - displacedPos;

    return normalize(cross(tangentY, tangentX)); // Corrected order for outward normal
  }


  void main() {
    vUv = uv;
    vec3 pos = position;

    // Multiple layers of noise for more complex waves
    float noise = 0.0;
    float frequency = uWaveFrequency;
    float amplitude = uWaveAmplitude;
    for (int i = 0; i < 4; i++) {
        noise += cnoise(pos * frequency * uNoiseScale + uTime * uNoiseSpeed * (float(i)*0.5 + 1.0)) * amplitude;
        frequency *= 2.0; // Increase frequency for smaller details
        amplitude *= 0.5; // Decrease amplitude for smaller details
    }
    
    vDisplacement = noise;

    vec3 displacedPosition = pos + normal * noise;
    
    // Calculate normal for lighting based on displaced surface
    // This is a tricky part. We can approximate it or pass it from vertex to fragment.
    // For a sphere, the 'normal' attribute is already the outward direction.
    // We need to perturb this normal based on the wave.
    // A more accurate way would be to calculate derivatives of the noise function.
    // For simplicity, we can use the original normal for now and improve later.
    // Or, calculate it via finite differences (more expensive).
    vNormal = normalize(normal + vec3(noise * 0.1)); // Simple perturbation, can be improved
    // vNormal = getNormal(position, 0.01); // Using finite differences (can be slow)
    // A common way:
    float eps = 0.001;
    vec3 tangent = normalize(cross(normal, vec3(0.0, 1.0, 0.0))); // approx tangent
    if (length(tangent) < 0.1) tangent = normalize(cross(normal, vec3(1.0, 0.0, 0.0))); // handle poles
    vec3 bitangent = normalize(cross(normal, tangent));

    float noiseX = 0.0;
    float noiseY = 0.0;
    frequency = uWaveFrequency;
    amplitude = uWaveAmplitude;
     for (int i = 0; i < 4; i++) {
        noiseX += cnoise((pos + tangent * eps) * frequency * uNoiseScale + uTime * uNoiseSpeed * (float(i)*0.5 + 1.0)) * amplitude;
        noiseY += cnoise((pos + bitangent * eps) * frequency * uNoiseScale + uTime * uNoiseSpeed * (float(i)*0.5 + 1.0)) * amplitude;
        frequency *= 2.0;
        amplitude *= 0.5;
    }
    
    vec3 grad = vec3(
      (noiseX - noise) / eps,
      (noiseY - noise) / eps,
      0.0 // this isn't quite right for Z, but often normal is primarily XY perturbed
    );
    // Transform gradient to world space and combine with original normal
    // This part is complex and often requires careful derivation or approximation
    // For now, let's stick with a simpler normal perturbation or just use the base normal for lighting.
    // vNormal = normalize(normal - grad * 0.1); // Attempt to use gradient
    // For robustness, using a less physically accurate but stable normal:
     vNormal = normalize( normalMatrix * (normal + vec3(vDisplacement * 0.2, vDisplacement * 0.3, vDisplacement * 0.15)));


    gl_Position = projectionMatrix * modelViewMatrix * vec4(displacedPosition, 1.0);
    vWorldPosition = (modelMatrix * vec4(displacedPosition, 1.0)).xyz;
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec3 uBaseColor;
  uniform vec3 uDeepColor;
  uniform vec3 uShallowColor;
  uniform float uFresnelPower;
  uniform float uFresnelMultiplier;
  uniform vec3 uSunDirection;
  uniform vec3 uSunColor;
  uniform float uShininess;

  varying vec2 vUv;
  varying float vDisplacement;
  varying vec3 vNormal;
  varying vec3 vWorldPosition;

  void main() {
    vec3 norm = normalize(vNormal);
    vec3 viewDirection = normalize(cameraPosition - vWorldPosition);

    // Fresnel effect
    float fresnel = pow(1.0 - abs(dot(viewDirection, norm)), uFresnelPower) * uFresnelMultiplier;
    fresnel = clamp(fresnel, 0.0, 1.0);

    // Diffuse lighting
    float diffuse = max(0.0, dot(norm, normalize(uSunDirection)));
    vec3 diffuseColor = uSunColor * diffuse;

    // Specular highlights (Phong-like)
    vec3 reflectionDirection = reflect(-normalize(uSunDirection), norm);
    float specular = pow(max(0.0, dot(viewDirection, reflectionDirection)), uShininess);
    vec3 specularColor = uSunColor * specular * (1.0 - fresnel); // Modulate by fresnel

    // Base water color (mix between deep and shallow based on displacement or view angle)
    // float depthFactor = smoothstep(-0.1, 0.1, vDisplacement); // Based on wave height
    float depthFactor = smoothstep(0.0, 0.5, abs(dot(viewDirection, norm))); // Based on view angle (more grazing = shallower)
    vec3 waterColor = mix(uDeepColor, uShallowColor, depthFactor);
    
    // Combine colors
    vec3 color = waterColor * (0.5 + diffuse * 0.5); // Ambient + Diffuse
    color += specularColor * 0.8; // Add specular
    color = mix(color, vec3(1.0), fresnel * 0.5); // Add fresnel reflections (sky color like)
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

const PlanetScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0, y: 0 }); // Target rotation based on mouse
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensure code runs only on client
  }, []);

  useEffect(() => {
    if (!isClient || !mountRef.current) return;

    const currentMount = mountRef.current; // Capture current value

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 2.5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(2, 2, 2);
    scene.add(directionalLight);

    // Sphere
    const geometry = new THREE.SphereGeometry(1, 128, 128); // Higher segments for smoother waves
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uWaveFrequency: { value: 2.0 }, // Higher frequency = more, smaller waves
        uWaveAmplitude: { value: 0.15 }, // Higher amplitude = taller waves
        uNoiseScale: { value: 1.5 },    // Scale of the noise pattern
        uNoiseSpeed: { value: 0.1 },    // How fast the noise evolves

        uBaseColor: { value: new THREE.Color(0x003366) }, // Dark blue
        uDeepColor: { value: new THREE.Color(0x001f3f) },
        uShallowColor: { value: new THREE.Color(0x0077cc) },
        uFresnelPower: { value: 3.0 },
        uFresnelMultiplier: { value: 0.8 },
        uSunDirection: { value: directionalLight.position.clone().normalize() },
        uSunColor: { value: new THREE.Color(0xffffee) }, // Slightly yellowish sun
        uShininess: { value: 100.0 }
      },
      // wireframe: true, // For debugging
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Mouse move listener
    const handleMouseMove = (event: MouseEvent) => {
      mousePosRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mousePosRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

      // Update target rotation (map mouse X to Y-axis rotation, mouse Y to X-axis rotation)
      targetRotationRef.current.y = mousePosRef.current.x * Math.PI * 0.3; // Rotate around Y-axis
      targetRotationRef.current.x = mousePosRef.current.y * Math.PI * 0.3; // Rotate around X-axis
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      material.uniforms.uTime.value = elapsedTime;

      // Smoothly interpolate sphere rotation towards target using GSAP
      gsap.to(sphere.rotation, {
        x: targetRotationRef.current.x,
        y: targetRotationRef.current.y,
        duration: 1.0, // Duration of the smoothing
        ease: 'power2.out',
      });
      // sphere.rotation.x += 0.001; // Optional base rotation
      // sphere.rotation.y += 0.0005;

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (currentMount) { // Check if currentMount is still valid
        camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
      }
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (currentMount && renderer.domElement) { // Check if renderer.domElement exists
        currentMount.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      // Dispose other Three.js objects if necessary
    };
  }, [isClient]); // Re-run effect if isClient changes (only once after client mount)

  if (!isClient) {
    return null; // Or a loading spinner, or static fallback
  }

  return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />;
};

export default PlanetScene;