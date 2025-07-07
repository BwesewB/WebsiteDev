// components/molecules/DynamicHover.js

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import styles from './DynamicHover.module.css';
import Link from 'next/link';

// NOTE: We are adding onMouseEnter and onMouseLeave as props to be called.
const DynamicHover = ({ 
  children, 
  className = '', 
  movementFactor = 20,
  link,
  onMouseEnter, // <-- NEW PROP
  onMouseLeave, // <-- NEW PROP
}) => {
  const containerRef = useRef(null);
  const childRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const child = childRef.current;
    if (!container || !child) return;

    // --- UPDATED Event Handlers ---
    const handleMouseEnter = (e) => {
      // We no longer scale here. We just call the parent's function.
      if (onMouseEnter) {
        onMouseEnter(e);
      }
    };

    const handleMouseLeave = (e) => {
      // Reset the mouse-follow effect
      gsap.to(child, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'power3.out',
      });
      // Call the parent's function
      if (onMouseLeave) {
        onMouseLeave(e);
      }
    };

    const handleMouseMove = (e) => {
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

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('mousemove', handleMouseMove);

    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('mousemove', handleMouseMove);
      gsap.killTweensOf(child);
    };
  }, [movementFactor, onMouseEnter, onMouseLeave]); // Add callbacks to dependency array

  // The rendering logic is almost the same, just no internal scale.
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
    return <Link href={link} passHref><a>{HoverableContent}</a></Link>;
  }
  return HoverableContent;
};

export default DynamicHover;