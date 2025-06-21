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
        // A small delay to ensure all images have rendered and have dimensions
        const timeout = setTimeout(() => {
            if (mediaItems.length === 0) return;

            const track = trackRef.current;
            const container = containerRef.current;
            const items = gsap.utils.toArray(track.children);

            if (track.offsetWidth <= container.offsetWidth) return;

            // Calculate the positions to snap to
            const snapPoints = items.map(item => {
                const itemCenter = item.offsetLeft + item.offsetWidth / 2;
                const containerCenter = container.offsetWidth / 2;
                return -(itemCenter - containerCenter);
            });

            const ctx = gsap.context(() => {
                Draggable.create(track, {
                    type: 'x',
                    bounds: {
                        minX: container.offsetWidth - track.offsetWidth,
                        maxX: 0
                    },
                    edgeResistance: 0.85,
                    // We remove inertia and snap. We will handle this ourselves.

                    // THE FIX: This function runs when the user stops dragging
                    onDragEnd: function() {
                        // Find the closest snap point to the final drag position
                        let closestSnap = gsap.utils.snap(snapPoints, this.x);

                        // Animate the track to that final snap position
                        gsap.to(track, {
                            x: closestSnap,
                            duration: 0.5,
                            ease: "power2.out"
                        });
                    }
                });
            }, containerRef);

            timeout.ctx = ctx;
        }, 200);

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