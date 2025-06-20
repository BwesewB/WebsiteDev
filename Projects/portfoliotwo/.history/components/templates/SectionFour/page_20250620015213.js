"use client"

import styles from "./sectionFour.module.css";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import SectionTwo from "../SectionTwo/page";

// Register the plugins
gsap.registerPlugin(ScrollTrigger, SplitText);

export default function SectionFour({
    textColour,
    imageSrc,
    videoSrc,
    sectionHeader = "",
    sectionParagraph = "",
    startTrigger = "top 90%",
    endTrigger = "bottom 85%"
}) {

    const containerRef = useRef(null);

    useLayoutEffect(() => {
        // Use GSAP Context for robust cleanup
        const ctx = gsap.context(() => {

            // Target the elements directly
            const header = containerRef.current.querySelector("h4");
            const paragraph = containerRef.current.querySelector("p");

            // Create the SplitText instance to split text into words
            const split = new SplitText([header, paragraph], {
                type: "words",
                wordsClass: "split-word" // Optional: add a class for styling
            });

            // The 'split.words' array now contains all the word spans
            gsap.from(split.words, {
                opacity: 0,
                y: 20,
                duration: 0.5,
                ease: "power4.out",
                stagger: 0.08, // A slightly faster stagger often feels better
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: startTrigger,
                    end: endTrigger,
                    scrub: true,
                    once: true,
                    // markers: true
                }
            });

        }, containerRef); // Scope the context to the container

        // The cleanup function is now handled by GSAP Context
        return () => ctx.revert();

    }, [sectionHeader, sectionParagraph, startTrigger, endTrigger]); // Rerun if props change

    return (
        <section className={styles.container} ref={containerRef}>
            <div className={styles.textContainer} style={{ color: textColour }}>
                {/* Render text directly. GSAP will handle splitting it. */}
                <h4>{sectionHeader}</h4>
                <p>{sectionParagraph}</p>
            </div>
            <div className={styles.projectMedia}>
                <SectionTwo imageSrc={imageSrc} videoSrc={videoSrc} />
            </div>
        </section>
    );
}