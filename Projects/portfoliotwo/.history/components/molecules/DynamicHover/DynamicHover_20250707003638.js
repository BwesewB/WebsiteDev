// components/molecules/DynamicHover.js

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import styles from './DynamicHover.module.css';
import Link from 'next/link';

const DynamicHover = ({ 
  children, 
  className = '', 
  scale = 1.15, 
  movementFactor = 20,
  link,
}) => {
  const containerRef = useRef(null);
  const childRef = useRef(null);
  const isScrolling = useRef(false);
  const scrollTimeout = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const child = childRef.current;
    if (!container || !child) return;

    const handleScroll = () => {
      isScrolling.current = true;
      clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        isScrolling.current = false;
      }, 150);
    };

    const onMouseEnter = () => {
      gsap.to(child, { scale: scale, duration: 0.5, ease: 'power3.out' });
    };

    const onMouseLeave = () => {
      gsap.killTweensOf(child);
      gsap.to(child, { scale: 1, x: 0, y: 0, duration: 0.5, ease: 'power3.out' });
    };

    const onMouseMove = (e) => {
      if (isScrolling.current) return;
      const { left, top, width, height } = container.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      gsap.to(child, { x: x * movementFactor, y: y * movementFactor, duration: 0.8, ease: 'power3.out' });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    container.addEventListener('mouseenter', onMouseEnter);
    container.addEventListener('mouseleave', onMouseLeave);
    container.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      container.removeEventListener('mouseenter', onMouseEnter);
      container.removeEventListener('mouseleave', onMouseLeave);
      container.removeEventListener('mousemove', onMouseMove);
      gsap.killTweensOf(child);
      clearTimeout(scrollTimeout.current);
    };
  }, [scale, movementFactor]);

  const HoverableContent = (
    <div 
      ref={containerRef} 
      className={`${styles.dynamicHoverContainer} ${className}`}
    >
      <div ref={childRef} className={styles.dynamicHoverChild}>
        {children}
      </div>
    </div>
  );

  if (link) {
    return (
      <Link href={link} passHref>
        <a>{HoverableContent}</a>
      </Link>
    );
  }
  return HoverableContent;
};

export default DynamicHover;