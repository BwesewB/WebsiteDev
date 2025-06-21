"use client";

import { useState, useEffect } from 'react';
import styles from "./TwoColumnMediaLayout.module.css";
import StickyContainer from "@/components/atoms/stickyContainer/page";

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

export default function TwoColumnMediaLayout({
    leftContent,
    rightContent,
    stickyColumn = 'none', // Can be 'left', 'right', or 'none'
    mobileLayout = 'stack' // 'stack' or 'carousel-first' if you need that later
}) {
    const isMobile = useMediaQuery('(max-width: 768px)');

    // On mobile, we always stack left content on top of right content
    if (isMobile) {
        return (
            <section className={styles.container}>
                <div className={styles.column}>
                    {leftContent}
                </div>
                <div className={styles.column}>
                    {rightContent}
                </div>
            </section>
        );
    }

    // --- Desktop Layout ---
    return (
        <section className={styles.container}>
            {/* Left Column */}
            <div className={`${styles.column} ${styles.leftColumnMarker}`}>
                {stickyColumn === 'left' ? (
                    <StickyContainer endTrigger={`.${styles.rightColumnMarker}`}>
                        {leftContent}
                    </StickyContainer>
                ) : (
                    leftContent
                )}
            </div>

            {/* Right Column */}
            <div className={`${styles.column} ${styles.rightColumnMarker}`}>
                {stickyColumn === 'right' ? (
                    <StickyContainer endTrigger={`.${styles.leftColumnMarker}`}>
                        {rightContent}
                    </StickyContainer>
                ) : (
                    rightContent
                )}
            </div>
        </section>
    );
}