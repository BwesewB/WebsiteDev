"use client"

import styles from "./sectionOne.module.css";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)

export default function SectionOne({
    paragraphTitleText = "",
    textColour = "var(--black)",
}) {

    const headerRef = useRef(null);

    const splitTextToSpans = (text) => {
        return text.split(" ").map((word, index) => (
            <span key={index} className={styles.headingText}>
                {word}
            </span>
        ));
    };

    useEffect(() => {
        const headingText = document.querySelectorAll(`.${styles.headingText}`);
        gsap.fromTo(headingText, {
            opacity: 0,
            y: 10
        }, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power4.out",
            stagger: 0.2,
            scrollTrigger: {
                trigger: headerRef.current, // Use the container element as the trigger
                start: "top 95%",
                end: "bottom 90%",
                scrub: true, // Scrubs the animation while scrolling
                once: false, // Ensures the animation runs only once
                markers:true
            }
        });
    })

    return (
        <div ref={headerRef} className={styles.largeTextContainer}>
            <h3 style={{ color: textColour }}>
                {splitTextToSpans(paragraphTitleText)}
            </h3>
        </div>
    );
}