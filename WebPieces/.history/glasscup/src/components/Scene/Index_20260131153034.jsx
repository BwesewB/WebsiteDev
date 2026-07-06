"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Model from "./Model";
import { Environment, OrbitControls  } from "@react-three/drei";

export default function Scene() {
    return (
        <Canvas                
            onCreated={({ gl }) => {
    const canvas = gl.domElement;
    canvas.addEventListener("webglcontextlost", (e) => {
      console.warn("WEBGL CONTEXT LOST", e);
    });
    canvas.addEventListener("webglcontextrestored", () => {
      console.warn("WEBGL CONTEXT RESTORED");
    });
  }}
            dpr={[1, 1.5]}
            shadows={false}
            gl={{ antialias: false, powerPreference: "high-performance" }}
            style={{ display: 'block', border: '1px solid red', width: "100%", height: "100vh"}}
        >
            <directionalLight intensity={1} position={[0, 3, 2]} />
            {/* <Environment preset="dawn" /> */}
            <Suspense fallback={null}>
                <Model />
            </Suspense>
        </Canvas>
    );
}