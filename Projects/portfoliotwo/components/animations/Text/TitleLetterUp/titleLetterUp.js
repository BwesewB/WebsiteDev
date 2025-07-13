"use client"

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

        let split = new SplitText(titleElement, { type: 'chars', charsClass: "char" });

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
                markers: true,
            };
        }

        // Animate the characters in using the final config
        gsap.from(split.chars, animationConfig);
        
        // The cleanup function remains the same
        return () => {
            if (split.revert) {
                split.revert();
            }
        };

    }, { 
        scope: containerRef, 
        dependencies: [children, useScrollTrigger] // Add the new prop to dependencies
    });

    return (
        <>
            <div ref={containerRef} style={{ overflow: "hidden", display: "inline-block" }}>
                <h1 
                    ref={titleRef} 
                    className={className} 
                    style={{ height: "100%" }}
                >
                    {children}
                </h1>
            </div>
        </>
    )
}