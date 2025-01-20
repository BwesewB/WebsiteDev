import React, { useRef } from 'react'
import { useGLTF, Text } from "@react-three/drei";
import { useFrame, useThree } from '@react-three/fiber'
import { MeshTransmissionMaterial } from "@react-three/drei";
import { useControls } from 'leva';

export default function Model() {

    const materialProps = useControls({
        thickness: { value: 0.2, min: 0, max: 3, step: 0.05 },
        roughness: { value: 0, min: 0, max: 1, step: 0.1 },
        transmission: {value: 1, min: 0, max: 1, step: 0.1},
        ior: { value: 1.2, min: 0, max: 3, step: 0.1 },
        chromaticAberration: { value: 0.02, min: 0, max: 1},
        backside: { value: true},
    })


    const mesh = useRef()
    const { nodes } = useGLTF("/models/KnotTorus.glb");
    const { viewport } = useThree()

    useFrame(() => {
        mesh.current.rotation.x += 0.005;
    })

    return (
        <group scale={viewport.width / 3.75} >
            <Text font={'/fonts/Lausanne/TWKLausanne-700.otf'} position={[0, 0, -1]} fontSize={0.7} color="var(--white)" anchorX="center" anchorY="middle">
                3D MODELS
            </Text>
            <mesh ref={mesh} {...nodes.TorusKnot001}>
                <MeshTransmissionMaterial {...materialProps}/>
            </mesh>
        </group>
    )
}