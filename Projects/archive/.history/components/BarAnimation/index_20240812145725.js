import { useEffect } from "react";
import { useState } from "react";
import gsap from "gsap";
import styles from "./PageTransition.module.css";

export default function PageTransition({ isAnimating }) {
    useEffect(() => {
        if (isAnimating) {
            gsap.to("." + styles.bar, {
                duration: 1.5,
                height: 0,
                stagger: {
                    amount: 0.5,
                },
                ease: "power1.inOut"
            });

            gsap.to("." + styles.overlay, {
                duration: 1.5, // Adjust based on your animation
                opacity: 0,
                delay: 1.5, // Delay to ensure it starts after bars animate
            });
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