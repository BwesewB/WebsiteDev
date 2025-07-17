"use client";

import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import SectionTwo from '@/components/templates/SectionTwo/page';
import MediaBlock from '@/components/molecules/MediaBlock/MediaBlock';
import MediaBlockOrChild from '@/components/molecules/MediaBlockOrChild/mediaBlockOrChild';
import styles from './mediaCarousel.module.css';

gsap.registerPlugin(Draggable);

export default function MediaCarousel({ 
    mediaItems = [],
    mediaCarouselWidth = "75vw",
}) {
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
                const minX = container.offsetWidth - track.offsetWidth;
                const maxX = 0;

                Draggable.create(track, {
                    type: 'x',
                    bounds: { minX, maxX },
                    edgeResistance: 0.5,
                    onPress: function() {
                        gsap.killTweensOf(track);
                    },
                    onDragEnd: function() {
                        // Find the ideal snap point
                        let closestSnap = gsap.utils.snap(snapPoints, this.x);

                        // THE FIX: Clamp the snap point to stay within the bounds.
                        // This ensures the first item snaps to the start (maxX) and
                        // the last item snaps to the end (minX).
                        const clampedSnap = gsap.utils.clamp(minX, maxX, closestSnap);
                        
                        gsap.to(track, {
                            x: clampedSnap,
                            duration: 0.4,
                            ease: "power2.out"
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
                    <div key={index} className={styles.carouselItem} style={{width: mediaCarouselWidth}}>
                        <MediaBlockOrChild
                            imageSrc={media.imageSrc}
                            videoSrc={media.videoSrc}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}