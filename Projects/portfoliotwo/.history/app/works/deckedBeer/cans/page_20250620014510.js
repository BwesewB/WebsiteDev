"use client"

import { Canvas } from "@react-three/fiber";
import { Environment, Float, OrbitControls } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { BeerCan, DEFAULT_BEER_CAN_TRANSFORMS  } from "./BeerCan";
import styles from "./cans.module.css"
import ArrowIcon from "@/public/icons/arrowCarouselIcon";


const FLAVORS = ["fish", "crab", "seaweed"];

export default function ViewCanvas({}) {
    const can1Ref = useRef(null);
    const [currentFlavorIndex, setCurrentFlavorIndex] = useState(0);

    const handleNextFlavor = () => {
      setCurrentFlavorIndex((prevIndex) => (prevIndex + 1) % FLAVORS.length);
    };
  
    const handlePreviousFlavor = () => {
      setCurrentFlavorIndex((prevIndex) =>
        (prevIndex - 1 + FLAVORS.length) % FLAVORS.length
      );
    };
      
    return (
        <div className={styles.canStyle}>
            <div className={styles.leftButton} onClick={handlePreviousFlavor}>
                <ArrowIcon />
            </div>
            <Canvas
                className={styles.canvas}
                shadows
                dpr={[1, 1.5]}
                gl={{ antialias: true }}
                camera={{
                    fov:30,
                }}
            >
                <BeerCan 
                    flavor={FLAVORS[currentFlavorIndex]}
                    ref={can1Ref}
                    position={DEFAULT_BEER_CAN_TRANSFORMS.position}
                    scale={DEFAULT_BEER_CAN_TRANSFORMS.scale}
                />
                <Environment files="/hdr/beach.hdr" environmentIntensity={1.2}/>
            </Canvas>
            <div className={styles.rightButton} onClick={handleNextFlavor}>
                <ArrowIcon />
            </div>
        </div>

    )
}