// components/InteractiveCanScene.js
'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Float, Environment } from '@react-three/drei';
import gsap from 'gsap';
import styles from './InteractiveCan.module.css';

const fishTexturePath = '/media/cans/labels/Fish@2x.png';
const canModelPath = '/media/cans/beerCan/CansWeb.gltf';

const CanModel = () => {
  const { nodes, materials } = useGLTF(canModelPath);
  const labelTexture = useTexture(fishTexturePath);
  labelTexture.flipY = false;

  const groupRef = useRef();

  // We add all our animation logic into this single useFrame hook.
  useFrame((state) => {
    // --- 1. RESPONSIVE SCALING LOGIC (THE NEW PART) ---
    // 'state.size.width' gives us the current pixel width of the canvas.
    // We use a ternary operator to decide the target scale.
    const targetScale = state.size.width < 1350 ? 0.45 : 0.7;

    // Use GSAP to smoothly animate the can's scale to the target size.
    // This creates a nice transition when the window is resized.
    gsap.to(groupRef.current.scale, {
      x: targetScale,
      y: targetScale,
      z: targetScale,
      duration: 0.5,
      ease: 'power2.out',
    });


    // --- 2. CURSOR-FOLLOWING ROTATION LOGIC (UNCHANGED) ---
    const { x, y } = state.pointer;
    gsap.to(groupRef.current.rotation, {
      y: 0.7 + (x * 0.5), // Base rotation + cursor influence
      x: -y * 0.5,
      duration: 1,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  });

  return (
    // We must disable the rotation from <Float> to prevent conflicts with our GSAP animation.
    <Float
      speed={1}
      rotationIntensity={0} // CRITICAL: Set to 0 to allow our GSAP to control rotation.
      floatIntensity={1}
      floatingRange={[-0.1, 0.1]}
    >
      <group 
        ref={groupRef} 
        dispose={null} 
        scale={0.7} // This acts as the initial scale before the useFrame logic takes over.
        position={[0, -0.3, 0]}
        // The initial rotation is now effectively set within the useFrame logic.
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
    <div className={styles.CanvasContainer}>
      <Canvas
            shadows
            dpr={[1, 1.5]}
            gl={{ antialias: true }}
            camera={{
                fov:30,
            }}
      >
        <CanModel />
        <Environment files="/hdr/beach.hdr" environmentIntensity={1.2}/>
      </Canvas>
    </div>
  );
}

// --- Preloading (no changes needed) ---
useGLTF.preload(canModelPath);
useTexture.preload(fishTexturePath);