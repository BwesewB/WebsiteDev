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
        // This variable will hold the GSAP context
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
                Draggable.create(track, {
                    type: 'x',
                    bounds: {
                        minX: container.offsetWidth - track.offsetWidth,
                        maxX: 0
                    },
                    edgeResistance: 0.85,

                    // FIX #1: This function runs when you FIRST press down
                    onPress: function() {
                        // Kill any active tweens on the track to prevent conflicts
                        gsap.killTweensOf(track);
                    },

                    onDragEnd: function() {
                        const closestSnap = gsap.utils.snap(snapPoints, this.x);
                        
                        // The snapping animation remains the same
                        gsap.to(track, {
                            x: closestSnap,
                            duration: 0.5,
                            ease: "power2.out"
                        });
                    }
                });
            }, containerRef);

        }, 200);

        // FIX #2: The cleanup function now correctly references the `ctx` variable
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