// components/molecules/DynamicHover.js

import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './DynamicHover.module.css';
import Link from 'next/link';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DynamicHover = ({ 
  children, 
  className = '', 
  scale = 1.05, 
  movementFactor = 20,
  link,
  startingScale = 1.5,

}) => {
  const containerRef = useRef(null);
  const childRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useGSAP(() => {
    const childElement = childRef.current;
    const containerElement = containerRef.current;

    gsap.fromTo(childElement,
      {
        opacity:0,
        scale: startingScale,
        clipPath: "inset(0% 0% 100% 0%)",
      },
      {
        opacity:1,
        scale: 1,
        clipPath: "inset(0% 0% 0% 0%)",
        ease: "power3.out",
        duration: 1.4,
        scrollTrigger: {
          trigger: containerElement,
          start: "top 85%",
          toggleActions: "play none none none",
          // markers: true,
        },
        onComplete: () => {
          setIsRevealed(true);
        },
      }
    );

  }, { scope: containerRef });

  useEffect(() => {

    if (!isRevealed) return;

    const container = containerRef.current;
    const child = childRef.current;

    if (!container || !child) return;

    const onMouseEnter = () => {
      gsap.to(child, {
        scale: scale,
        duration: 0.5,
        ease: 'power3.out',
      });
    };

    const onMouseLeave = () => {
      gsap.killTweensOf(child); 
      gsap.to(child, {
        scale: 1,
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'power3.out',
      });
    };

    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.pageX - (rect.left + window.scrollX)) / rect.width - 0.5;
      const y = (e.pageY - (rect.top + window.scrollY)) / rect.height - 0.5;
      gsap.to(child, {
        x: x * movementFactor,
        y: y * movementFactor,
        duration: 0.8,
        ease: 'power3.out',
      });
    };
    container.addEventListener('mouseenter', onMouseEnter);
    container.addEventListener('mouseleave', onMouseLeave);
    container.addEventListener('mousemove', onMouseMove);

    return () => {
      container.removeEventListener('mouseenter', onMouseEnter);
      container.removeEventListener('mouseleave', onMouseLeave);
      container.removeEventListener('mousemove', onMouseMove);
      gsap.killTweensOf(child);
    };
  }, [isRevealed, scale, movementFactor]);

  const HoverableContent = (
    <div ref={childRef} className={styles.dynamicHoverChild}>
      {children}
    </div>
  );

  if (link) {
    // If a link exists, wrap the content in a Next.js Link
    // and apply the container ref and styles to it.
    return (
      <Link 
        href={link} 
        passHref 
        ref={containerRef} 
        className={`${styles.dynamicHoverContainer} ${className}`}
      >
        {HoverableContent}
      </Link>
    );
  }
  
  // If NO link exists, wrap the content in a standard <div>
  // and apply the exact same container ref and styles.
  return (
    <div 
      ref={containerRef} 
      className={`${styles.dynamicHoverContainer} ${className}`}
    >
      {HoverableContent}
    </div>
  );
};

export default DynamicHover;