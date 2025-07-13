"use client"

import styles from "./sectionThree.module.css"
import UnifiedButton from "@/components/atoms/unifiedButton/page"
import TextContainer from "@/components/atoms/textContainer/page"
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import SectionTwo from "../SectionTwo/page"
import StickyContainer from "@/components/atoms/stickyContainer/page";

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
    startTrigger = "top 85%", // Adjusted for a better trigger point
    endTrigger = "bottom 85%",
    sticky = true,
}) {

    const textContainerRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const headers = textContainerRef.current.querySelectorAll("h4");
            const paragraphs = textContainerRef.current.querySelectorAll("p");

            if (headers.length === 0 && paragraphs.length === 0) return;

            // CHANGE #1: Split by "lines" as well as "words"
            const split = new SplitText([...headers, ...paragraphs], {
                type: "lines, words", // Create lines and words
                linesClass: styles['split-line'] // Apply our CSS module class to each line
            });

            // Animate the words within the lines
            gsap.from(split.words, {
                yPercent: 100, // Move words down by 100% of their own height
                duration: 0.6,
                ease: "power4.out",
                stagger: 0.02,
                // CHANGE #2: The new ScrollTrigger config
                scrollTrigger: {
                    trigger: textContainerRef.current,
                    start: startTrigger,
                    toggleActions: "play none none none", // Play once on enter, then do nothing
                    // markers: true
                }
            });

        }, textContainerRef);

        return () => ctx.revert();

    }, [challengeHeader, challengeParagraph, solutionHeader, solutionParagraph, startTrigger, endTrigger]);


    return (
        // The rest of your component remains exactly the same
        <section className={styles.container}>
             <div className={styles.buttonRound}>
                 <div
                     className={styles.buttonSticky}
                     style={{
                         position: sticky ? "sticky" : "relative",
                         top: sticky ? "var(--imageTextSpacing)" : "auto"
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
             <div className={styles.projectDescription} style={{ color: textColour }} ref={textContainerRef}>
                    <TextContainer
                        header={challengeHeader}
                        paragraph={challengeParagraph}
                    />
                 {(solutionHeader.trim() || solutionParagraph.trim()) && (
                    <TextContainer
                        header={solutionHeader}
                        paragraph={solutionParagraph}
                    />
                 )}
             </div>
         </section>
    )
}