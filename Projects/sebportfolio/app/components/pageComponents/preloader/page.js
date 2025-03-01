"use client";

import styles from './preloader.module.css';
import gsap from 'gsap';
import { useEffect, useRef, useState } from "react";

export default function Preloader() {
    const preloaderRef = useRef(null);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (preloaderRef.current) {
            gsap.to(preloaderRef.current, {
                delay: 3.5,
                opacity: 0,
                duration: 0.4,
                onComplete: () => setIsVisible(false) // Remove after fade-out
            });
        }
    }, []);

    if (!isVisible) return null; // Remove from DOM

    return (
        <>
            <div className={styles.preloader} ref={preloaderRef} >
                <video src="/media/3dWorks/SphereSunHighRes.mp4" className={styles.video} autoPlay/>
            </div>
        </>
        
    );
}