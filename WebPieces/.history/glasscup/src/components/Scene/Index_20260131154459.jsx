"use client";
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Model from "./Model";
import { Environment } from "@react-three/drei";

export default function Scene() {
    return (
        <Canvas                
            shadows
            dpr={[1, 1.5]}
            gl={{ antialias: true }}
        >
            <directionalLight intensity={1} position={[0, 3, 2]} />
            <Environment preset="dawn" />
            <Suspense fallback={null}>
                <Model />
            </Suspense>
        </Canvas>
    );
}