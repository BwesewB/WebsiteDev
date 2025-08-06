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
  borderRadiusChild,
  videoPosterSrc,
  mediaHeight = "100%",
  initialMute = true,
  sectionHeading,
  scale = 1,
  enableRevealAnimation = true,
  enableParallax = false, 
  useObjectFitCover = true, 
}) => {

  const isVideo = !!videoSrc; 
  const containerRef = useRef(null);
  const mediaWrapperRef = useRef(null); 
  const mediaRef = useRef(null); 
  const [isMuted, setIsMuted] = useState(initialMute);
  const objectFitValue = useObjectFitCover ? 'cover' : 'initial';

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
      gsap.fromTo(media,
        {
          // Make the media 20% taller than its container
          scale: 1.2,
          // Start it centered vertically
          yPercent: -10,
        },
        {
          // End with it still centered vertically after moving
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            // markers: true,
          }
        }
      );
    }
  }, { scope: containerRef, dependencies: [enableRevealAnimation, enableParallax, imageSrc, videoSrc] });

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

  const mediaStyle = {
    objectFit: objectFitValue,
  };
  
  // --- Error Handling ---
  if (!videoSrc && !imageSrc) {
    return (
      <div className={styles.errorContainer} style={{ width: "100%" }}>
        <p>Error: No image or video source provided.</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={styles.container}
      style={{ height: mediaHeight, width: `${scale * 100}%`, borderRadius: borderRadiusChild}}
    >
      <div ref={mediaWrapperRef} style={{ width: '100%', height: mediaHeight, position: 'relative' }} >
        {isVideo ? (
          <video
            ref={mediaRef}
            src={videoSrc}
            className={styles.media}
            poster={videoPosterSrc}
            style={mediaStyle}
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
              // layout="fill"
              // style={mediaStyle}
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
              className={styles.media}
              // priority
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