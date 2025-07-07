'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Float, Environment } from '@react-three/drei';
import gsap from 'gsap';
import styles from './InteractiveCan.module.css';

const fishTexturePath = '/media/cans/labels/Fish@2x.png';
const canModelPath = '/media/cans/beerCan/CansWeb.gltf';

const CanModel = ({ isHovered, isMobile }) => {
  const { nodes, materials } = useGLTF(canModelPath);
  const labelTexture = useTexture(fishTexturePath);
  labelTexture.flipY = false;

  const groupRef = useRef();

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
    </Float>
  );
};

export default function InteractiveCanScene() {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
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
        <CanModel isHovered={isHovered} isMobile={isMobile} />
        <Environment files="/hdr/beach.hdr" environmentIntensity={1.2} />
      </Canvas>
    </div>
  );
}

useGLTF.preload(canModelPath);
useTexture.preload(fishTexturePath);
