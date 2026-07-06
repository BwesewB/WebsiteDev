"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Model from "./Model";
import { Environment, OrbitControls  } from "@react-three/drei";

export default function Scene() {
    return (
        <Canvas                
            // camera={{ position: [0, 0, 0], fov: 105 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true }}
            style={{ display: 'block', border: '1px solid red', width: "100%", height: "100%"}}
        >
            <directionalLight intensity={1} position={[0, 3, 2]} />
            <Environment preset="dawn" />
            <Suspense fallback={null}>
                <Model />
            </Suspense>
        </Canvas>
    );
}