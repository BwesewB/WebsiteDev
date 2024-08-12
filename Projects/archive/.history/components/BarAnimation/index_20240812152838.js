import { useEffect } from "react";
import { useState } from "react";
import gsap from "gsap";
import styles from "./PageTransition.module.css";

export default function PageTransition({ isAnimating }) {
    useEffect(() => {
        console.log("isAnimating:", isAnimating);
        if (isAnimating) {
            const timeline = gsap.timeline();

            // Animate bars in from the bottom (outside the viewport) to their position
            timeline.fromTo(
                "." + styles.bar,
                { height: 0, y: "100vh" }, // Start with bars at the bottom
                { 
                    duration: 1.5, 
                    height: "100vh", 
                    y: 0, 
                    stagger: { amount: 0.5 },
                    ease: "power1.inOut" 
                }
            );

            // Pause for a few seconds
            timeline.to(
                "." + styles.bar,
                {

                    delay: 1.5, // Adjust this delay if needed
                }
            );

            // Animate bars out (move them up and fade out)
            timeline.to(
                "." + styles.bar,
                {
                    duration: 1.5,
                    y: "-100vh", // Move bars up out of the screen
                    stagger: { amount: 0.5 },
                    ease: "power1.inOut"
                }
            );

            // Fade out overlay after bars move up
            timeline.to(
                "." + styles.overlay,
                {
                    duration: 1,
                    opacity: 0,
                    ease: "power1.inOut",
                },
                "-=1" // Start fading out slightly before bars finish moving up
            );
        }
    }, [isAnimating]);

    // Return null if not animating to avoid rendering the component
    if (!isAnimating) return null;

    return (
        <div className={styles.overlay} style={{ opacity: isAnimating ? 1 : 0 }}>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
        </div>
    );
}