'use client';

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import CustomEase from 'gsap/dist/CustomEase';
import styles from './ClientsSection.module.css';

export default function ClientsSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLImageElement | HTMLVideoElement>(null);

  const assets = [
    'Clip1.mp4',
    'citadelVideo.mp4',
    'fishCanVideo.mp4',
    'ChalkAnimation.mp4',
    'Oblik.png',
    'Toilet1.webp',
    'Render6.png',
    'AvoidTaxesClip.mp4',
  ];

  const clientNames = [
    'Black Hole,',
    'Citadel,',
    'Decked,',
    'Offcut,',
    'PIKIO Labs,',
    'Reimagining Spaces,',
    'Igara,',
    'Taxes',
  ];

  // Initialize GSAP custom ease
  useEffect(() => {
    gsap.registerPlugin(CustomEase);
    CustomEase.create(
      'hop',
      'M0,0 C0.071,0.505 0.192,0.726 0.318,0.852 0.45,0.984 0.504,1 1,1 '
    );
  }, []);

  // Handle media animation on activeIndex change
  useEffect(() => {
    if (!containerRef.current || !mediaRef.current) return;

    if (activeIndex !== null) {
      gsap.set(containerRef.current, {
        clipPath: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)',
      });
      gsap.set(mediaRef.current, { scale: 1.25, opacity: 0 });

      gsap.to(containerRef.current, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        duration: 0.5,
        ease: 'hop',
      });

      gsap.to(mediaRef.current, {
        scale: 1,
        opacity: 1,
        duration: 1.25,
        ease: 'power2.out',
      });
    } else if (mediaRef.current) {
      // Fade out when leaving
      gsap.killTweensOf(mediaRef.current);
      gsap.to(mediaRef.current, {
        opacity: 0,
        duration: 0.2,
      });
    }
  }, [activeIndex]);

  const handleClientHover = (index: number) => {
    setActiveIndex(index);
  };

  const handleClientLeave = () => {
    setActiveIndex(null);
  };

  const getMediaElement = () => {
    if (activeIndex === null) return null;

    const src = assets[activeIndex];
    const ext = src.split('.').pop()?.toLowerCase();
    const isVideo = ['mp4', 'webm', 'ogg'].includes(ext || '');

    return isVideo ? (
      <video
        ref={mediaRef as React.RefObject<HTMLVideoElement>}
        src={`/images/${src}`}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className={styles.media}
      />
    ) : (
      <img
        ref={mediaRef as React.RefObject<HTMLImageElement>}
        src={`/images/${src}`}
        alt=""
        loading="lazy"
        className={styles.media}
      />
    );
  };

  return (
    <section className={styles.clients}>
      <div ref={previewRef} className={styles.clientsPreview}>
        {activeIndex !== null && (
          <div ref={containerRef} className={styles.clientImgWrapper}>
            {getMediaElement()}
          </div>
        )}
      </div>

      <div className={styles.clientsHeader}>
        <p className={styles.clientsHeaderText}>WORKS</p>
      </div>

      <div className={styles.clientsList}>
        {clientNames.map((name, index) => (
          <div
            key={index}
            className={styles.clientName}
            onMouseEnter={() => handleClientHover(index)}
            onMouseLeave={handleClientLeave}
          >
            <h3>{name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
