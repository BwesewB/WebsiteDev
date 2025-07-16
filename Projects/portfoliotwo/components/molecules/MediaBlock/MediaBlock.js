'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from './MediaBlock.module.css';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MuteIcon = () => <svg>...</svg>;
const UnmuteIcon = () => <svg>...</svg>;

const MediaBlock = ({
  imageSrc,
  videoSrc,
  initialMute = true,
  sectionHeading,
  mediaWidth = '100%',
  enableRevealAnimation = true,
  enableParallax = false, 
}) => {

  const isVideo = !!videoSrc; 
  const containerRef = useRef(null);
  const mediaWrapperRef = useRef(null); 
  const mediaRef = useRef(null); 
  const [isMuted, setIsMuted] = useState(initialMute);

  useGSAP(() => {
      const container = containerRef.current;
      const mediaWrapper = mediaWrapperRef.current;
      const media = mediaRef.current;

      if (!container || !mediaWrapper || !media) return;

      // --- REVEAL ANIMATION (UNCHANGED) ---
      if (enableRevealAnimation) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top 90%",
            toggleActions: "play none none none",
          }
        });
        tl.fromTo(container,
          { clipPath: "inset(0% 0% 100% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", ease: "power3.out", duration: 2 }
        ).fromTo(media, // Note: this still targets the media element itself for the scale effect
          { scale: 1.5 },
          { scale: 1, ease: "power3.out", duration: 1.4 },
          "<"
        );
      }

      // --- PARALLAX ANIMATION (NEW) ---
      if (enableParallax) {
      const setupParallax = () => {
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;

        // --- THIS IS THE NEW LOGIC ---
        let mediaHeight;

        if (media.tagName === 'IMG') {
          // For images, calculate the aspect-ratio-correct height
          const { naturalWidth, naturalHeight } = media;
          const aspectRatio = naturalHeight / naturalWidth;
          mediaHeight = containerWidth * aspectRatio;
        } else {
          // For videos, offsetHeight is usually reliable once metadata loads
          mediaHeight = media.offsetHeight;
        }

        // Now we compare the calculated/measured height with the container
        if (mediaHeight <= containerHeight) {
          console.log('Parallax skipped: Media is not taller than the container.');
          return;
        }
        
        console.log('Setting up parallax...');

        const distanceToMove = mediaHeight - containerHeight;
        
        gsap.set(mediaWrapper, { height: mediaHeight });

        gsap.fromTo(mediaWrapper, 
          { y: 0 }, 
          {
            y: -distanceToMove,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
              markers: true, // Keep markers on for debugging
            }
          }
        );
      };

      // The rest of the logic to wait for load is correct
      if (media.tagName === 'IMG') {
        if (media.complete) setupParallax();
        else media.addEventListener('load', setupParallax, { once: true });
      } else if (media.tagName === 'VIDEO') {
        if (media.readyState > 0) setupParallax();
        else media.addEventListener('loadedmetadata', setupParallax, { once: true });
      }
    }
  }, { dependencies: [enableRevealAnimation, enableParallax, imageSrc, videoSrc] });

  useEffect(() => {
    const videoElement = mediaRef.current;
    if (!isVideo || !videoElement) return;
    
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

    observer.observe(videoElement);

    return () => { observer.unobserve(videoElement) };
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
      style={{ width: mediaWidth, overflow: enableParallax ? 'hidden' : 'visible' }}
    >
      <div ref={mediaWrapperRef} style={{ width: '100%', height: '100%', position: 'relative' }} >
        {isVideo ? (
          <video
            ref={mediaRef}
            src={videoSrc}
            className={styles.media}
            loop
            muted={isMuted}
            playsInline // VERY IMPORTANT for preventing fullscreen on mobile
            autoPlay // Hint for browsers, but Intersection Observer is the real controller
          />
        ) : (
            <Image
              ref={mediaRef}
              src={imageSrc}
              alt={sectionHeading || 'Portfolio media showcase'}
              layout="fill"
              objectFit="cover"
              className={styles.media}
              priority // Consider adding `priority` if the image is above the fold
            />
        )}
      </div>
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