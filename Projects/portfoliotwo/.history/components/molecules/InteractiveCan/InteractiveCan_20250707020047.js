'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Float, Environment } from '@react-three/drei';
import gsap from 'gsap';
import styles from './InteractiveCan.module.css';

const fishTexturePath = '/media/cans/labels/Fish@2x.png';
const canModelPath = '/media/cans/beerCan/CansWeb.gltf';

// --- The Updated 3D Model Component ---
// It now receives hover state and pointer position to control its animations.
const CanModel = ({
  modelScale,
  isHovered,
  pointer,
  movementFactor = 0.4, // How much the can moves in 3D space
  hoverScaleFactor = 1.1, // How much bigger it gets on hover
}) => {
  const { nodes, materials } = useGLTF(canModelPath);
  const labelTexture = useTexture(fishTexturePath);
  labelTexture.flipY = false;

  const groupRef = useRef(); // This ref points to the <Float> component

  // --- Animation on Hover State Change ---
  useEffect(() => {
    if (!groupRef.current) return;
    
    // Animate the scale of the entire floating group
    gsap.to(groupRef.current.scale, {
      x: isHovered ? modelScale * hoverScaleFactor : modelScale,
      y: isHovered ? modelScale * hoverScaleFactor : modelScale,
      z: isHovered ? modelScale * hoverScaleFactor : modelScale,
      duration: 0.5,
      ease: 'power3.out',
    });
  }, [isHovered, modelScale, hoverScaleFactor]);

  // --- Animation on Mouse Move ---
  // This smoothly moves the can's position towards the cursor.
  useFrame(() => {
    if (!groupRef.current) return;

    // We only move the can if the user is hovering.
    const targetX = isHovered ? pointer.x * movementFactor : 0;
    const targetY = isHovered ? pointer.y * movementFactor -0.3 : -0.3; // Maintain vertical offset

    gsap.to(groupRef.current.position, {
      x: targetX,
      y: targetY,
      duration: 1, // A longer duration gives a smoother, "drifting" feel
      ease: 'power3.out',
    });
  });

  return (
    // The ref is now on the Float component to control its position and scale
    <Float
      ref={groupRef}
      speed={isHovered ? 0.5 : 1} // Slow down floating when interacting
      rotationIntensity={1}
      floatIntensity={1}
      floatingRange={[-0.1, 0.1]}
    >
      <group dispose={null} scale={1}> {/* Scale is now controlled by the parent Float */}
        <mesh castShadow receiveShadow geometry={nodes.Cylinder005.geometry} material={materials['Material.001']} />
        <mesh castShadow receiveShadow geometry={nodes.Cylinder005_1.geometry}>
          <meshStandardMaterial map={labelTexture} />
        </mesh>
      </group>
    </Float>
  );
};


// --- The Main Exported Scene Component ---
export default function InteractiveCanScene() {
  // State for the base scale of the 3D model (for responsive design)
  const [modelScale, setModelScale] = useState(0.7);

  // State to track if the canvas is being hovered
  const [isHovered, setIsHovered] = useState(false);
  // State to track the normalized pointer position (-1 to 1)
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  // Effect for responsive scaling
  useEffect(() => {
    const handleResize = () => setModelScale(window.innerWidth < 1350 ? 0.45 : 0.7);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Event handler for mouse movement over the canvas
  const handlePointerMove = (event) => {
    // We get normalized device coordinates from the event
    const { x, y } = event.pointer;
    setPointer({ x, y });
  };

  return (
    <Canvas
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      onPointerMove={handlePointerMove}
      shadows
      dpr={[1, 1.5]}
      gl={{ antialias: true }}
      camera={{ fov: 30 }}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
    >
      <CanModel
        modelScale={modelScale}
        isHovered={isHovered}
        pointer={pointer}
      />
      <Environment files="/hdr/beach.hdr" environmentIntensity={1.2} />
    </Canvas>
  );
}

// Preload assets for better performance
useGLTF.preload(canModelPath);
useTexture.preload(fishTexturePath);