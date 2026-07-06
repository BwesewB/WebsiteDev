import React, { useRef } from 'react'
import { MeshTransmissionMaterial, useGLTF, Text } from "@react-three/drei";
import { useFrame, useThree } from '@react-three/fiber'
import { useControls } from 'leva'

export default function Model()
{
    const { nodes } = useGLTF("/medias/torrus.glb");
    const { viewport } = useThree()
    const torus = useRef(null);
    
    useFrame( () => {
       
        if (torus.current) torus.current.rotation.x += 0.02
    })

    const materialProps = useControls({
  
     thickness: { value: 0.2, min: 0, max: 3, step: 0.05 },
        roughness:
{ value: 0, min: 0, max: 1, step: 0.1 },
        transmission: {value: 1, min:
0, max: 1, step: 0.1},
...
        ior: { value: 1.2, min: 0, max: 3, step: 0.1 },
  
     chromaticAberration: { value: 0.02, min: 0, max: 1},
        backside: {
value: true},
    })
    
    return (
        <group scale={viewport.width /3.75} >
            <Text font={'/fonts/PPNeueMontreal-Bold.otf'} position={[0, 0,
            <Text
                font={'/fonts/PPNeueMontreal-Bold.otf'}
                position={[0, 0, -1]}
                fontSize={0.5}
                color="white"
                anchorX="center"
                anchorY="middle"
            >
           
    hello world!
            </Text>
            <mesh ref={torus}
{...nodes.Torus002}>
                <MeshTransmissionMaterial {...materialProps}/>
        
   </mesh>
        </group>
    )
    // use your GLB placed in public/ (e.g. public/glassCup.glb)
    const { nodes } = useGLTF('/glassCup.glb')
    const { viewport } = useThree()
    const torus = useRef(null)

    useFrame(() => {
        if (torus.current) torus.current.rotation.x += 0.02
    })

    const materialProps = useControls({
        thickness: { value: 0.2, min: 0, max: 3, step: 0.05 },
        roughness: { value: 0, min: 0, max: 1, step: 0.1 },
        transmission: { value: 1, min: 0, max: 1, step: 0.1 },
        anisotropy: { value: 0, min: 0, max: 1, step: 0.01 },
        samples: { value: 8, min: 1, max: 32, step: 1 },
        ior: { value: 1.2, min: 0, max: 3, step: 0.1 },
        chromaticAberration: { value: 0.02, min: 0, max: 1 },
        backside: { value: true },
    })

    return (
        <group scale={viewport.width / 3.75}>
            <Text
                font={'/fonts/PPNeueMontreal-Bold.otf'}
                position={[0, 0, -1]}
                fontSize={0.5}
                color="white"
                anchorX="center"
                anchorY="middle"
            >
                hello world!
            </Text>

            {/* If your GLB has a named mesh, update this to the correct node name.
                    Fallback: try rendering nodes.scene or inspect the gltf structure. */}
            {nodes && nodes.Torus002 ? (
                <mesh ref={torus} {...nodes.Torus002}>
                    <MeshTransmissionMaterial {...materialProps} />
                </mesh>
            ) : (
                // fallback: render whole scene if specific node not found
                nodes && nodes.scene ? (
                    <primitive object={nodes.scene} />
                ) : null
            )}
        </group>
    )
}
