"use client"

import styles from "./motion.module.css"
import HeroSection from "@/app/components/pageComponents/heroSection/page";
import { useRef } from "react";
import MotionProject from "@/app/components/pageComponents/motionProject/page"; 

export default function Motion() {
    const motionRef = useRef(null);

    return (
        <>
            <div ref={motionRef} className={styles.motionContainer}>
                <h1>Hero section in progress... Please Scroll Down</h1>
                {/* <HeroSection videoSrc="/media/blackHole/Watermelon video.mp4" parentRef={motionRef} position="sticky"/> */}
            </div>
            <div className={styles.motionPage}>
                <div className={styles.motionContent}>
                    <MotionProject 
                        videoSrc="/media/blackHole/Clip1.mp4"
                        title="black hole"
                        projectLink="/pages/motion/projects/blackHole/"
                        description="This interactive project explores the science of black holes through a one-and-a-half-minute video using sound effects and custom-designed assets to create an immersive experience. Building upon this project, a 12 page interactive coded experience using next.js supplements the video's information with smooth animation transitions powered by GSAP, seamlessly combining the original clips with interactive elements. "
                    />
                    <MotionProject 
                        videoSrc="/media/taxes/GOTTEM.mp4"
                        title="taxes!"
                        projectLink="/pages/motion/projects/taxes/"
                        description="Taxes are hard! Just turning 18 at the time of my first After Effects project, I got a little taste of how harsh paying your first tax bill can be, so I decided to make a fun and comedic video about taxes."
                    />
                </div>
            </div>

        </>

    );
}