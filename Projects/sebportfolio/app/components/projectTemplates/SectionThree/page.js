"use client"

import styles from "./sectionThree.module.css"
import VisitButton from "../../uiComponents/visitButton/page"
import SourceCodeButton from "../../uiComponents/sourceCodeButton/page"
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger)

export default function SectionThree({
    externalLinkVisit,
    buttonContentColourVisit = "var(--sand)",
    backgroundColorVisit = "var(--blue)",

    externalLinkCode,
    buttonContentColourCode = "var(--sand)",
    backgroundColorCode = "var(--brown)",

    textColour = "var(--black)",
    challengeHeader = "Title",
    challengeParagraph = "Paragraph",
    solutionHeader = "Title",
    solutionParagraph = "Paragraph",

    startTrigger = "top 90%",
    endTrigger = "bottom 85%"
}) {

    const paragraphRef = useRef(null);

    const splitTextToSpans = (text) => {
        return text.split(" ").map((word, index) => (
            <span key={index} className={styles.paragraph}>
                {word}&nbsp;
            </span>
        ));
    };

    const splitHeaderToSpans = (text) => {
        return text.split(" ").map((word, index) => (
            <span key={index} className={styles.header}>
                {word}&nbsp;
            </span>
        ));
    };

    useEffect(() => {
        if (!paragraphRef.current) return;  // Ensure the element exists
    
        const paragraphText = paragraphRef.current.querySelectorAll(`.${styles.paragraph}`);
        const headerText = paragraphRef.current.querySelectorAll(`.${styles.header}`);
    
        if (headerText.length === 0 || paragraphText.length === 0) return; // Ensure elements are found
    
        gsap.fromTo(
            [headerText, paragraphText], 
            { opacity: 0, y: 10 },
            { 
                opacity: 1, 
                y: 0, 
                duration: 0.5, 
                ease: "power4.out", 
                stagger: 0.1,
                scrollTrigger: {
                    trigger: paragraphRef.current,
                    start: startTrigger,
                    end: endTrigger,
                    scrub: true,
                    once: true,
                    // markers: true
                }
            }
        );
    
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);
    

    return (
        <section className={styles.container}>
            <div className={styles.buttonRound}>
                <div className={styles.buttonSticky}>
                    {externalLinkVisit && (
                        <VisitButton
                            externalLink={externalLinkVisit}
                            buttonContentColour={buttonContentColourVisit}
                            backgroundColor={backgroundColorVisit}
                        />
                    )}
                    {externalLinkCode && (
                        <SourceCodeButton
                            externalLink={externalLinkCode}
                            buttonContentColour={buttonContentColourCode}
                            backgroundColor={backgroundColorCode}
                        />
                    )}
                </div>
            </div>
            <div className={styles.projectDescription} style={{ color: textColour }} ref={paragraphRef}>
                <div className={styles.textContainer}>
                    <h4>{splitHeaderToSpans(challengeHeader)}</h4>
                    <p>{splitTextToSpans(challengeParagraph)}</p>
                </div>
                <div className={styles.textContainer}>
                    <h4>{splitHeaderToSpans(solutionHeader)}</h4>
                    <p>{splitTextToSpans(solutionParagraph)}</p>
                </div>
            </div>
        </section>
    )
}