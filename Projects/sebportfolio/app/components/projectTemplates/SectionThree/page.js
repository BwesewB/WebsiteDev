"use client"

import styles from "./sectionThree.module.css"
import ButtonRound from "../../uiComponents/buttonRound/page"
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger)

export default function SectionThree({
    textContent,
    externalLink,
    buttonTextColour,
    backgroundColor,

    textColour = "var(--white)",
    challengeHeader = "",
    challengeParagraph = "",
    solutionHeader = "",
    solutionParagraph = "",
}) {

    const paragraphRef = useRef(null);

    const splitTextToSpans = (text) => {
        return text.split(" ").map((word, index) => (
            <span key={index} className={styles.paragraph}>
                {word}
            </span>
        ));
    };

    const splitHeaderToSpans = (text) => {
        return text.split(" ").map((word, index) => (
            <span key={index} className={styles.header}>
                {word}
            </span>
        ));
    };

    useEffect(() => {
        const paragraphText = paragraphRef.current.querySelectorAll(`.${styles.paragraph}`);
        const headerText = paragraphRef.current.querySelectorAll(`.${styles.header}`);

        gsap.fromTo([headerText, paragraphText], {
            opacity: 0,
            y: 10
        }, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power4.out",
            stagger: 0.1,
            scrollTrigger: {
                trigger: paragraphRef.current, // Use the container element as the trigger
                start: "top 90%",
                end: "bottom 85%",
                scrub: true, // Scrubs the animation while scrolling
                once: true, // Ensures the animation runs only once
                markers: true
            }
        });
    })

    return (
        <>
            <div className={styles.container}>
                <div className={styles.buttonRound}>
                    <div className={styles.buttonSticky}>
                        <ButtonRound 
                            textContent = {textContent}
                            externalLink = {externalLink}
                            buttonTextColour = {buttonTextColour}
                            backgroundColor = {backgroundColor}
                        />
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
            </div>
        </>
    )
}