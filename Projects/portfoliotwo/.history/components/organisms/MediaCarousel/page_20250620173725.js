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
        // A small delay to give images a moment to render and get their dimensions.
        // This is a common and effective pattern for this kind of layout calculation.
        const timeout = setTimeout(() => {
            if (mediaItems.length === 0) return;

            const track = trackRef.current;
            const container = containerRef.current;
            const items = gsap.utils.toArray(track.children);

            // Only create the draggable instance if the content overflows
            if (track.offsetWidth > container.offsetWidth) {
                
                const snapPoints = items.map(item => {
                    const itemCenter = item.offsetLeft + item.offsetWidth / 2;
                    const containerCenter = container.offsetWidth / 2;
                    return -(itemCenter - containerCenter);
                });

                // For debugging: Check if the snap points are calculated correctly.
                // You should see an array of negative numbers in your console.
                console.log("Calculated Snap Points:", snapPoints);

                const ctx = gsap.context(() => {
                    Draggable.create(track, {
                        type: 'x',
                        inertia: true,
                        edgeResistance: 0.85,
                        // FIX #1: Define bounds manually for maximum reliability.
                        // This prevents dragging beyond the content on either side.
                        bounds: {
                            minX: container.offsetWidth - track.offsetWidth,
                            maxX: 0
                        },
                        // FIX #2: Use the more robust function syntax for snapping.
                        // This tells GSAP to find the closest value in your array.
                        snap: {
                            x: (endValue) => gsap.utils.snap(snapPoints, endValue)
                        }
                    });
                }, containerRef);
                
                // Store context on the timeout for cleanup
                timeout.ctx = ctx;
            }
        }, 200); // 200ms delay

        return () => {
            clearTimeout(timeout);
            if (timeout.ctx) {
                timeout.ctx.revert();
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