"use client";
import React from "react";
import { Canvas } from "@react-three/fiber";
import Model from "./Model";
import { Environment } from "@react-three/drei";


export default function Scene() {
    return (
        <Canvas>
            <directionalLight intensity={1} position={[0, 3, 2]}/>
            <Environment preset='dawn' />
            <Model />
        </Canvas>
    );
}
