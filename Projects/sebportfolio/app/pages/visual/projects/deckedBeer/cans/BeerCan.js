import React, { forwardRef, useEffect, useRef, useImperativeHandle  } from 'react';
import { useGLTF, useTexture, OrbitControls } from '@react-three/drei';
import gsap from 'gsap';
import { Float } from '@react-three/drei';

export const DEFAULT_BEER_CAN_TRANSFORMS = {
  position: [0, -0.3, 0],
  rotation: [0, 0.7, 0], 
  scale: 0.7,
};

export const BeerCan = forwardRef(({ flavor = "fish", ...props }, ref) => {
  const { nodes, materials } = useGLTF('/media/cans/beerCan/CansWeb.gltf');

  const flavorTextures = {
    crab: '/media/cans/labels/Crab@2x.png',
    fish: '/media/cans/labels/Fish@2x.png',
    seaweed: '/media/cans/labels/Seaweed@2x.png',
  };

  // Load the correct label texture based on the flavor prop
  const labelTexture = useTexture(flavorTextures[flavor]);
  labelTexture.flipY = false;

  const controls = useRef();
  const groupRef = useRef();

  useImperativeHandle(ref, () => groupRef.current);

  useEffect(() => {
    console.log("GroupRef connected in BeerCan:", groupRef.current);
  }, []);
  
  useEffect(() => {
    if (controls.current) {
      controls.current.update();
    }
  }, [flavor]);

  useEffect(() => {
    let timeout;
  
    const smoothResetCamera = () => {
      if (controls.current) {
        gsap.to(controls.current.object.position, {
          x: 0,
          y: 0,
          z: 5,
          duration: 1.5,
          ease: 'power2.out',
        });
  
        gsap.to(controls.current.target, {
          x: 0,
          y: 0,
          z: 0,
          duration: 1.5,
          ease: 'power2.out',
          onUpdate: () => {
            if (controls.current) {
              controls.current.update();
            }
          },
        });
      }
    };
  
    const onControlChange = () => {
      clearTimeout(timeout);
      timeout = setTimeout(smoothResetCamera, 2000);
    };
  
    if (controls.current) {
      controls.current.addEventListener('change', onControlChange);
    }
  
    return () => {
      controls.current?.removeEventListener('change', onControlChange);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Float
    speed={1}
    rotationIntensity={1}
    floatIntensity={1}
    floatingRange={[-0.1, 0.1]}
    >
      <OrbitControls ref={controls} enableZoom={false} enableRotate={true} enablePan={false} />
        <group 
          ref={groupRef} 
          {...props} 
          dispose={null}        
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
});

useGLTF.preload('/media/cans/beerCan/CansWeb.gltf');