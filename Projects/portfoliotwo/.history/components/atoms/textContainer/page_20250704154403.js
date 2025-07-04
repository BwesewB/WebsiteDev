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

        const timeout = setTimeout(() => {
            const elementsToSplit = [
                containerRef.current.querySelector("h4"),
                containerRef.current.querySelector("p")
            ].filter(Boolean);

            if (elementsToSplit.length === 0) return;

            const ctx = gsap.context(() => {
                // We wrap each line in a parent div to create a mask.
                // The outer div gets the `split-line-parent` class from GSAP.
                // The inner div (the actual text line) gets the styles.splitLine class.
                const split = new SplitText(elementsToSplit, {
                    type: "lines",
                    linesClass: styles.splitLine // The actual line of text
                });

                // NEW: Wrap each line in a div that will act as the mask
                split.lines.forEach((line) => {
                    const wrapper = document.createElement("div");
                    wrapper.style.overflow = "hidden";
                    line.parentNode.appendChild(wrapper);
                    wrapper.appendChild(line);
                });

                gsap.from(split.lines, {
                    yPercent: 100,
                    duration: 0.8,
                    ease: "power4.out",
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: startTrigger,
                        toggleActions: "play none none none",
                    },
                    onComplete: () => {
                        // Revert the split to clean up the DOM
                        if (split.isSplit) {
                            split.revert();
                        }
                    }
                });
            }, containerRef);

            return () => {
                clearTimeout(timeout);
                if (ctx) ctx.revert();
            };

        }, 100);

        return () => {
            clearTimeout(timeout);
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