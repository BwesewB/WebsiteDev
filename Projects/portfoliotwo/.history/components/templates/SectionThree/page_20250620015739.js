"use client"

import styles from "./sectionThree.module.css"
import UnifiedButton from "@/components/atoms/unifiedButton/page"
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText"; // Import SplitText
import SectionTwo from "../SectionTwo/page"

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText);

export default function SectionThree({
    buttons = [],
    imageSrc,
    videoSrc,
    textColour = "var(--black)",
    challengeHeader = "Title",
    challengeParagraph = "Paragraph",
    solutionHeader = "",
    solutionParagraph = "",
    startTrigger = "top 90%",
    endTrigger = "bottom 85%",
    sticky = true,
}) {

    // A more descriptive name for the ref
    const textContainerRef = useRef(null);

    useLayoutEffect(() => {
        // Use GSAP Context for robust cleanup of all animations and splits
        const ctx = gsap.context(() => {

            // Find all h4 and p tags within the container.
            // This elegantly handles whether the "solution" block exists or not.
            const headers = textContainerRef.current.querySelectorAll("h4");
            const paragraphs = textContainerRef.current.querySelectorAll("p");

            // If no text elements are found, do nothing.
            if (headers.length === 0 && paragraphs.length === 0) return;

            // Split all found text elements into words
            const split = new SplitText([...headers, ...paragraphs], {
                type: "words",
                wordsClass: "split-word"
            });

            // Animate all the words with a single, continuous stagger
            gsap.from(split.words, {
                opacity: 0,
                y: 20,
                duration: 0.5,
                ease: "power4.out",
                stagger: 0.08,
                scrollTrigger: {
                    trigger: textContainerRef.current,
                    start: startTrigger,
                    end: endTrigger,
                    scrub: true,
                    once: true,
                    // markers: true
                }
            });

        }, textContainerRef); // Scope context to the main text container

        // Context handles all cleanup automatically
        return () => ctx.revert();

    }, [challengeHeader, challengeParagraph, solutionHeader, solutionParagraph, startTrigger, endTrigger]);


    return (
        <section className={styles.container}>
            <div className={styles.buttonRound}>
                <div
                    className={styles.buttonSticky}
                    style={{
                        position: sticky ? "sticky" : "relative",
                        top: sticky ? "var(--sideSpacing)" : "auto"
                    }}
                >
                    {buttons
                        .filter((button) => button.externalLink)
                        .map((button, index) => (
                            <UnifiedButton
                                key={index}
                                text={button.text}
                                icon={button.icon}
                                externalLink={button.externalLink}
                                buttonContentColour={button.buttonContentColour}
                                backgroundColor={button.backgroundColor}
                            />
                        ))}
                    {(imageSrc || videoSrc) && (
                        <SectionTwo imageSrc={imageSrc} videoSrc={videoSrc} />
                    )}
                </div>
            </div>
            {/* Attach the ref to the main container for all text content */}
            <div className={styles.projectDescription} style={{ color: textColour }} ref={textContainerRef}>
                <div className={styles.textContainer}>
                    {/* Render text directly */}
                    <h4>{challengeHeader}</h4>
                    <p>{challengeParagraph}</p>
                </div>
                {/* The conditional logic remains the same */}
                {(solutionHeader.trim() || solutionParagraph.trim()) && (
                    <div className={styles.textContainer}>
                        <h4>{solutionHeader}</h4>
                        <p>{solutionParagraph}</p>
                    </div>
                )}
            </div>
        </section>
    )
}