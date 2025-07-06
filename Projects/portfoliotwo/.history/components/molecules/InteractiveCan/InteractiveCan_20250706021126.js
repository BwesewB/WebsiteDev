// components/InteractiveCanScene.js
'use client';

import React, { useRef, useState, useLayoutEffect, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Float, Environment } from '@react-three/drei';
import gsap from 'gsap';
import styles from './InteractiveCan.module.css';

const fishTexturePath = '/media/cans/labels/Fish@2x.png';
const canModelPath = '/media/cans/beerCan/CansWeb.gltf';

// --- A ROBUST CUSTOM HOOK TO GET THE WINDOW SIZE ---
// This hook reliably provides the window's dimensions and updates on resize.
function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize(); // Set the initial size
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}


const CanModel = () => {
  const { nodes, materials } = useGLTF(canModelPath);
  const labelTexture = useTexture(fishTexturePath);
  labelTexture.flipY = false;

  const groupRef = useRef();
  
  // Get the live window width from our custom hook.
  const [windowWidth] = useWindowSize();

  // --- 1. RESPONSIVE SCALING LOGIC (MOVED TO useEffect) ---
  // This useEffect hook runs ONLY when `windowWidth` changes.
  // This is much more efficient than checking on every frame.
  useEffect(() => {
    // Determine the target scale based on the true window width.
    const targetScale = windowWidth < 1350 ? 0.45 : 0.7;

    // Animate to the new scale.
    if (groupRef.current) {
        gsap.to(groupRef.current.scale, {
            x: targetScale,
            y: targetScale,
            z: targetScale,
            duration: 0.5,
            ease: 'power2.out',
        });
    }
  }, [windowWidth]); // The dependency array is key!


  // --- 2. CURSOR-FOLLOWING LOGIC (REMAINS IN useFrame) ---
  // This logic needs to run on every frame to be interactive.
  useFrame((state) => {
    const { x, y } = state.pointer;
    gsap.to(groupRef.current.rotation, {
      y: 0.7 + (x * 0.5),
      x: -y * 0.5,
      duration: 1,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  });

  return (
    // Disable <Float>'s rotation to prevent conflicts.
    <Float
      speed={1}
      rotationIntensity={0} // CRITICAL: This allows our GSAP to control rotation.
      floatIntensity={1}
      floatingRange={[-0.1, 0.1]}
    >
      <group 
        ref={groupRef} 
        dispose={null} 
        scale={0.7} // Initial scale
        position={[0, -0.3, 0]}
        // The initial rotation is now handled inside useFrame
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
    // ... code remains the same
}

// --- Preloading (no changes needed) ---
useGLTF.preload(canModelPath);
useTexture.preload(fishTexturePath);