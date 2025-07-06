'use client';

import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Float, Environment } from '@react-three/drei';
import gsap from 'gsap';
import styles from './InteractiveCan.module.css';

const fishTexturePath = '/media/cans/labels/Fish@2x.png';
const canModelPath = '/media/cans/beerCan/CansWeb.gltf';

const CanModel = ({ scaleRef }) => {
  const { nodes, materials } = useGLTF(canModelPath);
  const labelTexture = useTexture(fishTexturePath);
  labelTexture.flipY = false;

  const groupRef = useRef();

  useFrame((state) => {
    const { x, y } = state.pointer;

    // Animate rotation based on pointer
    gsap.to(groupRef.current.rotation, {
      y: 0.7 + (x * 0.5),
      x: -y * 0.5,
      duration: 1,
      ease: 'power2.out',
      overwrite: 'auto',
    });

    // Sync animated scale
    groupRef.current.scale.setScalar(scaleRef.current);
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
  const scaleRef = useRef(0.7);

  useEffect(() => {
    const updateScale = () => {
      const targetScale = window.innerWidth < 1350 ? 0.45 : 0.7;
      gsap.to(scaleRef.current, {
        value: targetScale,
        duration: 0.6,
        ease: 'power2.inOut',
        onUpdate: () => {
          // Nothing needed here; the frame loop will pick up ref.current
        },
      });
    };

    // Patch gsap to animate the ref's `.current` scalar value
    gsap.registerPlugin({
      name: "value",
      init(target, value) {
        this.add(target, "current", target.current, value);
      }
    });

    updateScale(); // initial check
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  return (
    <div className={styles.CanvasContainer}>
      <Canvas
        shadows
        dpr={[1, 1.5]}
        gl={{ antialias: true }}
        camera={{ fov: 30 }}
      >
        <CanModel scaleRef={scaleRef} />
        <Environment files="/hdr/beach.hdr" environmentIntensity={1.2} />
      </Canvas>
    </div>
  );
}

useGLTF.preload(canModelPath);
useTexture.preload(fishTexturePath);
