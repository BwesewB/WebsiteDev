"use client";

import { useRef, useLayoutEffect, useState } from 'react'; // 1. Import useState
import gsap from 'gsap';
import SectionTwo from '@/components/templates/SectionTwo/page';
import styles from './mediaCarousel.module.css';

export default function MediaCarousel({ mediaItems = [] }) {
    const trackRef = useRef(null);
    // 2. Create a state to hold the calculated width
    const [totalWidth, setTotalWidth] = useState(0);

    useLayoutEffect(() => {
        if (mediaItems.length <= 1) return;

        const track = trackRef.current;
        const items = Array.from(track.children);
        
        // Calculate the width
        const calculatedWidth = items.slice(0, mediaItems.length).reduce((acc, item) => acc + item.offsetWidth, 0);
        
        // 3. Store the calculated width in the state
        setTotalWidth(calculatedWidth);

        // Only run the animation if the content overflows
        if (calculatedWidth > window.innerWidth) {
            const ctx = gsap.context(() => {
                gsap.to(track, {
                    x: `-${calculatedWidth}px`,
                    duration: mediaItems.length * 5,
                    ease: 'none',
                    repeat: -1,
                    modifiers: {
                        x: gsap.utils.wrap(-calculatedWidth, 0),
                    }
                });
            }, trackRef);

            return () => ctx.revert();
        } else {
            track.style.justifyContent = 'center';
        }

    }, [mediaItems]);

    return (
        <div className={styles.carouselContainer}>
            <div className={styles.carouselTrack} ref={trackRef}>
                {mediaItems.map((media, index) => (
                    <div key={`original-${index}`} className={styles.carouselItem}>
                        <SectionTwo {...media} />
                    </div>
                ))}
                {/* 4. The JSX can now safely access the totalWidth state variable */}
                {totalWidth > window.innerWidth && mediaItems.map((media, index) => (
                    <div key={`clone-${index}`} className={styles.carouselItem}>
                        <SectionTwo {...media} />
                    </div>
                ))}
            </div>
        </div>
    );
}
