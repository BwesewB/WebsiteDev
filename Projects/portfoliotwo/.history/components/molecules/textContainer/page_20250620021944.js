"use client"

import styles from './textContainer.module.css';
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

// Register plugins once, but it's safe to do it here as well
gsap.registerPlugin(ScrollTrigger, SplitText);

export default function TextContainer({
    header,
    paragraph,
    textColour = "var(--black)",
    startTrigger = "top 85%",
    className = ""
}) {
    const containerRef = useRef(null);

    useLayoutEffect(() => {
        // If there's no text, don't initialize animations
        if (!header && !paragraph) return;

        const ctx = gsap.context(() => {
            const h4 = containerRef.current.querySelector("h4");
            const p = containerRef.current.querySelector("p");
            const elementsToSplit = [h4, p].filter(Boolean); // Filter out null elements

            if (elementsToSplit.length === 0) return;

            const split = new SplitText(elementsToSplit, {
                type: "lines, words",
                linesClass: styles.splitLine // Use the local module's class
            });

            gsap.from(split.words, {
                opacity: 0,
                yPercent: 100,
                duration: 0.6,
                ease: "power4.out",
                stagger: 0.03,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: startTrigger,
                    toggleActions: "play none none none",
                }
            });

        }, containerRef);

        return () => ctx.revert();
    }, [header, paragraph, startTrigger]);

    // Don't render the component if there's no content
    if (!header && !paragraph) {
        return null;
    }

    return (
        <div ref={containerRef} className={`${styles.textContainer} ${className}`} style={{ color: textColour }}>
            {header && <h4>{header}</h4>}
            {paragraph && <p>{paragraph}</p>}
        </div>
    );
}