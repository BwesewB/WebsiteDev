// components/InteractiveCanScene.js
'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Float } from '@react-three/drei';
import gsap from 'gsap';

// --- Asset Paths ---
const fishTexturePath = '/media/cans/labels/Fish@2x.png';
const canModelPath = '/media/cans/beerCan/CansWeb.gltf';

// --- Internal Model Component ---
// This component contains the logic for the can model itself:
// loading assets, floating, and reacting to the cursor.
// It is NOT exported and is only used by the main scene component below.
const CanModel = () => {
  const { nodes, materials } = useGLTF(canModelPath);
  const labelTexture = useTexture(fishTexturePath);
  labelTexture.flipY = false;

  const groupRef = useRef();

  // The cursor-following interaction logic
  useFrame((state) => {
    const { x, y } = state.pointer;
    gsap.to(groupRef.current.rotation, {
      y: x * 0.5,
      x: -y * 0.5,
      duration: 1,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  });

  return (
    <Float
      speed={1}
      rotationIntensity={1}
      floatIntensity={1}
      floatingRange={[-0.1, 0.1]}
    >
      <group 
        ref={groupRef} 
        dispose={null} 
        scale={0.7} 
        position={[0, -0.3, 0]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder005.geometry}
          material={materials['Material.001']}
        />
        <mesh castShadow receiveShadow geometry={nodes.Cylinder005_1.geometry}>
          <meshStandardMaterial map={labelTexture} />
        </mesh>
      </group>
    </Float>
  );
};

// --- Main Exported Scene Component ---
// This is the component you will import into your pages.
// It sets up the entire 3D environment.
export default function InteractiveCanScene({className = ''}) {
  return (
    // The container div is important for positioning the canvas in your layout.
    <div className={className} style={{ width: '100%', height: '100%' }}>
      <Canvas
        shadows
        camera={{ position: [0, 0, 5], fov: 50 }}
      >
        {/* --- Lighting & Environment --- */}
        <ambientLight intensity={0.7} />
        <directionalLight 
          castShadow 
          position={[10, 15, 5]} 
          intensity={1.5} 
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        
        {/* We render the internal CanModel component here */}
        <CanModel />

        {/* A simple ground plane to receive shadows, making it look grounded */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]} receiveShadow>
            <planeGeometry args={[10, 10]} />
            <shadowMaterial opacity={0.2} />
        </mesh>
      </Canvas>
    </div>
  );
}

// Preload assets for a faster and smoother initial render.
useGLTF.preload(canModelPath);
useTexture.preload(fishTexturePath);