// components/three/InteractiveCanScene.js

'use client';
import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Float, Environment } from '@react-three/drei';
import gsap from 'gsap';
// NO LONGER NEEDED HERE: import styles from './InteractiveCan.module.css';

const fishTexturePath = '/media/cans/labels/Fish@2x.png';
const canModelPath = '/media/cans/beerCan/CansWeb.gltf';

// We combine the model logic directly into the scene component
// to easily manage state and refs.
export default function InteractiveCanScene({ onHoverStart, onHoverEnd }) {
  const { nodes, materials } = useGLTF(canModelPath);
  const labelTexture = useTexture(fishTexturePath);
  labelTexture.flipY = false;

  const modelGroupRef = useRef(); // Ref for the 3D model group
  const baseScale = useRef(0.7); // Use a ref for the base scale

  // Effect for handling responsive base scale
  useEffect(() => {
    const handleResize = () => {
      const newScale = window.innerWidth < 1350 ? 0.45 : 0.7;
      baseScale.current = newScale;
      // Set the scale immediately without animation
      gsap.set(modelGroupRef.current.scale, {
        x: newScale,
        y: newScale,
        z: newScale,
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Memoize the animation functions so they don't cause re-renders
  const animations = useMemo(() => ({
    handleHoverStart: () => {
      if (!modelGroupRef.current) return;
      gsap.to(modelGroupRef.current.scale, {
        x: baseScale.current * 1.15, // Scale up the 3D model
        y: baseScale.current * 1.15,
        z: baseScale.current * 1.15,
        duration: 0.5,
        ease: 'power3.out',
      });
    },
    handleHoverEnd: () => {
      if (!modelGroupRef.current) return;
      gsap.to(modelGroupRef.current.scale, {
        x: baseScale.current, // Return to base scale
        y: baseScale.current,
        z: baseScale.current,
        duration: 0.5,
        ease: 'power3.out',
      });
    }
  }), []); // Empty dependency array ensures these functions are created only once

  // This calls the functions passed down from the parent DynamicHover
  useEffect(() => {
    onHoverStart.current = animations.handleHoverStart;
    onHoverEnd.current = animations.handleHoverEnd;
  }, [animations, onHoverStart, onHoverEnd]);
  
  // Mouse follow logic for the 3D model rotation
  useFrame((state) => {
    if (!modelGroupRef.current) return;
    const { x, y } = state.pointer;
    gsap.to(modelGroupRef.current.rotation, {
      y: 0.7 + (x * 0.5),
      x: -y * 0.5,
      duration: 1,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  });

  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      gl={{ antialias: true }}
      camera={{ fov: 30 }}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
    >
      <Float speed={1} rotationIntensity={1} floatIntensity={1} floatingRange={[-0.1, 0.1]}>
        <group ref={modelGroupRef} dispose={null} position={[0, -0.3, 0]}>
          <mesh castShadow receiveShadow geometry={nodes.Cylinder005.geometry} material={materials['Material.001']} />
          <mesh castShadow receiveShadow geometry={nodes.Cylinder005_1.geometry}>
            <meshStandardMaterial map={labelTexture} />
          </mesh>
        </group>
      </Float>
      <Environment files="/hdr/beach.hdr" environmentIntensity={1.2} />
    </Canvas>
  );
}

useGLTF.preload(canModelPath);
useTexture.preload(fishTexturePath);