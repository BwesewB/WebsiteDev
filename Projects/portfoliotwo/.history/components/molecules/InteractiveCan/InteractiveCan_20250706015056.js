'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Float, Environment } from '@react-three/drei';
import gsap from 'gsap';

const fishTexturePath = '/media/cans/labels/Fish@2x.png';
const canModelPath = '/media/cans/beerCan/CansWeb.gltf';

const CanModel = () => {
  const { nodes, materials } = useGLTF(canModelPath);
  const labelTexture = useTexture(fishTexturePath);
  labelTexture.flipY = false;

  const groupRef = useRef();

  useFrame((state) => {
    const { x, y } = state.pointer;
    gsap.to(groupRef.current.rotation, {
      y: x * 0.5,
      x: -y * 0.5,
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
        // scale={0.7} 
        position={[0, -0.3, 0]}
        rotation= {[0, 0, 0]} 
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
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas
            shadows
            dpr={[1, 1.5]}
            gl={{ antialias: true }}
            camera={{
                fov:30,
            }}
      >
        <CanModel />
        <Environment files="/hdr/beach.hdr" environmentIntensity={1.2}/>
      </Canvas>
    </div>
  );
}

// Preload assets for a faster and smoother initial render.
useGLTF.preload(canModelPath);
useTexture.preload(fishTexturePath);