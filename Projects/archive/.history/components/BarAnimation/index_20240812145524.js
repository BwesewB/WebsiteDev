import { useEffect } from "react";
import { useState } from "react";
import gsap from "gsap";
import styles from "./PageTransition.module.css";

export default function PageTransition({ isAnimating }) {
    useEffect(() => {
        console.log("isAnimating:", isAnimating);
        if (isAnimating) {
        gsap.to("." + styles.bar, {
            duration: 1.5,
            delay: 3.5,
            height: 1,
            stagger: {
                amount: 0.5,
            },
            ease: "power1.inOut"
        });

        gsap.to("." + styles.overlay, {
            delay: 5,
            opacity: 0,
        })
    }
}, [isAnimating]);

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