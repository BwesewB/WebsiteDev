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
        if (mediaItems.length === 0) return;

        const track = trackRef.current;
        const container = containerRef.current;
        // Use GSAP's utility function to get an array of the items
        const items = gsap.utils.toArray(track.children);

        // Only create the draggable instance if the content overflows
        if (track.offsetWidth > container.offsetWidth) {

            // THE FIX: Calculate the snap points for each item
            const snapPoints = items.map(item => {
                // The position to snap to is the negative of the item's center
                // minus the container's center.
                const itemCenter = item.offsetLeft + item.offsetWidth / 2;
                const containerCenter = container.offsetWidth / 2;
                return -(itemCenter - containerCenter);
            });

            const ctx = gsap.context(() => {
                Draggable.create(track, {
                    type: 'x',
                    bounds: container,
                    inertia: true,
                    edgeResistance: 1,
                    snap: snapPoints,
                });
            }, containerRef);
            
            return () => ctx.revert();
        }

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