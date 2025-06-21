"use client";

import { useState, useEffect, useLayoutEffect } from 'react';
import styles from "./TwoColumnMediaLayout.module.css";
import SectionTwo from "../SectionTwo/page";
import UnifiedButton from "@/components/atoms/unifiedButton/page";
import StickyContainer from "@/components/atoms/stickyContainer/page";
import TextContainer from "@/components/atoms/textContainer/page";
import MediaCarousel from "@/components/organisms/MediaCarousel/page"; // Import the new component
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Custom Hook to check for media queries
const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(false);
    useEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches) {
            setMatches(media.matches);
        }
        const listener = () => setMatches(media.matches);
        window.addEventListener("resize", listener);
        return () => window.removeEventListener("resize", listener);
    }, [matches, query]);
    return matches;
};

// ... (Your TextColumnContent component remains the same) ...
const TextColumnContent = ({ textBlocks, buttons, inlineMedia, textColour }) => (
    <div className={styles.textContentWrapper} style={{ color: textColour }}>
        {textBlocks.map((block, index) => (
            <TextContainer key={index} header={block.header} paragraph={block.paragraph} />
        ))}
        <div className={styles.buttonContainer}>
            {buttons.map((button, index) => <UnifiedButton key={index} {...button} />)}
        </div>
        {inlineMedia && <div className={styles.inlineMediaWrapper}><SectionTwo {...inlineMedia} /></div>}
    </div>
);


export default function TwoColumnMediaLayout({
    textBlocks = [],
    mediaItems = [],
    buttons = [],
    inlineMedia = null,
    textSide = 'left',
    stickyText = true,
    textColour = "var(--black)",
}) {
    // Check if we are on a mobile screen
    const isMobile = useMediaQuery('(max-width: 768px)');

    // Use GSAP's matchMedia for responsive animations
    useLayoutEffect(() => {
        const ctx = ScrollTrigger.matchMedia({
            // Desktop-only animations
            "(min-width: 769px)": function() {
                // If sticky is enabled, create the sticky container
                if (stickyText) {
                    const textColumn = document.querySelector(`.${styles.textColumn}`);
                    const mediaColumn = document.querySelector(`.${styles.mediaColumn}`);
                    
                    if (textColumn && mediaColumn) {
                       // This is where you would initialize your StickyContainer logic if it were here
                       // Since it's a separate component, its own useEffect will handle it.
                       // This ensures it only tries to run on desktop.
                    }
                }
            },
        });
        return () => ctx.revert();
    }, [stickyText]);

    const textColumn = (
        <div className={styles.textColumn}>
            {/* On desktop, check if sticky is enabled. On mobile, never be sticky. */}
            {!isMobile && stickyText ? (
                <StickyContainer endTrigger={`.${styles.mediaColumn}`}>
                    <TextColumnContent {...{ textBlocks, buttons, inlineMedia, textColour }} />
                </StickyContainer>
            ) : (
                <TextColumnContent {...{ textBlocks, buttons, inlineMedia, textColour }} />
            )}
        </div>
    );

    const mediaColumn = (
        <div className={styles.mediaColumn}>
            {mediaItems.map((media, index) => (
                <SectionTwo key={index} {...media} />
            ))}
        </div>
    );

    return (
        <section className={styles.container}>
            {isMobile ? (
                // Mobile Layout: Carousel on top, Text below
                <>
                    <MediaCarousel mediaItems={mediaItems} />
                    <TextColumnContent {...{ textBlocks, buttons, inlineMedia, textColour }} />
                </>
            ) : (
                // Desktop Layout: Two columns
                textSide === 'left' ? (
                    <>
                        {textColumn}
                        {mediaColumn}
                    </>
                ) : (
                    <>
                        {mediaColumn}
                        {textColumn}
                    </>
                )
            )}
        </section>
    );
}

