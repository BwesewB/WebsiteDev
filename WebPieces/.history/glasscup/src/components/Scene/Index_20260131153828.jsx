"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Model from "./Model";
import { Environment, OrbitControls  } from "@react-three/drei";

export default function Scene() {
    return (
        <Canvas
            camera={{ position: [0, 8, 3], fov: 45 }}       
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

            <OrbitControls enablePan={false} enableZoom={true}/>
        <ambientLight intensity={0.8} />
        <directionalLight intensity={10} position={[3, 5, 2]} />

            <mesh position={[0, 0, -2]}>
                <planeGeometry args={[10, 10]} />
                <meshStandardMaterial color="#ffffff" />
            </mesh>
            {/* <Environment preset="dawn" /> */}
            <Suspense fallback={null}>
                <Model />
            </Suspense>
        </Canvas>
    );
}