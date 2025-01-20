import React from "react";
import { useGLTF } from "@react-three/drei";

export default function Model() {

    const { nodes } = useGLTF("/models/KnotTorus.glb");

    return (
        <group>
            <mesh {...nodes.TorusKnot001}>

            </mesh>
        </group>
    )
}