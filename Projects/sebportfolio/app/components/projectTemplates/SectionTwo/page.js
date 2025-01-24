"use client"

import { useEffect, useRef } from 'react';
import styles from './sectionTwo.module.css';


export default function SectionTwo({ 
    imageSrc, 
    videoSrc 
}) {
    const videoRef = useRef(null);

    let fadeInterval = useRef(null); // Keeping track of intervals to prevent the overlap

    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        const fadeOutVolume = () => {
            clearInterval(fadeInterval.current); // Clear any existing interval
            fadeInterval.current = setInterval(() => {
                if (videoElement.volume > 0.05) {
                    videoElement.volume = Math.max(0, videoElement.volume - 0.05);
                } else {
                    videoElement.volume = 0;
                    videoElement.muted = true;  // Mute once volume reaches 0
                    clearInterval(fadeInterval.current);
                    console.log("Volume is inactive");
                }
            }, 1);
        };

        const fadeInVolume = () => {
            clearInterval(fadeInterval.current); // Clear any existing interval
            videoElement.muted = false; // Unmute first
            fadeInterval.current = setInterval(() => {
                if (videoElement.volume < 0.95) {
                    videoElement.volume = Math.min(1, videoElement.volume + 0.05);
                } else {
                    videoElement.volume = 1;
                    clearInterval(fadeInterval.current);
                    console.log("Full Volume");
                }
            }, 1);
        };

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    fadeInVolume();
                    console.log("Volume Activated");
                } else {
                    fadeOutVolume();
                    console.log("Muted");
                }
            },
            { threshold: 0.5 } // when 50% of the video is visible it triggers 
        );

        observer.observe(videoElement);

        return () => {
            clearInterval(fadeInterval.current); // Cleanup
            observer.unobserve(videoElement);
        };
    }, []);

    return (
        <div className={styles.mediaContainer}>
            {
                imageSrc && 
                <img src={imageSrc} alt={imageSrc} className={styles.imageElement} />
            }
            
            {
                videoSrc && 
                <video 
                    ref={videoRef}
                    src={videoSrc} 
                    // type="video/mp4"
                    className={styles.videoElement}
                    autoPlay
                    loop 
                    preload="auto"
                    playsInline
                    onError={(e) => {
                        console.error('Error loading video', e);
                    }}
                />
            }
        </div>
    );
}