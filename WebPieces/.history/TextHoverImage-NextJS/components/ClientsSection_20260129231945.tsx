'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import CustomEase from 'gsap/dist/CustomEase';
import styles from './ClientsSection.module.css';

export default function ClientsSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLImageElement | HTMLVideoElement>(null);
  const activeWrapperRef = useRef<HTMLDivElement | null>(null);
  const activeMediaRef = useRef<HTMLImageElement | HTMLVideoElement | null>(null);
  const previousWrappersRef = useRef<Array<{ wrapper: HTMLDivElement; media: HTMLImageElement | HTMLVideoElement }>>([]);

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

  const createMediaElement = useCallback((index: number) => {
    const src = assets[index];
    const ext = src.split('.').pop()?.toLowerCase();
    const isVideo = ['mp4', 'webm', 'ogg'].includes(ext || '');

    if (isVideo) {
      const video = document.createElement('video');
      video.src = `/images/${src}`;
      video.autoplay = true;
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      video.preload = 'auto';
      video.className = styles.media;
      return video;
    } else {
      const img = document.createElement('img');
      img.src = `/images/${src}`;
      img.alt = '';
      img.loading = 'lazy';
      img.className = styles.media;
      return img;
    }
  }, []);

  // Handle media animation on activeIndex change
  useEffect(() => {
    if (!previewRef.current) return;

    // Add new media if hovering
    if (activeIndex !== null) {
      // Store current active as previous for fade-out
      if (activeWrapperRef.current && activeMediaRef.current) {
        previousWrappersRef.current.push({
          wrapper: activeWrapperRef.current,
          media: activeMediaRef.current,
        });

        // Start fading out the old media with a delay
        const oldMedia = activeMediaRef.current;
        const oldWrapper = activeWrapperRef.current;

        gsap.killTweensOf(oldMedia);
        gsap.to(oldMedia, {
          opacity: 0,
          duration: 0.1,
          delay: 0.5,
          onComplete: () => {
            oldWrapper.remove();
            // Remove from previous wrappers array
            previousWrappersRef.current = previousWrappersRef.current.filter(
              (item) => item.wrapper !== oldWrapper
            );
          },
        });
      }

      // Create new media
      const newWrapper = document.createElement('div');
      newWrapper.className = styles.clientImgWrapper;

      const newMedia = createMediaElement(activeIndex);
      newWrapper.appendChild(newMedia);
      previewRef.current.appendChild(newWrapper);

      activeWrapperRef.current = newWrapper;
      activeMediaRef.current = newMedia;

      gsap.set(newWrapper, {
        clipPath: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)',
      });
      gsap.set(newMedia, { scale: 1.25, opacity: 0 });

      gsap.to(newWrapper, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        duration: 0.5,
        ease: 'hop',
      });

      gsap.to(newMedia, {
        scale: 1,
        duration: 1.25,
        ease: 'power2.out',
      });

      gsap.to(newMedia, {
        opacity: 1,
        duration: 0.2,
      }, 0);
    } else {
      // No hover: fade out current media immediately
      if (activeMediaRef.current && activeWrapperRef.current) {
        const media = activeMediaRef.current;
        const wrapper = activeWrapperRef.current;

        gsap.killTweensOf(media);
        gsap.to(media, {
          opacity: 0,
          duration: 0.2,
          onComplete: () => {
            wrapper.remove();
          },
        });
      }

      // Also fade out all previous wrappers immediately
      previousWrappersRef.current.forEach((item) => {
        gsap.killTweensOf(item.media);
        gsap.to(item.media, {
          opacity: 0,
          duration: 0.2,
          onComplete: () => {
            item.wrapper.remove();
          },
        });
      });
      previousWrappersRef.current = [];

      activeWrapperRef.current = null;
      activeMediaRef.current = null;
    }
  }, [activeIndex, createMediaElement]);

  const handleClientHover = (index: number) => {
    setActiveIndex(index);
  };

  const handleClientLeave = () => {
    setActiveIndex(null);
  };

  return (
    <section className={styles.clients}>
      <div ref={previewRef} className={styles.clientsPreview} />

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
