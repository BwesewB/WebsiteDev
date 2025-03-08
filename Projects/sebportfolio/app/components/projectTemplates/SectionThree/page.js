"use client"

import styles from "./sectionThree.module.css"
import VisitButton from "../../uiComponents/visitButton/page"
import SourceCodeButton from "../../uiComponents/sourceCodeButton/page"
import FigmaButton from "../../uiComponents/figmaButton/page"
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import SectionTwo from "../SectionTwo/page"

gsap.registerPlugin(ScrollTrigger)

export default function SectionThree({
    externalLinkVisit,
    buttonContentColourVisit,
    backgroundColorVisit,
    visit,

    externalLinkCode,
    buttonContentColourCode,
    backgroundColorCode,

    externalLinkFigma,
    buttonContentColourFigma,
    backgroundColorFigma,
    figma,

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
                <div 
                    className={styles.buttonSticky}
                    style={{ 
                        position: sticky ? "sticky" : "relative", 
                        top: sticky ? "var(--sideSpacing)" : "auto" 
                    }}
                >
                    {externalLinkVisit && (
                        <VisitButton
                            externalLink={externalLinkVisit}
                            buttonContentColour={buttonContentColourVisit}
                            backgroundColor={backgroundColorVisit}
                            visit={visit}
                        />
                    )}
                    {externalLinkCode && (
                        <SourceCodeButton
                            externalLink={externalLinkCode}
                            buttonContentColour={buttonContentColourCode}
                            backgroundColor={backgroundColorCode}
                        />
                    )}
                    {externalLinkFigma && (
                        <FigmaButton
                            externalLink={externalLinkFigma}
                            buttonContentColour={buttonContentColourFigma}
                            backgroundColor={backgroundColorFigma}
                            figma={figma}
                        />
                    )}
                    {(imageSrc || videoSrc) && (
                        <SectionTwo imageSrc={imageSrc} videoSrc={videoSrc} />
                    )}
                </div>
            </div>
            <div className={styles.projectDescription} style={{ color: textColour }} ref={paragraphRef}>
                <div className={styles.textContainer}>
                    <h4>{splitHeaderToSpans(challengeHeader)}</h4>
                    <p>{splitTextToSpans(challengeParagraph)}</p>
                </div>
                {(solutionHeader.trim() || solutionParagraph.trim()) && (
                    <div className={styles.textContainer}>
                        <h4>{splitHeaderToSpans(solutionHeader)}</h4>
                        <p>{splitTextToSpans(solutionParagraph)}</p>
                    </div>
                )}
            </div>
        </section>
    )
}