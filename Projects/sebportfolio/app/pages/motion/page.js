"use client"

import styles from "./motion.module.css"
import HeroSection from "@/app/components/pageComponents/heroSection/page";
import { useRef } from "react";
import MotionProject from "@/app/components/pageComponents/motionProject/page"; 

export default function Motion() {
    const motionRef = useRef(null);

    return (
        <div className="container">
            <div ref={motionRef} className={styles.motionContainer}>
                <h1>Hero section in progress... Please Scroll Down</h1>
            </div>
            <div className={styles.motionPage}>
                <div className={styles.motionContent}>
                    <MotionProject 
                        videoSrc="/media/blackHole/Clip1.mp4"
                        title="black hole"
                        projectLink="/pages/motion/projects/blackHole/"
                        description="This project explores black holes through a 90-second video blending together sound effects and custom assets to create a visual story. A 12-page interactive experience, built with Next.js and GSAP, extends the video's content with smooth animations and interactive elements."
                    />
                    <MotionProject 
                        videoSrc="/media/taxes/GOTTEM.mp4"
                        title="taxes!"
                        projectLink="/pages/motion/projects/taxes/"
                        description="Taxes are hard! Inspired by the experience of paying a first tax bill at 18, this fun and comedic After Effects project was created to explore the topic with humor."
                    />
                </div>
            </div>
        </div>
    );
}