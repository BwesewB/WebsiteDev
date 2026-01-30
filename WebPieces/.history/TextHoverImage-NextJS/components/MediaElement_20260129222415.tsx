'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import CustomEase from 'gsap/dist/CustomEase';
import styles from './MediaElement.module.css';

interface MediaElementProps {
  src: string;
  isVisible: boolean;
}

export default function MediaElement({ src, isVisible }: MediaElementProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLImageElement | HTMLVideoElement>(null);

  useEffect(() => {
    gsap.registerPlugin(CustomEase);
    CustomEase.create(
      "hop",
      "M0,0 C0.071,0.505 0.192,0.726 0.318,0.852 0.45,0.984 0.504,1 1,1 "
    );
  }, []);

  useEffect(() => {
    if (!containerRef.current || !mediaRef.current) return;

    if (isVisible) {
      gsap.set(containerRef.current, {
        clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
      });
      gsap.set(mediaRef.current, { scale: 1.25 });

      gsap.to(containerRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 0.5,
        ease: "hop",
      });

      gsap.to(mediaRef.current, {
        scale: 1,
        duration: 1.25,
        ease: "power2.out",
      });
    }
  }, [isVisible, src]);

  const ext = src.split('.').pop()?.toLowerCase();
  const isVideo = ['mp4', 'webm', 'ogg'].includes(ext || '');

  return (
    <div
      ref={containerRef}
      className={styles.clientImgWrapper}
    >
      {isVideo ? (
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
      )}
    </div>
  );
}
