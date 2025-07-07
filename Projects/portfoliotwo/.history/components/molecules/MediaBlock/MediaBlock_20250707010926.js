'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from './MediaBlock.module.css';

// You can create SVG icon components for a better look
const MuteIcon = () => <svg>...</svg>;
const UnmuteIcon = () => <svg>...</svg>;

const MediaBlock = ({
  imageSrc,
  videoSrc,
  initialMute = true,
  sectionHeading,
  mediaWidth = '100%',
}) => {
  const isVideo = !!videoSrc; // A boolean to easily check if we're rendering a video

  // Refs for the video element and its container
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  // State to manage the video's mute status
  const [isMuted, setIsMuted] = useState(initialMute);

  // Effect for viewport detection to play/pause the video
  useEffect(() => {
    // Only run this effect if it's a video
    if (!isVideo || !containerRef.current) return;

    const videoElement = videoRef.current;
    if (!videoElement) return;

    // The Intersection Observer will call this function when the element's visibility changes
    const observerCallback = (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        // Play the video when it enters the viewport
        videoElement.play().catch(error => {
          // Autoplay was prevented by the browser. This is a common policy.
          // The video will only play if muted or after user interaction.
          console.warn("Video autoplay was prevented. Ensure video is muted.", error);
        });
      } else {
        // Pause the video when it leaves the viewport
        videoElement.pause();
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      // Trigger when 50% of the element is visible
      threshold: 0.5,
    });

    observer.observe(containerRef.current);

    // Cleanup: Disconnect the observer when the component unmounts
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [isVideo]); // Dependency array ensures this runs only once for a video

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
        // Using Next.js Image for optimization (lazy loading, resizing, etc.)
        <Image
          src={imageSrc}
          alt={sectionHeading || 'Portfolio media showcase'}
          layout="fill"
          objectFit="cover"
          className={styles.media}
          priority // Consider adding `priority` if the image is above the fold
        />
      )}

      {/* Overlays */}
      <div className={styles.overlay}>
        {sectionHeading && (
          <h3 className={styles.heading}>{sectionHeading}</h3>
        )}

        {isVideo && (
          <button onClick={toggleMute} className={styles.muteButton} aria-label={isMuted ? "Unmute video" : "Mute video"}>
            {/* Replace with actual icons for a better UI */}
            {isMuted ? 'UNMUTE' : 'MUTE'}
          </button>
        )}
      </div>
    </div>
  );
};

export default MediaBlock;