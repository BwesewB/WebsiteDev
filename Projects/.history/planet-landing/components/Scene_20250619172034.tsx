'use client';

import React, { useRef, useEffect, useState, useMemo } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

// --- Shaders ---
const vertexShader = `
  uniform sampler2D uDisplacementMap;
  uniform float uDisplacementScale;
  uniform float uCurrentFrame; // For sprite sheet
  uniform float uTotalFrames;  // For sprite sheet
  uniform vec2 uSpriteSheetSize; // e.g., vec2(4.0, 4.0) for a 4x4 grid

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  varying float vDisplacementVal;


  void main() {
    vUv = uv;
    vec2 currentUv = uv;

    // --- If using a sprite sheet for displacement ---
    // float frameX = mod(uCurrentFrame, uSpriteSheetSize.x);
    // float frameY = floor(uCurrentFrame / uSpriteSheetSize.x);
    // currentUv.x = (currentUv.x + frameX) / uSpriteSheetSize.x;
    // currentUv.y = (currentUv.y + frameY) / uSpriteSheetSize.y;
    // For sprite sheets, ensure UVs are correctly scaled and offsetted per frame.
    // This example assumes individual textures per frame for simplicity below.

    vec4 displacementTex = texture2D(uDisplacementMap, vUv); // Use vUv if individual textures
    // vec4 displacementTex = texture2D(uDisplacementMap, currentUv); // Use currentUv if sprite sheet

    // Assuming displacement map stores height in R channel (0-1 range)
    // Or if it's a vector displacement map, it might be in RGB
    float displacement = displacementTex.r * uDisplacementScale;
    vDisplacementVal = displacement; // Pass to fragment for potential use

    vec3 displacedPosition = position + normal * displacement;
    
    // Normals will be primarily handled by the normal map in fragment shader
    // but we still need a base normal for world position calculation
    vNormal = normalize(normalMatrix * normal); // Transformed normal
    vWorldPosition = (modelMatrix * vec4(displacedPosition, 1.0)).xyz;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(displacedPosition, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uNormalMap;
  uniform sampler2D uFoamMap;
  // uniform float uCurrentFrame; // For sprite sheet logic if needed here too
  // uniform float uTotalFrames;
  // uniform vec2 uSpriteSheetSize;


  uniform vec3 uDeepWaterColor;
  uniform vec3 uShallowWaterColor;
  uniform vec3 uFoamColor;
  uniform float uFresnelPower;
  uniform float uFresnelMultiplier;
  uniform vec3 uSunDirection;
  uniform vec3 uSunColor;
  uniform float uShininess;

  varying vec2 vUv;
  varying vec3 vNormal; // Base normal from vertex shader
  varying vec3 vWorldPosition;
  varying float vDisplacementVal; // Height of wave, can be used for color

  // Function to unpack normal map
  vec3 unpackNormal(vec4 nmap) {
    return normalize(nmap.xyz * 2.0 - 1.0);
  }

  void main() {
    vec2 currentUv = vUv;
    // --- Sprite sheet UV calculation for normal/foam if needed ---
    // float frameX = mod(uCurrentFrame, uSpriteSheetSize.x);
    // float frameY = floor(uCurrentFrame / uSpriteSheetSize.x);
    // currentUv.x = (currentUv.x + frameX) / uSpriteSheetSize.x;
    // currentUv.y = (currentUv.y + frameY) / uSpriteSheetSize.y;
    // This part requires careful UV setup for sprite sheets.

    vec3 mapNormal = texture2D(uNormalMap, currentUv).xyz; // Use vUv for individual textures
    mapNormal = normalize(mapNormal * 2.0 - 1.0); // Assuming normal map is in 0-1 range

    // Transform normal from tangent space (if baked that way) to world space
    // This usually requires TBN matrix (Tangent, Bitangent, Normal)
    // For a sphere, if normal map is baked in object/world space relative to sphere,
    // you might not need full TBN, but it's more robust.
    // For simplicity, let's assume the baked normal map is somewhat aligned or we use a simplified approach.
    // A proper TBN calculation:
    // vec3 N = normalize(vNormal); // Interpolated vertex normal
    // vec3 T = normalize(cross(N, vec3(0.0, 1.0, 0.0))); // approx tangent
    // if (length(T) < 0.1) T = normalize(cross(N, vec3(1.0, 0.0, 0.0)));
    // vec3 B = normalize(cross(N, T));
    // mat3 tbn = mat3(T, B, N);
    // vec3 finalNormal = normalize(tbn * mapNormal);
    // For now, let's assume mapNormal is close enough or use the vertex normal for primary direction
    vec3 finalNormal = normalize(vNormal + mapNormal * 0.5); // Crude blend, TBN is better

    vec3 viewDirection = normalize(cameraPosition - vWorldPosition);

    // Fresnel
    float fresnel = pow(1.0 - abs(dot(viewDirection, finalNormal)), uFresnelPower) * uFresnelMultiplier;
    fresnel = clamp(fresnel, 0.0, 1.0);

    // Diffuse
    float diffuse = max(0.0, dot(finalNormal, normalize(uSunDirection)));
    vec3 diffuseColor = uSunColor * diffuse;

    // Specular
    vec3 reflectionDirection = reflect(-normalize(uSunDirection), finalNormal);
    float specular = pow(max(0.0, dot(viewDirection, reflectionDirection)), uShininess);
    vec3 specularColor = uSunColor * specular;

    // Water Color (can be influenced by wave height/displacement)
    float depthFactor = smoothstep(0.0, 0.1, vDisplacementVal); // Based on wave height
    vec3 waterColor = mix(uDeepWaterColor, uShallowWaterColor, depthFactor);
    
    // Foam
    float foamAmount = texture2D(uFoamMap, currentUv).r; // Assuming foam is in R channel
    
    vec3 color = waterColor * (0.3 + diffuse * 0.7); // Ambient + Diffuse
    color += specularColor * 0.8;
    color = mix(color, uFoamColor, foamAmount); // Add foam
    color = mix(color, vec3(1.0), fresnel * 0.6); // Fresnel reflections (sky color like)
    
    gl_FragColor = vec4(color, 1.0);
  }
`;


const PLANET_RADIUS = 1;
const ANIMATION_FPS = 30; // Match your baked sequence FPS
const TOTAL_FRAMES = 150; // Total frames in your baked sequence

const PlanetScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);
  const [texturesLoaded, setTexturesLoaded] = useState(false);

  // Refs for textures to avoid re-creation
  const displacementMapsRef = useRef<THREE.Texture[]>([]);
  const normalMapsRef = useRef<THREE.Texture[]>([]);
  const foamMapsRef = useRef<THREE.Texture[]>([]);
  const materialRef = useRef<THREE.ShaderMaterial>();
  const sphereRef = useRef<THREE.Mesh>();

  const currentFrameRef = useRef(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Load textures
  useEffect(() => {
    if (!isClient) return;

    const textureLoader = new THREE.TextureLoader();
    const loadPromises: Promise<THREE.Texture>[] = [];

    // --- IMPORTANT: Update paths to your baked texture sequences ---
    // Example: public/textures/displacement/disp_0001.png
    //          public/textures/normal/norm_0001.png
    //          public/textures/foam/foam_0001.png
    const basePathDisp = '/textures/ocean_baked/displacement/disp_';
    const basePathNorm = '/textures/ocean_baked/normal/norm_';
    const basePathFoam = '/textures/ocean_baked/foam/foam_';
    const extension = '.png'; // or .exr if you manage to load them

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const frameNumber = String(i).padStart(4, '0'); // e.g., 0000, 0001
      
      loadPromises.push(textureLoader.loadAsync(`${basePathDisp}${frameNumber}${extension}`));
      loadPromises.push(textureLoader.loadAsync(`${basePathNorm}${frameNumber}${extension}`));
      loadPromises.push(textureLoader.loadAsync(`${basePathFoam}${frameNumber}${extension}`));
    }

    Promise.all(loadPromises).then(loadedTextures => {
      displacementMapsRef.current = [];
      normalMapsRef.current = [];
      foamMapsRef.current = [];
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        displacementMapsRef.current.push(loadedTextures[i * 3]);
        normalMapsRef.current.push(loadedTextures[i * 3 + 1]);
        foamMapsRef.current.push(loadedTextures[i * 3 + 2]);
      }
      setTexturesLoaded(true);
      console.log('All textures loaded');
    }).catch(err => console.error("Error loading textures:", err));

  }, [isClient]);


  useEffect(() => {
    if (!isClient || !mountRef.current || !texturesLoaded || !materialRef.current) return;
    
    // Initial texture setup
    if (displacementMapsRef.current.length > 0) {
        materialRef.current.uniforms.uDisplacementMap.value = displacementMapsRef.current[0];
        materialRef.current.uniforms.uNormalMap.value = normalMapsRef.current[0];
        materialRef.current.uniforms.uFoamMap.value = foamMapsRef.current[0];
        materialRef.current.needsUpdate = true;
    }

  }, [isClient, texturesLoaded]);


  useEffect(() => {
    if (!isClient || !mountRef.current) return;

    const currentMount = mountRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = PLANET_RADIUS * 2.5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2.0);
    directionalLight.position.set(3, 2, 3);
    scene.add(directionalLight);

    const geometry = new THREE.SphereGeometry(PLANET_RADIUS, 128, 128); // Segments may need adjustment
    
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        // --- Texture uniforms will be set once loaded ---
        uDisplacementMap: { value: null },
        uNormalMap: { value: null },
        uFoamMap: { value: null },

        uDisplacementScale: { value: 0.15 }, // Adjust based on your baked displacement values
        
        // --- For Sprite Sheets (if you implement that way) ---
        // uCurrentFrame: { value: 0.0 },
        // uTotalFrames: { value: TOTAL_FRAMES_IN_SPRITESHEET },
        // uSpriteSheetSize: { value: new THREE.Vector2(COLS, ROWS_IN_SPRITESHEET) },

        uDeepWaterColor: { value: new THREE.Color(0x001e3d) },
        uShallowWaterColor: { value: new THREE.Color(0x0077cc) },
        uFoamColor: { value: new THREE.Color(0xffffff) },
        uFresnelPower: { value: 4.0 },
        uFresnelMultiplier: { value: 0.7 },
        uSunDirection: { value: directionalLight.position.clone().normalize() },
        uSunColor: { value: new THREE.Color(0xffffee) },
        uShininess: { value: 80.0 }
      },
      // wireframe: true, // For debugging displacement
    });
    materialRef.current = material;

    const sphere = new THREE.Mesh(geometry, material);
    sphereRef.current = sphere;
    scene.add(sphere);

    const handleMouseMove = (event: MouseEvent) => {
      mousePosRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mousePosRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
      targetRotationRef.current.y = mousePosRef.current.x * Math.PI * 0.2;
      targetRotationRef.current.x = mousePosRef.current.y * Math.PI * 0.2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const clock = new THREE.Clock();
    let lastFrameUpdateTime = 0;

    const animate = () => {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Update frame for baked animation
      if (texturesLoaded && materialRef.current && displacementMapsRef.current.length > 0) {
        const frameInterval = 1 / ANIMATION_FPS;
        if (elapsedTime - lastFrameUpdateTime > frameInterval) {
          lastFrameUpdateTime = elapsedTime - ((elapsedTime - lastFrameUpdateTime) % frameInterval); // Keep sync
          
          currentFrameRef.current = (currentFrameRef.current + 1) % TOTAL_FRAMES;
          
          materialRef.current.uniforms.uDisplacementMap.value = displacementMapsRef.current[currentFrameRef.current];
          materialRef.current.uniforms.uNormalMap.value = normalMapsRef.current[currentFrameRef.current];
          materialRef.current.uniforms.uFoamMap.value = foamMapsRef.current[currentFrameRef.current];
          
          // If using sprite sheet, update uCurrentFrame instead:
          // materialRef.current.uniforms.uCurrentFrame.value = currentFrameRef.current;
        }
      }
      
      if (sphereRef.current) {
        gsap.to(sphereRef.current.rotation, {
          x: targetRotationRef.current.x,
          y: targetRotationRef.current.y,
          duration: 0.8,
          ease: 'power2.out',
        });
      }

      renderer.render(scene, camera);
    };

    if (texturesLoaded) { // Start animation only after textures are ready (or at least material is defined)
        animate();
    } else {
        // Fallback render loop if textures are still loading, or handle loading screen
        const renderOnce = () => {
            renderer.render(scene, camera);
        }
        renderOnce(); // Render a static frame
        // A more robust loading would involve a loading indicator and only starting animate() once ready.
        // This current setup might show a non-textured sphere briefly.
        // The animate() call is now inside the texture loading promise resolution
        // or a useEffect dependent on texturesLoaded
    }
    
    // This is a simplified startup, ideally animate() is called once everything is truly ready.
    // Let's refine the startup:
    let animationFrameId: number;
    if (texturesLoaded && materialRef.current) { // Only start animation if textures and material are ready
        animate();
    } else {
        // If not ready, we need a mechanism to start animate() once texturesLoaded becomes true
        // This is handled by the useEffect that depends on [isClient, texturesLoaded]
        // For the initial render before textures are loaded:
        renderer.render(scene, camera); // Render a static frame
    }


    const handleResize = () => {
      if (currentMount) {
        camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      // Dispose all loaded textures
      displacementMapsRef.current.forEach(tex => tex.dispose());
      normalMapsRef.current.forEach(tex => tex.dispose());
      foamMapsRef.current.forEach(tex => tex.dispose());
      displacementMapsRef.current = [];
      normalMapsRef.current = [];
      foamMapsRef.current = [];
    };
  }, [isClient, texturesLoaded]); // Re-run if isClient or texturesLoaded changes

  // This effect will kick off animation once textures are loaded and material is ready
  useEffect(() => {
    let animationFrameId: number;
    const currentMount = mountRef.current; // To satisfy ESLint rules about dependencies

    const animateLoop = () => {
        animationFrameId = requestAnimationFrame(animateLoop);
        const elapsedTime = clockRef.current.getElapsedTime(); // Assuming clockRef is defined similar to other refs

        if (texturesLoaded && materialRef.current && sphereRef.current && displacementMapsRef.current.length > 0) {
            const frameInterval = 1 / ANIMATION_FPS;
            if (elapsedTime - lastFrameUpdateTimeRef.current > frameInterval) {
                lastFrameUpdateTimeRef.current = elapsedTime - ((elapsedTime - lastFrameUpdateTimeRef.current) % frameInterval);
                currentFrameRef.current = (currentFrameRef.current + 1) % TOTAL_FRAMES;
                
                materialRef.current.uniforms.uDisplacementMap.value = displacementMapsRef.current[currentFrameRef.current];
                materialRef.current.uniforms.uNormalMap.value = normalMapsRef.current[currentFrameRef.current];
                materialRef.current.uniforms.uFoamMap.value = foamMapsRef.current[currentFrameRef.current];
            }
            
            gsap.to(sphereRef.current.rotation, {
                x: targetRotationRef.current.x,
                y: targetRotationRef.current.y,
                duration: 0.8,
                ease: 'power2.out',
            });
        }
        if (rendererRef.current && sceneRef.current && cameraRef.current) { // Assuming these refs are setup
             rendererRef.current.render(sceneRef.current, cameraRef.current);
        }
    };


    if (isClient && texturesLoaded && materialRef.current && sphereRef.current && mountRef.current) {
        // Setup renderer, scene, camera refs here if not already global to this effect
        // For brevity, I'm assuming they are accessible (e.g., via refs initialized in the main useEffect)
        // This is getting complex, so simplifying the animate call.
        // The main useEffect should handle the renderer and scene setup.
        // We just need to ensure the animation loop starts.
        // The original animate() function within the main useEffect is better.
        // Let's refine the main useEffect's animate() call initiation.
    }
    
    // The previous animate() function inside the main useEffect is fine.
    // The key is that it should only be called or effectively run its core logic
    // when texturesLoaded is true.

    return () => {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
}, [isClient, texturesLoaded]);

// Refs for Three.js core objects to be accessible in the animation loop triggered by texture loading
const sceneRef = useRef<THREE.Scene>();
const cameraRef = useRef<THREE.PerspectiveCamera>();
const rendererRef = useRef<THREE.WebGLRenderer>();
const clockRef = useRef(new THREE.Clock());
const lastFrameUpdateTimeRef = useRef(0);


// Main setup effect
useEffect(() => {
    if (!isClient || !mountRef.current) return;

    const currentMount = mountRef.current;
    sceneRef.current = new THREE.Scene();
    cameraRef.current = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    cameraRef.current.position.z = PLANET_RADIUS * 2.5;
    rendererRef.current = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    rendererRef.current.setSize(currentMount.clientWidth, currentMount.clientHeight);
    rendererRef.current.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(rendererRef.current.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    sceneRef.current.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2.0);
    directionalLight.position.set(3, 2, 3);
    sceneRef.current.add(directionalLight);

    const geometry = new THREE.SphereGeometry(PLANET_RADIUS, 128, 128);
    const material = new THREE.ShaderMaterial({ /* ... shader setup ... */ 
        vertexShader,
        fragmentShader,
        uniforms: {
            uDisplacementMap: { value: null },
            uNormalMap: { value: null },
            uFoamMap: { value: null },
            uDisplacementScale: { value: 0.15 },
            uDeepWaterColor: { value: new THREE.Color(0x001e3d) },
            uShallowWaterColor: { value: new THREE.Color(0x0077cc) },
            uFoamColor: { value: new THREE.Color(0xffffff) },
            uFresnelPower: { value: 4.0 },
            uFresnelMultiplier: { value: 0.7 },
            uSunDirection: { value: directionalLight.position.clone().normalize() },
            uSunColor: { value: new THREE.Color(0xffffee) },
            uShininess: { value: 80.0 }
      },
    });
    materialRef.current = material;
    sphereRef.current = new THREE.Mesh(geometry, material);
    sceneRef.current.add(sphereRef.current);

    const handleMouseMove = (event: MouseEvent) => { /* ... */ };
    window.addEventListener('mousemove', handleMouseMove);
    const handleResize = () => { /* ... */ };
    window.addEventListener('resize', handleResize);

    let animationFrameId: number;
    const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        const elapsedTime = clockRef.current.getElapsedTime();

        if (texturesLoaded && materialRef.current && sphereRef.current && displacementMapsRef.current.length > 0) {
            const frameInterval = 1 / ANIMATION_FPS;
            if (elapsedTime - lastFrameUpdateTimeRef.current > frameInterval) {
                lastFrameUpdateTimeRef.current = elapsedTime - ((elapsedTime - lastFrameUpdateTimeRef.current) % frameInterval); // Keep sync
                currentFrameRef.current = (currentFrameRef.current + 1) % TOTAL_FRAMES;
                
                materialRef.current.uniforms.uDisplacementMap.value = displacementMapsRef.current[currentFrameRef.current];
                materialRef.current.uniforms.uNormalMap.value = normalMapsRef.current[currentFrameRef.current];
                materialRef.current.uniforms.uFoamMap.value = foamMapsRef.current[currentFrameRef.current];
            }
        }
        
        if (sphereRef.current) {
            gsap.to(sphereRef.current.rotation, {
                x: targetRotationRef.current.x,
                y: targetRotationRef.current.y,
                duration: 0.8,
                ease: 'power2.out',
            });
        }
        if (rendererRef.current && sceneRef.current && cameraRef.current) {
            rendererRef.current.render(sceneRef.current, cameraRef.current);
        }
    };

    // Start animation loop only when basic scene is set up.
    // The loop internally checks for texturesLoaded before updating animation frames.
    animate();


    return () => { // Cleanup
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        if (currentMount && rendererRef.current?.domElement) {
            currentMount.removeChild(rendererRef.current.domElement);
        }
        geometry.dispose();
        materialRef.current?.dispose();
        displacementMapsRef.current.forEach(tex => tex.dispose());
        normalMapsRef.current.forEach(tex => tex.dispose());
        foamMapsRef.current.forEach(tex => tex.dispose());
        // rendererRef.current?.dispose(); // If you need to dispose renderer resources
    };

}, [isClient]); // Main setup effect runs once on client

  if (!isClient) return null;
  if (!texturesLoaded && isClient) { // Show loading state
    return <div style={{width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#000010', color: 'white'}}>Loading Ocean Data...</div>;
  }

  return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />;
};

export default PlanetScene;