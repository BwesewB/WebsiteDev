"use client"

import styles from './textContainer.module.css';
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function TextContainer({
    header,
    paragraph,
    textColour,
    startTrigger = "top 85%",
    className = ""
}) {
    const containerRef = useRef(null);

    useLayoutEffect(() => {
        if (!header && !paragraph) return;

        // We use a timeout to ensure all DOM elements are ready, especially in Next.js
        const timeout = setTimeout(() => {
            const elementsToSplit = [
                containerRef.current.querySelector("h4"),
                containerRef.current.querySelector("p")
            ].filter(Boolean);

            if (elementsToSplit.length === 0) return;

            const ctx = gsap.context(() => {
                const split = new SplitText(elementsToSplit, {
                    type: "lines, words",
                    linesClass: styles.splitLine
                });

                // The animation itself remains the same...
                gsap.from(split.words, {
                    yPercent: 100,
                    duration: 0.6,
                    ease: "power4.out",
                    stagger: 0.03,
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: startTrigger,
                        toggleActions: "play none none none",
                    },
                    // THE FIX: When the animation is complete, revert the split.
                    onComplete: () => {
                        if (split.isSplit) {
                            split.revert();
                        }
                    }
                });
            }, containerRef);
            
            timeout.ctx = ctx; // Store context for cleanup

        }, 100); // A small delay for safety

        return () => {
            clearTimeout(timeout);
            if (timeout.ctx) {
                timeout.ctx.revert();
            }
        };

    }, [header, paragraph, startTrigger]);

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