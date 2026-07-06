import React, { useRef, useEffect, useState } from 'react'
import { useGLTF, Text, OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from '@react-three/fiber'
import { MeshTransmissionMaterial } from "@react-three/drei";
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Model() {

    // const materialProps = useControls({
    //     thickness: { value: 0.2, min: 0, max: 3, step: 0.05 },
    //     roughness: { value: 0, min: 0, max: 1, step: 0.1 },
    //     transmission: {value: 1, min: 0, max: 1, step: 0.1},
    //     ior: { value: 1.2, min: 0, max: 3, step: 0.1 },
    //     chromaticAberration: { value: 0.02, min: 0, max: 1},
    //     backside: { value: true},
    // })

    const materialProps = {
        thickness: 0.2,
        roughness: 0,
        transmission: 1,
        ior: 1.2,
        chromaticAberration: 0.02,
        backside: true,
    };

    const mesh = useRef()
    const controls = useRef();
    const { nodes } = useGLTF("/models/KnotTorus.glb");
    const { viewport } = useThree()
    const [isDesktop, setIsDesktop] = useState(true);
    const [scaleFactor, setScaleFactor] = useState(4);

    useFrame(() => {
        mesh.current.rotation.x += 0.001;
    })

    useEffect(() => {
        gsap.to({}, { // Empty object to ensure GSAP initializes properly
            scrollTrigger: {
                trigger: document.body,
                start: "top top",
                end: "200vh top",
                scrub: 1, // Smooth animation
                onUpdate: (self) => {
                    const newScale = 4 + self.progress * 4; // Scale from 4 to 8
                    setScaleFactor(newScale);
                }
            }
        });
    }, []);

    useEffect(() => {
        const userAgent = navigator.userAgent.toLowerCase();
        const isMobile = /android|iphone|ipad|ipod|blackberry|windows phone|opera mini|mobile/i.test(userAgent);
        setIsDesktop(!isMobile);
    }, []);

    useEffect(() => {
        let timeout;

        const smoothResetCamera = () => {
            if (controls.current) {
                console.log('Smoothly resetting camera position...');
                
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
                    onUpdate: () => controls.current.update(),
                });
            }
        };

        const onControlChange = () => {
            console.log('User interaction detected, resetting timer...');
            clearTimeout(timeout);
            timeout = setTimeout(smoothResetCamera, 2000);
        };

        if (isDesktop) {
            controls.current?.addEventListener('change', onControlChange);
        }

        return () => {
            controls.current?.removeEventListener('change', onControlChange);
            clearTimeout(timeout);
        };
    }, [isDesktop]);

    return (
        <>
            {isDesktop && 
                <OrbitControls
                ref={controls}
                enableZoom={false}
                enableRotate={true}
                enablePan={false}
            />
            }
            {/* only render the orbit controls if it is on desktop */}
            <group scale={viewport.width / scaleFactor} >
                <Text font={'/fonts/Lausanne/TWKLausanne-700.otf'} position={[0, 0, -1]} fontSize={0.7} color="var(--white)" anchorX="center" anchorY="middle">
                    3D MODELS
                </Text>
                <mesh ref={mesh} {...nodes.TorusKnot001}>
                    <MeshTransmissionMaterial {...materialProps}/>
                </mesh>
            </group>
        </>
    )
}