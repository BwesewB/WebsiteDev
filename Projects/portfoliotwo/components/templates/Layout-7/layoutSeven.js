"use client";

import { useState, useEffect, useRef } from 'react';
import styles from "./layoutSeven.module.css";
import MediaBlock from '@/components/molecules/MediaBlock/MediaBlock';
import StickyContainer from "@/components/atoms/stickyContainer/page";
import TextContainer from "@/components/atoms/textContainer/page";
import MediaCarousel from "@/components/organisms/MediaCarousel/page";

const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(false);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const media = window.matchMedia(query);
            const updateMatches = () => setMatches(media.matches);
            updateMatches();
            media.addEventListener("change", updateMatches);
            return () => media.removeEventListener("change", updateMatches);
        }
    }, [query]);
    return matches;
};

export default function LayoutSeven({
    header,
    paragraph,
    mediaItems = [],
    mediaCarouselWidth,
    
}) {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const leftColumnRef = useRef(null);
    const rightColumnRef = useRef(null);

    const textContent = (header || paragraph) ? (
        <div className={styles.textContainerWrap}>
            <TextContainer
                header={header}
                paragraph={paragraph}
            />
        </div>

    ) : null;

    // 2. Prepare media content. This logic is correct.
    const mediaContent = (
        <div className={styles.mediaColumn}>
            {mediaItems.map((item, index) => (
                <div key={index} className={styles.mediaItemWrapper}>
                    <MediaBlock
                        imageSrc={item.imageSrc}
                        videoSrc={item.videoSrc}
                    />
                </div>
            ))}
        </div>
    );

    return (
        <section 
            key={isMobile ? 'mobile' : 'desktop'} 
            className={styles.container}
        >
            {isMobile ? (
                // --- MOBILE VIEW ---
                <>
                    {mediaItems.length > 0 && <MediaCarousel mediaItems={mediaItems} mediaCarouselWidth={mediaCarouselWidth} />}
                    {textContent && <div className={styles.mobileTextWrapper}>{textContent}</div>}
                </>
            ) : (
                // --- DESKTOP VIEW ---
                <>
                    <div className={styles.leftGridColumn} ref={leftColumnRef}>
                        <StickyContainer endTriggerRef={rightColumnRef}>
                            {textContent}
                        </StickyContainer>
                    </div>
                    <div className={styles.rightGridColumn} ref={rightColumnRef}>
                        {mediaContent}
                    </div>
                </>
            )}
        </section>
    );
}