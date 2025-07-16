"use client"

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./titleLetterUp.module.css"

gsap.registerPlugin(SplitText, ScrollTrigger); 

export default function TitleLetterUp({
    children,
    className,
    useScrollTrigger = true,
}) {
    const titleRef = useRef(null);
    const containerRef = useRef(null);

    useGSAP(() => {
        const titleElement = titleRef.current;
        const containerElement = containerRef.current;
        if (!titleElement || !children || !containerElement) return;

        gsap.set(titleElement, { autoAlpha: 1 });
        
        let split = new SplitText(titleElement, { 
            type: 'words,chars', 
            wordsClass: styles.word, // Use the CSS module class
            charsClass: styles.char,  // Use the CSS module class
        });

        // --- 3. Create a configuration object for the animation ---
        const animationConfig = {
            yPercent: 100,
            opacity: 0,
            stagger: 0.05,
            duration: 0.8,
            ease: 'power3.out',
        };

        // --- 4. Conditionally add the ScrollTrigger object ---
        if (useScrollTrigger) {
            animationConfig.scrollTrigger = {
                trigger: containerElement, // Use the container as the trigger
                start: 'top 85%', // Start animation when top of container is 85% from top of viewport
                toggleActions: 'play none none none', // Play once on enter
                // markers: true,
            };
        } 

        gsap.from(split.chars, animationConfig);
        
        return () => {
            if (split.revert) {
                split.revert();
            }
        };

    }, { 
        scope: containerRef, 
        dependencies: [children, useScrollTrigger ]
    });

    return (
        <>
            <div ref={containerRef} style={{ overflow: "hidden", display: "inline-block" }}>
                <h1 
                    ref={titleRef} 
                    className={`${styles.headerContainer} ${className}`}
                    style={{ visibility: 'hidden' }}
                >
                    {children}
                </h1>
            </div>
        </>
    )
}