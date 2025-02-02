"use client"

import styles from "./sectionFive.module.css"
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger)

export default function SectionFive({
    textColour = "var(--white)",
    challengeHeader = "",
    challengeParagraph = "",

    // startTrigger = "top 90%",
    // endTrigger = "bottom 85%"
}) {

    // const paragraphRef = useRef(null);

    // const splitTextToSpans = (text) => {
    //     return text.split(" ").map((word, index) => (
    //         <span key={index} className={styles.paragraph}>
    //             {word}&nbsp;
    //         </span>
    //     ));
    // };

    // const splitHeaderToSpans = (text) => {
    //     return text.split(" ").map((word, index) => (
    //         <span key={index} className={styles.header}>
    //             {word}&nbsp;
    //         </span>
    //     ));
    // };

    // useEffect(() => {
    //     if (!paragraphRef.current) return;  // Ensure the element exists
    
    //     const paragraphText = paragraphRef.current.querySelectorAll(`.${styles.paragraph}`);
    //     const headerText = paragraphRef.current.querySelectorAll(`.${styles.header}`);
    
    //     if (headerText.length === 0 || paragraphText.length === 0) return; // Ensure elements are found
    
    //     gsap.fromTo(
    //         [headerText, paragraphText], 
    //         { opacity: 0, y: 10 },
    //         { 
    //             opacity: 1, 
    //             y: 0, 
    //             duration: 0.5, 
    //             ease: "power4.out", 
    //             stagger: 0.1,
    //             scrollTrigger: {
    //                 trigger: paragraphRef.current,
    //                 start: startTrigger,
    //                 end: endTrigger,
    //                 scrub: true,
    //                 once: true,
    //                 // markers: true
    //             }
    //         }
    //     );
    
    //     return () => {
    //         ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    //     };
    // }, []);
    

    return (
        <>
            <div className={styles.container}>
                <div className={styles.headerSection} style={{ color: textColour }}>
                    {/* <div className={styles.headerSticky}> */}
                        {/* <h4>{splitHeaderToSpans(challengeHeader)}</h4> */}
                        <h4>{challengeHeader}</h4>
                    {/* </div> */}
                </div>
                <div className={styles.projectDescription} style={{ color: textColour }}>
                    <div className={styles.textContainer}>              
                        {/* <p>{splitTextToSpans(challengeParagraph)}</p> */}
                        <p>{challengeParagraph}</p>
                    </div>
                </div>
            </div>
        </>
    )
}