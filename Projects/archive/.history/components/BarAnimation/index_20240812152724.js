import { useEffect } from "react";
import { useState } from "react";
import gsap from "gsap";
import styles from "./PageTransition.module.css";

export default function PageTransition({ isAnimating }) {
    const [animationComplete, setAnimationComplete] = useState(false);

    useEffect(() => {
        console.log("PageTransition isAnimating:", isAnimating);
        if (isAnimating) {
            const timeline = gsap.timeline({
                onComplete: () => {
                    setAnimationComplete(true);
                    console.log("Animation completed");
                }
            });

            timeline.fromTo(
                "." + styles.bar,
                { height: 0, y: "100vh" },
                {
                    duration: 1.5,
                    height: "100vh",
                    y: 0,
                    stagger: { amount: 0.5 },
                    ease: "power1.inOut"
                }
            );

            timeline.to(
                "." + styles.bar,
                {
                    delay: 1.5
                }
            );

            timeline.to(
                "." + styles.bar,
                {
                    duration: 1.5,
                    y: "-100vh",
                    stagger: { amount: 0.5 },
                    ease: "power1.inOut"
                }
            );

            timeline.to(
                "." + styles.overlay,
                {
                    duration: 1,
                    opacity: 0,
                    ease: "power1.inOut"
                },
                "-=1"
            );
        }
    }, [isAnimating]);

    useEffect(() => {
        if (animationComplete) {
            console.log("Resetting animation state");
        }
    }, [animationComplete]);

    if (!isAnimating && animationComplete) return null;

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