'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface MediaElementProps {
  src: string;
  isVisible: boolean;
}

export default function MediaElement({ src, isVisible }: MediaElementProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLImageElement | HTMLVideoElement>(null);

  useEffect(() => {
    if (!containerRef.current || !mediaRef.current) return;

    if (isVisible) {
      gsap.to(containerRef.current, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        duration: 0.5,
        ease: 'power2.inOut',
      });

      gsap.to(mediaRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'power2.out',
      });
    } else {
      gsap.to(mediaRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
      });
    }
  }, [isVisible]);

  const ext = src.split('.').pop()?.toLowerCase();
  const isVideo = ['mp4', 'webm', 'ogg'].includes(ext || '');

  return (
    <div
      ref={containerRef}
      className="client-img-wrapper"
      style={{
        clipPath: 'polygon(50% 50%, 50%, 50%, 50% 50%, 50% 50%)',
      }}
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
          style={{ opacity: 0, transform: 'scale(1.25)' }}
        />
      ) : (
        <img
          ref={mediaRef as React.RefObject<HTMLImageElement>}
          src={`/images/${src}`}
          alt=""
          loading="lazy"
          style={{ opacity: 0, transform: 'scale(1.25)' }}
        />
      )}
    </div>
  );
}
