// components/InteractiveCanScene.js
'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Float, Environment } from '@react-three/drei';
import gsap from 'gsap';

// --- Asset Paths (no changes) ---
const fishTexturePath = '/media/cans/labels/Fish@2x.png';
const canModelPath = '/media/cans/beerCan/CansWeb.gltf';

// --- Internal Model Component (where the magic happens) ---
const CanModel = () => {
  const { nodes, materials } = useGLTF(canModelPath);
  const labelTexture = useTexture(fishTexturePath);
  labelTexture.flipY = false;

  const groupRef = useRef();

  // The useFrame hook is perfect for both cursor tracking and responsive scaling.
  useFrame((state) => {
    // --- 1. RESPONSIVE SCALING LOGIC ---
    // 'state.viewport.width' gives us the visible width of the scene in 3D units.
    // We can use this to calculate a target scale.
    // This formula ensures the can has a minimum scale of 0.35, a maximum of 0.7,
    // and scales smoothly in between based on the viewport width.
    const targetScale = Math.max(0.35, Math.min(0.7, state.viewport.width / 10));

    // Animate the scale smoothly instead of "snapping" to the new size.
    gsap.to(groupRef.current.scale, {
      x: targetScale,
      y: targetScale,
      z: targetScale,
      duration: 0.5, // A quick, responsive duration
      ease: 'power2.out',
      overwrite: 'auto'
    });


    // --- 2. CURSOR-FOLLOWING LOGIC (unchanged) ---
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
        // NOTE: The scale prop is now controlled dynamically in useFrame,
        // so this initial value is less critical but good for the first frame.
        scale={0.7}
        position={[0, -0.3, 0]}
        // --- 3. INITIAL ROTATION ---
        // Rotated by -45 degrees on the Y-axis to turn it to the right.
        rotation= {[0, -Math.PI / 4, 0]} 
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

// --- Main Scene Component (no changes needed) ---
export default function InteractiveCanScene() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas
            shadows
            dpr={[1, 1.5]} // Adjust device pixel ratio for performance/quality
            gl={{ antialias: true }}
            camera={{
                fov: 30,
            }}
      >
        <CanModel />
        {/* Environment provides realistic reflections and ambient light */}
        <Environment files="/hdr/beach.hdr" environmentIntensity={1.2}/>
      </Canvas>
    </div>
  );
}

// Preload assets (no changes)
useGLTF.preload(canModelPath);
useTexture.preload(fishTexturePath);