"use client"

import { Canvas } from "@react-three/fiber";
import { Environment, Float, OrbitControls } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react"
import { BeerCan, DEFAULT_BEER_CAN_TRANSFORMS  } from "./BeerCan";
import styles from "./cans.module.css"


gsap.registerPlugin(useGSAP)

export default function ViewCanvas({}) {
    const can1Ref = useRef(null);
      
    return (
        <div className={styles.canStyle}>
            <Canvas
                // style={{
                //     position: "absolute",
                //     bottom: 0,
                //     left: "50%",
                //     transform: "translateX(-50%)",
                //     overflow: "hidden",
                //     border: "1px solid red"
                // }}
                // className={styles.canStyle}
                shadows
                dpr={[1, 1.5]}
                gl={{ antialias: true }}
                camera={{
                    fov:30,
                }}
            >

                <BeerCan 
                    flavor="fish" 
                    ref={can1Ref}
                    position={DEFAULT_BEER_CAN_TRANSFORMS.position}
                    scale={DEFAULT_BEER_CAN_TRANSFORMS.scale}
                />
                {/* <BeerCan flavor="crab" ref={can2Ref} />
                <BeerCan flavor="seaweed" ref={can3Ref} /> */}

                <Environment files="/hdr/beach.hdr" environmentIntensity={1.2}/>

            </Canvas>
        </div>

    )
}