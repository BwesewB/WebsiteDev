'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Float, Environment } from '@react-three/drei';
import gsap from 'gsap';
import styles from './InteractiveCan.module.css';

const fishTexturePath = '/media/cans/labels/Fish@2x.png';
const canModelPath = '/media/cans/beerCan/CansWeb.gltf';

// --- UPDATED CanModel Component ---
// It now accepts the baseScale and an isHovered boolean to control its own scale animation.
const CanModel = ({ baseScale, isHovered }) => {
  const { nodes, materials } = useGLTF(canModelPath);
  const labelTexture = useTexture(fishTexturePath);
  labelTexture.flipY = false;

  const groupRef = useRef();

  // --- NEW: useEffect for hover-based scale animation ---
  // This hook runs whenever the isHovered or baseScale props change.
  useEffect(() => {
    if (!groupRef.current) return; // Safety check

    // Determine the target scale based on the hover state
    const targetScale = isHovered ? baseScale + 0.05 : baseScale;

    // Use GSAP to smoothly animate the scale of the 3D model
    gsap.to(groupRef.current.scale, {
      x: targetScale,
      y: targetScale,
      z: targetScale,
      duration: 0.4, // A quick and smooth animation duration
      ease: 'power3.out',
    });
  }, [isHovered, baseScale]); // Dependencies: re-run animation if hover state or base scale changes

  // This existing useFrame for rotation and position follow remains the same.
  useFrame((state) => {
    if (!groupRef.current) return;
    const { x, y } = state.pointer;
    gsap.to(groupRef.current.rotation, {
      y: 0.7 + (x * 0.5),
      x: -y * 0.5,
      duration: 1,
      ease: 'power2.out',
      overwrite: 'auto'
    });
    gsap.to(groupRef.current.position, {
      y: -0.3 + (y * 0.05),
      x: x * 0.05,
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
        // Set the initial scale here. GSAP will animate it from this point.
        scale={baseScale} 
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


// --- UPDATED InteractiveCanScene Component ---
export default function InteractiveCanScene() {
  const [canScale, setCanScale] = useState(0.7);
  // --- NEW: State to track if the canvas is being hovered ---
  const [isHovered, setIsHovered] = useState(false);

  // This responsive logic remains the same.
  useEffect(() => {
    const handleResize = () => {
      setCanScale(window.innerWidth < 1350 ? 0.45 : 0.7);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Canvas
      // --- NEW: Event handlers on the Canvas to set the hover state ---
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      shadows
      dpr={[1, 1.5]}
      gl={{ antialias: true }}
      camera={{ fov: 30 }}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: "var(--sand)" }}
    >
      <CanModel 
        // Pass the base scale and the hover state down to the model
        baseScale={canScale} 
        isHovered={isHovered} 
      />
      <Environment files="/hdr/beach.hdr" environmentIntensity={1.2} />
    </Canvas>
  );
}

useGLTF.preload(canModelPath);
useTexture.preload(fishTexturePath);