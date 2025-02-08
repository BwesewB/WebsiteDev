import React, { forwardRef } from 'react';
import { useGLTF, useTexture, OrbitControls } from '@react-three/drei';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

export const BeerCan = forwardRef(({ flavor = "fish", ...props }, ref) => {

  const { nodes, materials } = useGLTF('/media/cans/beerCan/CansWeb.gltf');

  const flavorTextures = {
    crab: '/media/cans/labels/Crab@2x.png',
    fish: '/media/cans/labels/Fish@2x.png',
    seaweed: '/media/cans/labels/Seaweed@2x.png',
  };

  const labelTexture = useTexture(flavorTextures[flavor]);
  labelTexture.flipY = false;

  const [isDesktop, setIsDesktop] = useState(true);
  const controls = useRef();
  // const canRef = useRef();

  // useEffect(() => {
  //   if (controls.current && canRef.current) {
  //     const targetPosition = canRef.current.position;
  //     controls.current.target.copy(targetPosition);
  //     controls.current.update();
  //   }
  // }, []);

  useEffect(() => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobile = /android|iphone|ipad|ipod|blackberry|windows phone|opera mini|mobile/i.test(userAgent);
      setIsDesktop(!isMobile);
    }, []);
  
    useEffect(() => {
      let timeout;
  
      const smoothResetCamera = () => {
        if (controls.current) {
          console.log("Smoothly resetting camera position...");
          
          gsap.to(controls.current.object.position, {
            x: 0,
            y: 0,
            z: 5,
            duration: 1.5,
            ease: "power2.out",
          });
  
          gsap.to(controls.current.target, {
            x: 0,
            y: 0,
            z: 0,
            duration: 1.5,
            ease: "power2.out",
            onUpdate: () => controls.current.update(),
          });
        }
      };
  
      const onControlChange = () => {
        console.log("User interaction detected, resetting timer...");
        clearTimeout(timeout);
        timeout = setTimeout(smoothResetCamera, 2000);
      };
  
      const controlInstance = controls.current;
      if (isDesktop && controlInstance) {
        controlInstance.addEventListener("change", onControlChange);
      }
  
      return () => {
        controlInstance?.removeEventListener("change", onControlChange);
        clearTimeout(timeout);
      };
    }, [isDesktop]);

  return (
    <>
      {isDesktop && <OrbitControls ref={controls} enableZoom={false} enableRotate={true} enablePan={false} />}
      <group ref={ref} {...props} dispose={null}>
        <group position={[0, -0.3, 0]} rotation={[0, 0.7, 0]} scale={0.7}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder005.geometry}
            material={materials['Material.001']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder005_1.geometry}
          >
            <meshStandardMaterial map={labelTexture} />
          </mesh>
        </group>
      </group>
    </>

  );
});

useGLTF.preload('/media/cans/beerCan/CansWeb.gltf');
