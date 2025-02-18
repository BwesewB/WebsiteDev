"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./sectionTwo.module.css";
import Image from "next/image";

export default function SectionTwo({ 
    imageSrc, 
    videoSrc, 
    initialMute = true, 
    sectionHeading,
    mediaWidth,
}) {
    const videoRef = useRef(null);
    let fadeInterval = useRef(null);
    const [showOverlay, setShowOverlay] = useState(false);
    const [isMuted, setIsMuted] = useState(initialMute);

    const fadeOutVolume = (videoElement) => {
        clearInterval(fadeInterval.current);
        fadeInterval.current = setInterval(() => {
            if (videoElement.volume > 0.05) {
                videoElement.volume = Math.max(0, videoElement.volume - 0.05);
            } else {
                videoElement.volume = 0;
                videoElement.muted = true;
                clearInterval(fadeInterval.current);
            }
        }, 10);
    };

    const fadeInVolume = (videoElement) => {
        clearInterval(fadeInterval.current);
        videoElement.muted = false;
        fadeInterval.current = setInterval(() => {
            if (videoElement.volume < 0.95) {
                videoElement.volume = Math.min(1, videoElement.volume + 0.05);
            } else {
                videoElement.volume = 1;
                clearInterval(fadeInterval.current);
            }
        }, 10);
    };

    // When the video is in view
    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        if (isMuted) {
            videoElement.muted = true;
            videoElement.volume = 0;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    if (isMuted) {
                        fadeOutVolume(videoElement); 
                    } else {
                        fadeInVolume(videoElement); 
                    }
                } else {
                    fadeOutVolume(videoElement);
                }
            },
            { threshold: 0.5 }
        );

        observer.observe(videoElement);

        return () => {
            clearInterval(fadeInterval.current);
            observer.unobserve(videoElement);
        };
    }, [isMuted]);

    const handleToggleMute = () => {
        if (videoRef.current) {
            const video = videoRef.current;

            if (video.muted || video.volume === 0) {
                fadeInVolume(video);
                setIsMuted(false);
            } else {
                fadeOutVolume(video);
                setIsMuted(true);
            }
        }
    };

    const handleMouseLeave = () => {
        setTimeout(() => setShowOverlay(false), 300); // Delayed hide to match the CSS transition
    };

    return (
        <section className={styles.sectionTwoWrap}>
            <h4>{sectionHeading}</h4>
            <div className={styles.mediaContainer}>
                {imageSrc && 
                    <img src={imageSrc} alt={imageSrc} className={styles.imageElement} style={{width: mediaWidth}}/>
                }
                
                {videoSrc && (
                    <div 
                        className={styles.videoWrapper}
                        onMouseEnter={() => !initialMute && setShowOverlay(true)} //nice
                        onMouseLeave={handleMouseLeave}
                        style={{width: mediaWidth}}
                    >
                        <video
                            ref={videoRef}
                            src={videoSrc}
                            className={styles.videoElement}
                            autoPlay
                            loop
                            preload="auto"
                            playsInline
                            onError={(e) => {
                            console.error("Error loading video", e);
                            }}
                        />
                        {showOverlay && (
                            <div className={styles.overlay} onClick={handleToggleMute}>
                                <h5>{isMuted ? "Unmute" : "Mute"}</h5>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}