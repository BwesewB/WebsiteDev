"use client"

import styles from "./sectionFour.module.css"
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SectionTwo from "../SectionTwo/page";

gsap.registerPlugin(ScrollTrigger)

export default function SectionFour({
    textColour,
    imageSrc,
    videoSrc,
    sectionHeader = "",
    sectionParagraph = "",
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
        const paragraphText = paragraphRef.current.querySelectorAll(`.${styles.paragraph}`);
        const headerText = paragraphRef.current.querySelectorAll(`.${styles.header}`);
    
        const animation = gsap.fromTo(
            [headerText, paragraphText],
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power4.out", stagger: 0.1,
              scrollTrigger: {
                  trigger: paragraphRef.current,
                  start: startTrigger,
                  end: endTrigger,
                  scrub: true,
                  once: true,
                //   markers: true
              }
            }
        );
    
        return () => {
            animation.kill(); // Clean up GSAP animation on unmount
            ScrollTrigger.getAll().forEach(trigger => trigger.kill()); // Remove all scroll triggers
        };
    }, []);

    return (
        <section className={styles.container}>
            <div className={styles.textContainer} style={{ color: textColour }} ref={paragraphRef}>
                <h4>{splitHeaderToSpans(sectionHeader)}</h4>
                <p>{splitTextToSpans(sectionParagraph)}</p>
            </div>
            <div className={styles.projectMedia}>
                <SectionTwo imageSrc={imageSrc} videoSrc={videoSrc}/>
            </div>
        </section>
    )
}