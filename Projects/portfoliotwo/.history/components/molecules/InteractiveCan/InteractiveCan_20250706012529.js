'use client';

import React, { useRef } from 'react';
import { useGLTF, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import gsap from 'gsap';

export const InteractiveCan = ({ flavor = "fish", ...props }) => {
  const { nodes, materials } = useGLTF('/media/cans/beerCan/CansWeb.gltf');
  
  // --- Texture loading logic remains the same ---
  const flavorTextures = {
    crab: '/media/cans/labels/Crab@2x.png',
    fish: '/media/cans/Fish@2x.png',
    seaweed: '/media/cans/labels/Seaweed@2x.png',
  };
  const labelTexture = useTexture(flavorTextures[flavor]);
  labelTexture.flipY = false;

  const groupRef = useRef();

  // --- THIS IS THE NEW INTERACTION LOGIC ---
  // We use the useFrame hook to update the can's rotation on every frame.
  useFrame((state) => {
    // 'state.pointer' holds the normalized mouse position (-1 to 1 on x and y)
    const { x, y } = state.pointer;

    // We use GSAP to smoothly animate the rotation towards the target.
    // This creates the "follow" effect instead of a rigid, instant rotation.
    // The 'y' rotation (yaw) is controlled by the mouse's x-position.
    // The 'x' rotation (pitch) is controlled by the mouse's y-position.
    gsap.to(groupRef.current.rotation, {
      y: x * 0.5, // The multiplier controls sensitivity
      x: -y * 0.5, // Negative so it feels natural (mouse up -> can tilts up)
      duration: 1, // The duration of the "catch-up" animation
      ease: 'power2.out',
      overwrite: 'auto' // Important: ensures new animations override old ones
    });
  });

  return (
    // We removed OrbitControls and Float. The group is now the top-level element.
    // We give it a default scale and position.
    <group 
      ref={groupRef} 
      {...props} 
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
  );
};

useGLTF.preload('/media/cans/beerCan/CansWeb.gltf');