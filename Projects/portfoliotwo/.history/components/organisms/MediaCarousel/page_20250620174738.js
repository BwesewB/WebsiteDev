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
                // We create the Draggable instance here
                Draggable.create(track, {
                    type: 'x',
                    bounds: {
                        minX: container.offsetWidth - track.offsetWidth,
                        maxX: 0
                    },
                    edgeResistance: 0.85,

                    // THE DEFINITIVE FIX:
                    // This function runs when the user lets go of the drag.
                    onDragEnd: function() {
                        // "this" refers to the Draggable instance.
                        
                        // Find the closest snap point.
                        let closestSnap = gsap.utils.snap(snapPoints, this.x);

                        // 1. DISABLE the Draggable instance so the user can't
                        //    interfere with the snapping animation.
                        this.disable();

                        // 2. Animate the track to the calculated snap point.
                        gsap.to(track, {
                            x: closestSnap,
                            duration: 0.4, // A slightly faster snap feels better
                            ease: "power2.out",
                            
                            // 3. When the animation is complete, RE-ENABLE the
                            //    Draggable instance for the next interaction.
                            onComplete: () => {
                                this.enable();
                            }
                        });
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