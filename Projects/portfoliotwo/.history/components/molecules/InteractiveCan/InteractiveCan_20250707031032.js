'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Float, Environment } from '@react-three/drei';
import gsap from 'gsap';
import styles from './InteractiveCan.module.css';

const fishTexturePath = '/media/cans/labels/Fish@2x.png';
const canModelPath = '/media/cans/beerCan/CansWeb.gltf';

const CanModel = ({ baseScale, isHovered, isMobile }) => {
  const { nodes, materials } = useGLTF(canModelPath);
  const labelTexture = useTexture(fishTexturePath);
  labelTexture.flipY = false;

  const groupRef = useRef();

  useEffect(() => {
    if (!groupRef.current || isMobile) return;

    // Determine the target scale based on the hover state
    const targetScale = isHovered ? baseScale + 0.05 : baseScale;

    // Use GSAP to smoothly animate the scale of the 3D model
    gsap.to(groupRef.current.scale, {
      x: targetScale,
      y: targetScale,
      z: targetScale,
      duration: 0.4, // A quick and smooth animation duration
      ease: 'power3.out',
      overwrite: 'auto',
    });
  }, [isHovered, baseScale, isMobile]); // Dependencies: re-run animation if hover state or base scale changes

  // This existing useFrame for rotation and position follow remains the same.
  useFrame((state) => {
    if (!groupRef.current || isMobile) return;

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
  const [canScale, setCanScale] = useState(0.7);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      setCanScale(width < 1350 ? 0.45 : 0.7);
    };

    checkMobile(); // Initial check
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      // Only update if the scale is actually different
      const shouldBeSmall = window.innerWidth < 1350;
      setCanScale((prevScale) => {
        const targetScale = shouldBeSmall ? 0.45 : 0.7;
        return prevScale !== targetScale ? targetScale : prevScale;
      });
    };

    handleResize(); // initial check
    const debounced = setTimeout(handleResize, 100); // minor debounce
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(debounced);
      window.removeEventListener('resize', handleResize);
    };
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
        // style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: "/images/sunsetBeach.jpg" }}
      >
        <CanModel 
          baseScale={canScale} 
          isHovered={isHovered} 
          isMobile={isMobile}
        />
        <Environment files="/hdr/beach.hdr" environmentIntensity={1.2} />
      </Canvas>
    </div>

  );
}

useGLTF.preload(canModelPath);
useTexture.preload(fishTexturePath);