import { useEffect } from "react";
import gsap from "gsap";
import styles from "./PageTransition.module.css";

export default function PageTransition({ isExiting }) {
    useEffect(() => {
        if (isExiting) {
            gsap.to("." + styles.bar, {
                duration: 1.5,
                height: 0,
                stagger: {
                    amount: 0.5,
                },
                ease: "power1.inOut"
            });
        } else {
            gsap.to("." + styles.bar, {
                duration: 1.5,
                height: "100vh",
                stagger: {
                    amount: 0.5,
                },
                ease: "power1.inOut"
            });
        }
    }, [isExiting]);

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