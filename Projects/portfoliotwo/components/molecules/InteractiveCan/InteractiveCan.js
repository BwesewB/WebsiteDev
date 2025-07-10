'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Float, Environment } from '@react-three/drei';
import gsap from 'gsap';
import styles from './InteractiveCan.module.css';

const fishTexturePath = '/media/cans/labels/Fish@2x.png';
const canModelPath = '/media/cans/beerCan/CansWeb.gltf';

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
      floatingRange={[0, 0.1]}
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


export default function InteractiveCanScene() {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [canScale, setCanScale] = useState(0.7);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new ResizeObserver(entries => {
      const entry = entries[0];
      if (entry) {
        const { width } = entry.contentRect;

        // --- THE CORE LOGIC ---
        // Create a scale factor. You can tweak the multiplier (0.0014) to make
        // the can larger or smaller relative to the container width.
        const newScale = width * 0.0014;

        // Optional but recommended: Clamp the scale to prevent the can from
        // getting too big or too small.
        const clampedScale = Math.max(0.3, Math.min(newScale, 0.8)); // Clamps between 0.3 and 0.8

        setCanScale(clampedScale);
      }
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.CanvasContainer}>
      <Canvas
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
        shadows
        dpr={[1, 1.5]}
        gl={{ antialias: true }}
        camera={{ fov: 30 }}
      >
        <CanModel 
          baseScale={canScale} 
          isHovered={isHovered} 
        />
        <Environment files="/hdr/beach.hdr" environmentIntensity={1.2} />
      </Canvas>
    </div>

  );
}

useGLTF.preload(canModelPath);
useTexture.preload(fishTexturePath);