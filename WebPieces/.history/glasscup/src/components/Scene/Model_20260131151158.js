import React, { useRef } from 'react'
import { MeshTransmissionMaterial, useGLTF, Text } from "@react-three/drei";
import { useFrame, useThree } from '@react-three/fiber'
// import { useControls } from 'leva'

export default function Model() {
    const { nodes } = useGLTF("/glassCup.glb");
    const { viewport } = useThree()
    const glassCup = useRef(null);

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
    
    return (
        <group scale={1} >
            <mesh ref={glassCup} geometry={nodes.GlassCup01.geometry}>
                <MeshTransmissionMaterial {...materialProps} />
            </mesh>
        </group>
    )
}