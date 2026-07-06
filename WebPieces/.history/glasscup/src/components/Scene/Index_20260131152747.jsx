"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Model from "./Model";
import { Environment, OrbitControls  } from "@react-three/drei";

export default function Scene() {
    return (
        <Canvas
        dpr={1}
        camera={{ position: [0, 0.5, 3], fov: 45 }}
        gl={{ antialias: false, powerPreference: "high-performance" }}
      >
            <directionalLight intensity={1} position={[0, 3, 2]} />
            <Environment preset="dawn" />
            <Suspense fallback={null}>
                <Model />
            </Suspense>
        </Canvas>
    );
}