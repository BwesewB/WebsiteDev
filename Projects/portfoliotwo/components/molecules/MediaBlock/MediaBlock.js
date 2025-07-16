'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from './MediaBlock.module.css';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// You can create SVG icon components for a better look
const MuteIcon = () => <svg>...</svg>;
const UnmuteIcon = () => <svg>...</svg>;

const MediaBlock = ({
  imageSrc,
  videoSrc,
  initialMute = true,
  sectionHeading,
  mediaWidth = '100%',
  enableRevealAnimation = true,
}) => {
  const isVideo = !!videoSrc; 
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isMuted, setIsMuted] = useState(initialMute);

  useGSAP(() => {
    if (!enableRevealAnimation) return;

    const container = containerRef.current;
    const media = container.querySelector(`.${styles.media}`);

    // Simple guard clause
    if (!container || !media) return;

    // By the time useGSAP runs, the elements are in the DOM.
    // We can create the animation directly.
    // useGSAP's cleanup function will automatically kill this ScrollTrigger on unmount/refresh.

    // For better performance, create one timeline controlled by one ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 90%",
        toggleActions: "play none none none",
        
        // markers: process.env.NODE_ENV === "development", // Only show markers in dev
      }
    });

    tl.fromTo(container,
      {
        clipPath: "inset(0% 0% 100% 0%)",
      },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        ease: "power3.out",
        duration: 2,
      }
    ).fromTo(media,
      {
        scale: 1.5
      },
      {
        scale: 1,
        ease: "power3.out",
        duration: 1.4,
      },
      "<" 
    );

  }, { scope: containerRef, dependencies: [enableRevealAnimation, imageSrc, videoSrc] });

  useEffect(() => {
    if (!isVideo || !containerRef.current) return;

    const videoElement = videoRef.current;
    if (!videoElement) return;
    const observerCallback = (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        videoElement.play().catch(error => {
          console.warn("Video autoplay was prevented. Ensure video is muted.", error);
        });
      } else {
        videoElement.pause();
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.5,
    });

    observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [isVideo]); 

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };
  
  // --- Error Handling ---
  if (!videoSrc && !imageSrc) {
    return (
      <div className={styles.errorContainer} style={{ width: mediaWidth }}>
        <p>Error: No image or video source provided.</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={styles.container}
      style={{ width: mediaWidth }}
    >
      {/* <div ref={mediaRef}> */}
        {isVideo ? (
          <video
            ref={videoRef}
            src={videoSrc}
            className={styles.media}
            loop
            muted={isMuted}
            playsInline // VERY IMPORTANT for preventing fullscreen on mobile
            autoPlay // Hint for browsers, but Intersection Observer is the real controller
          />
        ) : (
            <Image
              src={imageSrc}
              alt={sectionHeading || 'Portfolio media showcase'}
              layout="fill"
              objectFit="cover"
              className={styles.media}
              priority // Consider adding `priority` if the image is above the fold
            />
        )}
      {/* </div> */}
      {/* Overlays */}
      <div className={styles.overlay}>
        {sectionHeading && (
          <h3 className={styles.heading}>{sectionHeading}</h3>
        )}

        {/* {isVideo && (
          <button onClick={toggleMute} className={styles.muteButton} aria-label={isMuted ? "Unmute video" : "Mute video"}>
            {isMuted ? 'UNMUTE' : 'MUTE'}
          </button>
        )} */}
      </div>
    </div>
  );
};

export default MediaBlock;