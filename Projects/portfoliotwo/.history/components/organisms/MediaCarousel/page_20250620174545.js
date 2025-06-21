"use client";

import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import SectionTwo from '@/components/templates/SectionTwo/page';
import styles from './mediaCarousel.module.css';

gsap.registerPlugin(Draggable);

export default function MediaCarousel({ mediaItems = [] }) {
    const trackRef = useRef(null);
    const containerRef = useRef(null);

    useLayoutEffect(() => {
        let ctx;
        const timeout = setTimeout(() => {
            if (mediaItems.length === 0) return;

            const track = trackRef.current;
            const container = containerRef.current;
            const items = gsap.utils.toArray(track.children);

            if (track.offsetWidth <= container.offsetWidth) return;

            const snapPoints = items.map(item => {
                const itemCenter = item.offsetLeft + item.offsetWidth / 2;
                const containerCenter = container.offsetWidth / 2;
                return -(itemCenter - containerCenter);
            });

            ctx = gsap.context(() => {
                // This is the final, simplified, and correct configuration
                Draggable.create(track, {
                    type: 'x',
                    edgeResistance: 0.85,
                    bounds: {
                        minX: container.offsetWidth - track.offsetWidth,
                        maxX: 0
                    },
                    // Re-enable inertia for a smooth, natural "flick"
                    inertia: true, 
                    
                    // THE FIX: Use Draggable's built-in snap object.
                    // This handles the animation internally and avoids conflicts.
                    snap: {
                        x: snapPoints,
                        duration: { min: 0.2, max: 0.5 }, // Let GSAP decide the best duration
                        ease: 'power2.out'
                    }
                });
            }, containerRef);

        }, 200);

        return () => {
            clearTimeout(timeout);
            if (ctx) {
                ctx.revert();
            }
        };
    }, [mediaItems]);

    return (
        <div className={styles.carouselContainer} ref={containerRef}>
            <div className={styles.carouselTrack} ref={trackRef}>
                {mediaItems.map((media, index) => (
                    <div key={index} className={styles.carouselItem}>
                        <SectionTwo {...media} />
                    </div>
                ))}
            </div>
        </div>
    );
}