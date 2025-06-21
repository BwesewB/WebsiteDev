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

        // We still use GSAP Context for easy cleanup
        const ctx = gsap.context(() => {

            // The Key Change: Use matchMedia for responsive setup
            ScrollTrigger.matchMedia({

                // This media query will match all screen sizes, effectively running on all devices
                "(min-width: 1px)": function() {

                    const h4 = containerRef.current.querySelector("h4");
                    const p = containerRef.current.querySelector("p");
                    const elementsToSplit = [h4, p].filter(Boolean);

                    if (elementsToSplit.length === 0) return;

                    const split = new SplitText(elementsToSplit, {
                        type: "lines, words",
                        linesClass: styles.splitLine
                    });

                    // The animation remains the same
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

                    // IMPORTANT: We return a cleanup function *inside* the matchMedia function.
                    // This function will be called automatically by GSAP when the window resizes.
                    return () => {
                        split.revert(); // This specifically reverts just this SplitText instance.
                    };
                }

            });

        }, containerRef);

        return () => ctx.revert();
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