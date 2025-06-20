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

// 'use client';

// import React, { useRef, useEffect, useState, useMemo } from 'react';
// import * as THREE from 'three';
// import { gsap } from 'gsap';

// // --- Shaders ---
// const vertexShader = `
//   uniform sampler2D uDisplacementMap;
//   uniform float uDisplacementScale;
//   uniform float uCurrentFrame; // For sprite sheet
//   uniform float uTotalFrames;  // For sprite sheet
//   uniform vec2 uSpriteSheetSize; // e.g., vec2(4.0, 4.0) for a 4x4 grid

//   varying vec2 vUv;
//   varying vec3 vNormal;
//   varying vec3 vWorldPosition;
//   varying float vDisplacementVal;


//   void main() {
//     vUv = uv;
//     vec2 currentUv = uv;

//     // --- If using a sprite sheet for displacement ---
//     // float frameX = mod(uCurrentFrame, uSpriteSheetSize.x);
//     // float frameY = floor(uCurrentFrame / uSpriteSheetSize.x);
//     // currentUv.x = (currentUv.x + frameX) / uSpriteSheetSize.x;
//     // currentUv.y = (currentUv.y + frameY) / uSpriteSheetSize.y;
//     // For sprite sheets, ensure UVs are correctly scaled and offsetted per frame.
//     // This example assumes individual textures per frame for simplicity below.

//     vec4 displacementTex = texture2D(uDisplacementMap, vUv); // Use vUv if individual textures
//     // vec4 displacementTex = texture2D(uDisplacementMap, currentUv); // Use currentUv if sprite sheet

//     // Assuming displacement map stores height in R channel (0-1 range)
//     // Or if it's a vector displacement map, it might be in RGB
//     float displacement = displacementTex.r * uDisplacementScale;
//     vDisplacementVal = displacement; // Pass to fragment for potential use

//     vec3 displacedPosition = position + normal * displacement;
    
//     // Normals will be primarily handled by the normal map in fragment shader
//     // but we still need a base normal for world position calculation
//     vNormal = normalize(normalMatrix * normal); // Transformed normal
//     vWorldPosition = (modelMatrix * vec4(displacedPosition, 1.0)).xyz;

//     gl_Position = projectionMatrix * modelViewMatrix * vec4(displacedPosition, 1.0);
//   }
// `;

// const fragmentShader = `
//   uniform sampler2D uNormalMap;
//   uniform sampler2D uFoamMap;
//   // uniform float uCurrentFrame; // For sprite sheet logic if needed here too
//   // uniform float uTotalFrames;
//   // uniform vec2 uSpriteSheetSize;


//   uniform vec3 uDeepWaterColor;
//   uniform vec3 uShallowWaterColor;
//   uniform vec3 uFoamColor;
//   uniform float uFresnelPower;
//   uniform float uFresnelMultiplier;
//   uniform vec3 uSunDirection;
//   uniform vec3 uSunColor;
//   uniform float uShininess;

//   varying vec2 vUv;
//   varying vec3 vNormal; // Base normal from vertex shader
//   varying vec3 vWorldPosition;
//   varying float vDisplacementVal; // Height of wave, can be used for color

//   // Function to unpack normal map
//   vec3 unpackNormal(vec4 nmap) {
//     return normalize(nmap.xyz * 2.0 - 1.0);
//   }

//   void main() {
//     vec2 currentUv = vUv;
//     // --- Sprite sheet UV calculation for normal/foam if needed ---
//     // float frameX = mod(uCurrentFrame, uSpriteSheetSize.x);
//     // float frameY = floor(uCurrentFrame / uSpriteSheetSize.x);
//     // currentUv.x = (currentUv.x + frameX) / uSpriteSheetSize.x;
//     // currentUv.y = (currentUv.y + frameY) / uSpriteSheetSize.y;
//     // This part requires careful UV setup for sprite sheets.

//     vec3 mapNormal = texture2D(uNormalMap, currentUv).xyz; // Use vUv for individual textures
//     mapNormal = normalize(mapNormal * 2.0 - 1.0); // Assuming normal map is in 0-1 range

//     // Transform normal from tangent space (if baked that way) to world space
//     // This usually requires TBN matrix (Tangent, Bitangent, Normal)
//     // For a sphere, if normal map is baked in object/world space relative to sphere,
//     // you might not need full TBN, but it's more robust.
//     // For simplicity, let's assume the baked normal map is somewhat aligned or we use a simplified approach.
//     // A proper TBN calculation:
//     // vec3 N = normalize(vNormal); // Interpolated vertex normal
//     // vec3 T = normalize(cross(N, vec3(0.0, 1.0, 0.0))); // approx tangent
//     // if (length(T) < 0.1) T = normalize(cross(N, vec3(1.0, 0.0, 0.0)));
//     // vec3 B = normalize(cross(N, T));
//     // mat3 tbn = mat3(T, B, N);
//     // vec3 finalNormal = normalize(tbn * mapNormal);
//     // For now, let's assume mapNormal is close enough or use the vertex normal for primary direction
//     vec3 finalNormal = normalize(vNormal + mapNormal * 0.5); // Crude blend, TBN is better

//     vec3 viewDirection = normalize(cameraPosition - vWorldPosition);

//     // Fresnel
//     float fresnel = pow(1.0 - abs(dot(viewDirection, finalNormal)), uFresnelPower) * uFresnelMultiplier;
//     fresnel = clamp(fresnel, 0.0, 1.0);

//     // Diffuse
//     float diffuse = max(0.0, dot(finalNormal, normalize(uSunDirection)));
//     vec3 diffuseColor = uSunColor * diffuse;

//     // Specular
//     vec3 reflectionDirection = reflect(-normalize(uSunDirection), finalNormal);
//     float specular = pow(max(0.0, dot(viewDirection, reflectionDirection)), uShininess);
//     vec3 specularColor = uSunColor * specular;

//     // Water Color (can be influenced by wave height/displacement)
//     float depthFactor = smoothstep(0.0, 0.1, vDisplacementVal); // Based on wave height
//     vec3 waterColor = mix(uDeepWaterColor, uShallowWaterColor, depthFactor);
    
//     // Foam
//     float foamAmount = texture2D(uFoamMap, currentUv).r; // Assuming foam is in R channel
    
//     vec3 color = waterColor * (0.3 + diffuse * 0.7); // Ambient + Diffuse
//     color += specularColor * 0.8;
//     color = mix(color, uFoamColor, foamAmount); // Add foam
//     color = mix(color, vec3(1.0), fresnel * 0.6); // Fresnel reflections (sky color like)
    
//     gl_FragColor = vec4(color, 1.0);
//   }
// `;


// const PLANET_RADIUS = 1;
// const ANIMATION_FPS = 30; // Match your baked sequence FPS
// const TOTAL_FRAMES = 150; // Total frames in your baked sequence

// const PlanetScene: React.FC = () => {
//   const mountRef = useRef<HTMLDivElement>(null);
//   const mousePosRef = useRef({ x: 0, y: 0 });
//   const targetRotationRef = useRef({ x: 0, y: 0 });
//   const [isClient, setIsClient] = useState(false);
//   const [texturesLoaded, setTexturesLoaded] = useState(false);

//   // Refs for textures to avoid re-creation
//   const displacementMapsRef = useRef<THREE.Texture[]>([]);
//   const normalMapsRef = useRef<THREE.Texture[]>([]);
//   const foamMapsRef = useRef<THREE.Texture[]>([]);
//   const materialRef = useRef<THREE.ShaderMaterial>();
//   const sphereRef = useRef<THREE.Mesh>();

//   const currentFrameRef = useRef(0);

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   // Load textures
//   useEffect(() => {
//     if (!isClient) return;

//     const textureLoader = new THREE.TextureLoader();
//     const loadPromises: Promise<THREE.Texture>[] = [];

//     // --- IMPORTANT: Update paths to your baked texture sequences ---
//     // Example: public/textures/displacement/disp_0001.png
//     //          public/textures/normal/norm_0001.png
//     //          public/textures/foam/foam_0001.png
//     const basePathDisp = '/textures/ocean_baked/displacement/disp_';
//     const basePathNorm = '/textures/ocean_baked/normal/norm_';
//     const basePathFoam = '/textures/ocean_baked/foam/foam_';
//     const extension = '.png'; // or .exr if you manage to load them

//     for (let i = 0; i < TOTAL_FRAMES; i++) {
//       const frameNumber = String(i).padStart(4, '0'); // e.g., 0000, 0001
      
//       loadPromises.push(textureLoader.loadAsync(`${basePathDisp}${frameNumber}${extension}`));
//       loadPromises.push(textureLoader.loadAsync(`${basePathNorm}${frameNumber}${extension}`));
//       loadPromises.push(textureLoader.loadAsync(`${basePathFoam}${frameNumber}${extension}`));
//     }

//     Promise.all(loadPromises).then(loadedTextures => {
//       displacementMapsRef.current = [];
//       normalMapsRef.current = [];
//       foamMapsRef.current = [];
//       for (let i = 0; i < TOTAL_FRAMES; i++) {
//         displacementMapsRef.current.push(loadedTextures[i * 3]);
//         normalMapsRef.current.push(loadedTextures[i * 3 + 1]);
//         foamMapsRef.current.push(loadedTextures[i * 3 + 2]);
//       }
//       setTexturesLoaded(true);
//       console.log('All textures loaded');
//     }).catch(err => console.error("Error loading textures:", err));

//   }, [isClient]);


//   useEffect(() => {
//     if (!isClient || !mountRef.current || !texturesLoaded || !materialRef.current) return;
    
//     // Initial texture setup
//     if (displacementMapsRef.current.length > 0) {
//         materialRef.current.uniforms.uDisplacementMap.value = displacementMapsRef.current[0];
//         materialRef.current.uniforms.uNormalMap.value = normalMapsRef.current[0];
//         materialRef.current.uniforms.uFoamMap.value = foamMapsRef.current[0];
//         materialRef.current.needsUpdate = true;
//     }

//   }, [isClient, texturesLoaded]);


//   useEffect(() => {
//     if (!isClient || !mountRef.current) return;

//     const currentMount = mountRef.current;

//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(
//       75,
//       currentMount.clientWidth / currentMount.clientHeight,
//       0.1,
//       1000
//     );
//     camera.position.z = PLANET_RADIUS * 2.5;

//     const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//     renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
//     renderer.setPixelRatio(window.devicePixelRatio);
//     currentMount.appendChild(renderer.domElement);

//     const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
//     scene.add(ambientLight);
//     const directionalLight = new THREE.DirectionalLight(0xffffff, 2.0);
//     directionalLight.position.set(3, 2, 3);
//     scene.add(directionalLight);

//     const geometry = new THREE.SphereGeometry(PLANET_RADIUS, 128, 128); // Segments may need adjustment
    
//     const material = new THREE.ShaderMaterial({
//       vertexShader,
//       fragmentShader,
//       uniforms: {
//         // --- Texture uniforms will be set once loaded ---
//         uDisplacementMap: { value: null },
//         uNormalMap: { value: null },
//         uFoamMap: { value: null },

//         uDisplacementScale: { value: 0.15 }, // Adjust based on your baked displacement values
        
//         // --- For Sprite Sheets (if you implement that way) ---
//         // uCurrentFrame: { value: 0.0 },
//         // uTotalFrames: { value: TOTAL_FRAMES_IN_SPRITESHEET },
//         // uSpriteSheetSize: { value: new THREE.Vector2(COLS, ROWS_IN_SPRITESHEET) },

//         uDeepWaterColor: { value: new THREE.Color(0x001e3d) },
//         uShallowWaterColor: { value: new THREE.Color(0x0077cc) },
//         uFoamColor: { value: new THREE.Color(0xffffff) },
//         uFresnelPower: { value: 4.0 },
//         uFresnelMultiplier: { value: 0.7 },
//         uSunDirection: { value: directionalLight.position.clone().normalize() },
//         uSunColor: { value: new THREE.Color(0xffffee) },
//         uShininess: { value: 80.0 }
//       },
//       // wireframe: true, // For debugging displacement
//     });
//     materialRef.current = material;

//     const sphere = new THREE.Mesh(geometry, material);
//     sphereRef.current = sphere;
//     scene.add(sphere);

//     const handleMouseMove = (event: MouseEvent) => {
//       mousePosRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
//       mousePosRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
//       targetRotationRef.current.y = mousePosRef.current.x * Math.PI * 0.2;
//       targetRotationRef.current.x = mousePosRef.current.y * Math.PI * 0.2;
//     };
//     window.addEventListener('mousemove', handleMouseMove);

//     const clock = new THREE.Clock();
//     let lastFrameUpdateTime = 0;

//     const animate = () => {
//       requestAnimationFrame(animate);
//       const elapsedTime = clock.getElapsedTime();

//       // Update frame for baked animation
//       if (texturesLoaded && materialRef.current && displacementMapsRef.current.length > 0) {
//         const frameInterval = 1 / ANIMATION_FPS;
//         if (elapsedTime - lastFrameUpdateTime > frameInterval) {
//           lastFrameUpdateTime = elapsedTime - ((elapsedTime - lastFrameUpdateTime) % frameInterval); // Keep sync
          
//           currentFrameRef.current = (currentFrameRef.current + 1) % TOTAL_FRAMES;
          
//           materialRef.current.uniforms.uDisplacementMap.value = displacementMapsRef.current[currentFrameRef.current];
//           materialRef.current.uniforms.uNormalMap.value = normalMapsRef.current[currentFrameRef.current];
//           materialRef.current.uniforms.uFoamMap.value = foamMapsRef.current[currentFrameRef.current];
          
//           // If using sprite sheet, update uCurrentFrame instead:
//           // materialRef.current.uniforms.uCurrentFrame.value = currentFrameRef.current;
//         }
//       }
      
//       if (sphereRef.current) {
//         gsap.to(sphereRef.current.rotation, {
//           x: targetRotationRef.current.x,
//           y: targetRotationRef.current.y,
//           duration: 0.8,
//           ease: 'power2.out',
//         });
//       }

//       renderer.render(scene, camera);
//     };

//     if (texturesLoaded) { // Start animation only after textures are ready (or at least material is defined)
//         animate();
//     } else {
//         // Fallback render loop if textures are still loading, or handle loading screen
//         const renderOnce = () => {
//             renderer.render(scene, camera);
//         }
//         renderOnce(); // Render a static frame
//         // A more robust loading would involve a loading indicator and only starting animate() once ready.
//         // This current setup might show a non-textured sphere briefly.
//         // The animate() call is now inside the texture loading promise resolution
//         // or a useEffect dependent on texturesLoaded
//     }
    
//     // This is a simplified startup, ideally animate() is called once everything is truly ready.
//     // Let's refine the startup:
//     let animationFrameId: number;
//     if (texturesLoaded && materialRef.current) { // Only start animation if textures and material are ready
//         animate();
//     } else {
//         // If not ready, we need a mechanism to start animate() once texturesLoaded becomes true
//         // This is handled by the useEffect that depends on [isClient, texturesLoaded]
//         // For the initial render before textures are loaded:
//         renderer.render(scene, camera); // Render a static frame
//     }


//     const handleResize = () => {
//       if (currentMount) {
//         camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
//         camera.updateProjectionMatrix();
//         renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
//       }
//     };
//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//       window.removeEventListener('resize', handleResize);
//       if (animationFrameId) cancelAnimationFrame(animationFrameId);
//       if (currentMount && renderer.domElement) {
//         currentMount.removeChild(renderer.domElement);
//       }
//       geometry.dispose();
//       material.dispose();
//       // Dispose all loaded textures
//       displacementMapsRef.current.forEach(tex => tex.dispose());
//       normalMapsRef.current.forEach(tex => tex.dispose());
//       foamMapsRef.current.forEach(tex => tex.dispose());
//       displacementMapsRef.current = [];
//       normalMapsRef.current = [];
//       foamMapsRef.current = [];
//     };
//   }, [isClient, texturesLoaded]); // Re-run if isClient or texturesLoaded changes

//   // This effect will kick off animation once textures are loaded and material is ready
//   useEffect(() => {
//     let animationFrameId: number;
//     const currentMount = mountRef.current; // To satisfy ESLint rules about dependencies

//     const animateLoop = () => {
//         animationFrameId = requestAnimationFrame(animateLoop);
//         const elapsedTime = clockRef.current.getElapsedTime(); // Assuming clockRef is defined similar to other refs

//         if (texturesLoaded && materialRef.current && sphereRef.current && displacementMapsRef.current.length > 0) {
//             const frameInterval = 1 / ANIMATION_FPS;
//             if (elapsedTime - lastFrameUpdateTimeRef.current > frameInterval) {
//                 lastFrameUpdateTimeRef.current = elapsedTime - ((elapsedTime - lastFrameUpdateTimeRef.current) % frameInterval);
//                 currentFrameRef.current = (currentFrameRef.current + 1) % TOTAL_FRAMES;
                
//                 materialRef.current.uniforms.uDisplacementMap.value = displacementMapsRef.current[currentFrameRef.current];
//                 materialRef.current.uniforms.uNormalMap.value = normalMapsRef.current[currentFrameRef.current];
//                 materialRef.current.uniforms.uFoamMap.value = foamMapsRef.current[currentFrameRef.current];
//             }
            
//             gsap.to(sphereRef.current.rotation, {
//                 x: targetRotationRef.current.x,
//                 y: targetRotationRef.current.y,
//                 duration: 0.8,
//                 ease: 'power2.out',
//             });
//         }
//         if (rendererRef.current && sceneRef.current && cameraRef.current) { // Assuming these refs are setup
//              rendererRef.current.render(sceneRef.current, cameraRef.current);
//         }
//     };


//     if (isClient && texturesLoaded && materialRef.current && sphereRef.current && mountRef.current) {
//         // Setup renderer, scene, camera refs here if not already global to this effect
//         // For brevity, I'm assuming they are accessible (e.g., via refs initialized in the main useEffect)
//         // This is getting complex, so simplifying the animate call.
//         // The main useEffect should handle the renderer and scene setup.
//         // We just need to ensure the animation loop starts.
//         // The original animate() function within the main useEffect is better.
//         // Let's refine the main useEffect's animate() call initiation.
//     }
    
//     // The previous animate() function inside the main useEffect is fine.
//     // The key is that it should only be called or effectively run its core logic
//     // when texturesLoaded is true.

//     return () => {
//         if (animationFrameId) cancelAnimationFrame(animationFrameId);
//     };
// }, [isClient, texturesLoaded]);

// // Refs for Three.js core objects to be accessible in the animation loop triggered by texture loading
// const sceneRef = useRef<THREE.Scene>();
// const cameraRef = useRef<THREE.PerspectiveCamera>();
// const rendererRef = useRef<THREE.WebGLRenderer>();
// const clockRef = useRef(new THREE.Clock());
// const lastFrameUpdateTimeRef = useRef(0);


// // Main setup effect
// useEffect(() => {
//     if (!isClient || !mountRef.current) return;

//     const currentMount = mountRef.current;
//     sceneRef.current = new THREE.Scene();
//     cameraRef.current = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
//     cameraRef.current.position.z = PLANET_RADIUS * 2.5;
//     rendererRef.current = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//     rendererRef.current.setSize(currentMount.clientWidth, currentMount.clientHeight);
//     rendererRef.current.setPixelRatio(window.devicePixelRatio);
//     currentMount.appendChild(rendererRef.current.domElement);

//     const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
//     sceneRef.current.add(ambientLight);
//     const directionalLight = new THREE.DirectionalLight(0xffffff, 2.0);
//     directionalLight.position.set(3, 2, 3);
//     sceneRef.current.add(directionalLight);

//     const geometry = new THREE.SphereGeometry(PLANET_RADIUS, 128, 128);
//     const material = new THREE.ShaderMaterial({ /* ... shader setup ... */ 
//         vertexShader,
//         fragmentShader,
//         uniforms: {
//             uDisplacementMap: { value: null },
//             uNormalMap: { value: null },
//             uFoamMap: { value: null },
//             uDisplacementScale: { value: 0.15 },
//             uDeepWaterColor: { value: new THREE.Color(0x001e3d) },
//             uShallowWaterColor: { value: new THREE.Color(0x0077cc) },
//             uFoamColor: { value: new THREE.Color(0xffffff) },
//             uFresnelPower: { value: 4.0 },
//             uFresnelMultiplier: { value: 0.7 },
//             uSunDirection: { value: directionalLight.position.clone().normalize() },
//             uSunColor: { value: new THREE.Color(0xffffee) },
//             uShininess: { value: 80.0 }
//       },
//     });
//     materialRef.current = material;
//     sphereRef.current = new THREE.Mesh(geometry, material);
//     sceneRef.current.add(sphereRef.current);

//     const handleMouseMove = (event: MouseEvent) => { /* ... */ };
//     window.addEventListener('mousemove', handleMouseMove);
//     const handleResize = () => { /* ... */ };
//     window.addEventListener('resize', handleResize);

//     let animationFrameId: number;
//     const animate = () => {
//         animationFrameId = requestAnimationFrame(animate);
//         const elapsedTime = clockRef.current.getElapsedTime();

//         if (texturesLoaded && materialRef.current && sphereRef.current && displacementMapsRef.current.length > 0) {
//             const frameInterval = 1 / ANIMATION_FPS;
//             if (elapsedTime - lastFrameUpdateTimeRef.current > frameInterval) {
//                 lastFrameUpdateTimeRef.current = elapsedTime - ((elapsedTime - lastFrameUpdateTimeRef.current) % frameInterval); // Keep sync
//                 currentFrameRef.current = (currentFrameRef.current + 1) % TOTAL_FRAMES;
                
//                 materialRef.current.uniforms.uDisplacementMap.value = displacementMapsRef.current[currentFrameRef.current];
//                 materialRef.current.uniforms.uNormalMap.value = normalMapsRef.current[currentFrameRef.current];
//                 materialRef.current.uniforms.uFoamMap.value = foamMapsRef.current[currentFrameRef.current];
//             }
//         }
        
//         if (sphereRef.current) {
//             gsap.to(sphereRef.current.rotation, {
//                 x: targetRotationRef.current.x,
//                 y: targetRotationRef.current.y,
//                 duration: 0.8,
//                 ease: 'power2.out',
//             });
//         }
//         if (rendererRef.current && sceneRef.current && cameraRef.current) {
//             rendererRef.current.render(sceneRef.current, cameraRef.current);
//         }
//     };

//     // Start animation loop only when basic scene is set up.
//     // The loop internally checks for texturesLoaded before updating animation frames.
//     animate();


//     return () => { // Cleanup
//         window.removeEventListener('mousemove', handleMouseMove);
//         window.removeEventListener('resize', handleResize);
//         if (animationFrameId) cancelAnimationFrame(animationFrameId);
//         if (currentMount && rendererRef.current?.domElement) {
//             currentMount.removeChild(rendererRef.current.domElement);
//         }
//         geometry.dispose();
//         materialRef.current?.dispose();
//         displacementMapsRef.current.forEach(tex => tex.dispose());
//         normalMapsRef.current.forEach(tex => tex.dispose());
//         foamMapsRef.current.forEach(tex => tex.dispose());
//         // rendererRef.current?.dispose(); // If you need to dispose renderer resources
//     };

// }, [isClient]); // Main setup effect runs once on client

//   if (!isClient) return null;
//   if (!texturesLoaded && isClient) { // Show loading state
//     return <div style={{width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#000010', color: 'white'}}>Loading Ocean Data...</div>;
//   }

//   return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />;
// };

// export default PlanetScene;