// components/molecules/DynamicHover.js

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import styles from './DynamicHover.module.css';
import Link from 'next/link';

const DynamicHover = ({ 
  children, 
  className = '', 
  scale = 1.05, 
  movementFactor = 20,
  link,
}) => {
  const containerRef = useRef(null);
  const childRef = useRef(null);

  useEffect(() => {
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
  }, [scale, movementFactor]);

  const HoverableContent = (
      <div ref={childRef} className={styles.dynamicHoverChild}>
        {children}
      </div>
  );

  if (link) {
    return (
      <Link href={link} passHref ref={containerRef} 
      className={`${styles.dynamicHoverContainer} ${className}`}>
        {HoverableContent}
      </Link>
    );
  }
  return HoverableContent;
};

export default DynamicHover;