"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Model from "./Model";
import { Environment } from "@react-three/drei";

export default function Scene() {
    return (
        <Canvas                
            camera={{ position: [0, 2, 5], fov: 45 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true }}
        >
                <OrbitControls makeDefault enablePan={false} />
            <directionalLight intensity={1} position={[0, 3, 2]} />
            <Environment preset="dawn" />
            <Suspense fallback={null}>
                <Model />
            </Suspense>
        </Canvas>
    );
}