"use client";

import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable'; // 1. Import Draggable
import SectionTwo from '@/components/templates/SectionTwo/page';
import styles from './mediaCarousel.module.css';

// 2. Register the plugin
gsap.registerPlugin(Draggable);

export default function MediaCarousel({ mediaItems = [] }) {
    const trackRef = useRef(null);
    const containerRef = useRef(null); // Ref for the container to calculate bounds

    useLayoutEffect(() => {
        if (mediaItems.length === 0) return;

        const track = trackRef.current;
        const container = containerRef.current;

        // Only create a draggable instance if the content overflows
        if (track.offsetWidth > container.offsetWidth) {
            const ctx = gsap.context(() => {
                // 3. Create a Draggable instance instead of a tween
                Draggable.create(track, {
                    type: 'x', // Allow horizontal dragging
                    bounds: container, // Keep the track within the bounds of its container
                    inertia: true, // Adds a nice "flick" momentum
                    edgeResistance: 0.85, // Adds a "gummy" feel at the edges
                    throwProps: true // Enables the flick animation
                });
            }, containerRef);
            
            return () => ctx.revert();
        }

    }, [mediaItems]);

    return (
        // The container needs the ref for bounds calculation
        <div className={styles.carouselContainer} ref={containerRef}>
            <div className={styles.carouselTrack} ref={trackRef}>
                {/* The content is no longer duplicated */}
                {mediaItems.map((media, index) => (
                    <div key={index} className={styles.carouselItem}>
                        <SectionTwo {...media} />
                    </div>
                ))}
            </div>
        </div>
    );
}