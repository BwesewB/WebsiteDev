"use client"

import styles from "./motion.module.css"
import HeroSection from "@/app/components/heroSection/page";
import { useRef } from "react";

export default function Motion() {
    const motionRef = useRef(null);

    return (
        <div className={styles.motionPage}>
            <div ref={motionRef} className={styles.motionContainer}>
                <HeroSection videoSrc="/videos/Watermelon video.mp4" parentRef={motionRef} position="sticky"/>
            </div>
            <div className={styles.motionContent}>

            </div>
        </div>

    );
}