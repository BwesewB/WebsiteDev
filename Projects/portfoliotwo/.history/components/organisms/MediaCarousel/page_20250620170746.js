"use client";

import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import SectionTwo from '@/components/organisms/SectionTwo/page';
import styles from './mobileMediaCarousel.module.css';

export default function MobileMediaCarousel({ mediaItems = [] }) {
    const trackRef = useRef(null);

    useLayoutEffect(() => {
        // Only run if there's more than one item
        if (mediaItems.length <= 1) return;

        const track = trackRef.current;
        const items = Array.from(track.children);
        
        // Calculate the total width of the original items
        const totalWidth = items.slice(0, mediaItems.length).reduce((acc, item) => acc + item.offsetWidth, 0);

        // We only need an infinite scroll if the content overflows
        if (totalWidth > window.innerWidth) {
            
            // GSAP Seamless Loop Animation
            const ctx = gsap.context(() => {
                // Animate the track horizontally
                gsap.to(track, {
                    x: `-${totalWidth}px`,
                    duration: mediaItems.length * 5, // Adjust speed based on number of items
                    ease: 'none',
                    repeat: -1, // Loop infinitely
                    modifiers: {
                        // Use GSAP's wrap utility to create the seamless effect
                        x: gsap.utils.wrap(-totalWidth, 0),
                    }
                });
            }, trackRef);

            return () => ctx.revert();
        } else {
            // If it doesn't overflow, just center it
            track.style.justifyContent = 'center';
        }

    }, [mediaItems]);

    return (
        <div className={styles.carouselContainer}>
            <div className={styles.carouselTrack} ref={trackRef}>
                {/* Render the items */}
                {mediaItems.map((media, index) => (
                    <div key={`original-${index}`} className={styles.carouselItem}>
                        <SectionTwo {...media} />
                    </div>
                ))}
                {/* Render them again for the seamless loop effect */}
                {totalWidth > window.innerWidth && mediaItems.map((media, index) => (
                    <div key={`clone-${index}`} className={styles.carouselItem}>
                        <SectionTwo {...media} />
                    </div>
                ))}
            </div>
        </div>
    );
}
