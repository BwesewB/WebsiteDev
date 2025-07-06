// components/InteractiveCan.js
'use client';

import React, { useRef } from 'react';
import { useGLTF, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import gsap from 'gsap';

// The path to your single fish texture.
const fishTexturePath = '/media/cans/labels/Fish@2x.png';

export const InteractiveCan = (props) => {
  // Load the 3D model data.
  const { nodes, materials } = useGLTF('/media/cans/beerCan/CansWeb.gltf');
  
  // Load the single, dedicated fish texture.
  const labelTexture = useTexture(fishTexturePath);
  // Important: This ensures the texture is not flipped upside down.
  labelTexture.flipY = false;

  const groupRef = useRef();

  // The cursor-following interaction logic remains the same.
  useFrame((state) => {
    // Get the normalized mouse position (-1 to 1) from the canvas state.
    const { x, y } = state.pointer;

    // Smoothly animate the can's rotation to follow the cursor.
    gsap.to(groupRef.current.rotation, {
      y: x * 0.5, // Yaw controlled by mouse X (left/right)
      x: -y * 0.5, // Pitch controlled by mouse Y (up/down)
      duration: 1,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  });

  return (
    // The props are passed down to the group so you can still customize it
    // from the parent if needed (e.g., position, scale).
    <group 
      ref={groupRef} 
      {...props} 
      dispose={null} 
      scale={0.7} 
      position={[0, -0.3, 0]}
    >
      {/* This is the can's metal body */}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder005.geometry}
        material={materials['Material.001']}
      />
      {/* This is the can's label mesh */}
      <mesh castShadow receiveShadow geometry={nodes.Cylinder005_1.geometry}>
        <meshStandardMaterial map={labelTexture} />
      </mesh>
    </group>
  );
};

// Preload the necessary assets for faster initial load.
useGLTF.preload('/media/cans/beerCan/CansWeb.gltf');
useTexture.preload(fishTexturePath);