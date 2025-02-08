"use client"

import { Canvas } from "@react-three/fiber";
import { BeerCan } from "./BeerCan.js";
import { Environment, Float, OrbitControls } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";


export default function ViewCanvas({
    flavor,
}) {
      
    return (
        <Canvas
            style={{
                position: "fixed",
                top: 0,
                left: "50%",
                transform: "translateX(-50%)",
                overflow: "hidden",

            }}
            shadows
            dpr={[1, 1.5]}
            gl={{ antialias: true }}
            camera={{
                fov:30,
            }}
        >
            <Float
                speed={1}
                rotationIntensity={1}
                floatIntensity={1}
                floatingRange={[-0.1, 0.1]}
            >
                <BeerCan flavor={flavor}/>
            </Float>

            <Environment files="/hdr/beach.hdr" environmentIntensity={1.2}/>

        </Canvas>
    )
}