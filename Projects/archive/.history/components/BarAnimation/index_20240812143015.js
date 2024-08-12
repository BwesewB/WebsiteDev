import { useEffect } from "react";
import { useState } from "react";
import gsap from "gsap";
import styles from "./PageTransition.module.css";

export default function PageTransition({ isExiting }) {
    const [hasExited, setHasExited] = useState(false); // Add a state to track if the animation has started

    useEffect(() => {
        if (isExiting && !hasExited) {
            setHasExited(true); // Prevent re-running the animation
            gsap.to("." + styles.bar, {
                duration: 1.5,
                height: 0,
                stagger: {
                    amount: 0.5,
                },
                ease: "power1.inOut"
            });
        }
    }, [isExiting, hasExited]);

    return (
        <div className={styles.overlay}>
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