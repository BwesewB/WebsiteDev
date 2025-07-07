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

  // We use useEffect to add our event listeners and clean them up
  useEffect(() => {
    const container = containerRef.current;
    const child = childRef.current;

    if (!container || !child) return;

    // --- Animation Logic ---

    // 1. Hover On: Scale up the child
    const onMouseEnter = () => {
      gsap.to(child, {
        scale: scale,
        duration: 0.5,
        ease: 'power3.out',
      });
    };

    // 2. Hover Off: Revert child to original state
    const onMouseLeave = () => {
      // KILL any active tweens on the child (especially the x/y from mousemove)
      gsap.killTweensOf(child); 

      // Now, start the animation to return to the resting state.
      gsap.to(child, {
        scale: 1,
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'power3.out',
      });
    };

    // 3. Cursor Move: Move the child slightly towards the cursor
    const onMouseMove = (e) => {
      // Get the bounding box of the container. This is still needed for width/height.
      const rect = container.getBoundingClientRect();

      // --- THIS IS THE CORRECTED CALCULATION ---
      // We use coordinates relative to the page/document, not the viewport.
      const x = (e.pageX - (rect.left + window.scrollX)) / rect.width - 0.5;
      const y = (e.pageY - (rect.top + window.scrollY)) / rect.height - 0.5;

      // Move the child element. The movementFactor determines how much it moves.
      gsap.to(child, {
        x: x * movementFactor,
        y: y * movementFactor,
        duration: 0.8, // A slightly longer duration makes the "follow" feel smoother
        ease: 'power3.out',
      });
    };

    // --- Event Listener Setup ---
    // No scroll listener needed anymore!
    container.addEventListener('mouseenter', onMouseEnter);
    container.addEventListener('mouseleave', onMouseLeave);
    container.addEventListener('mousemove', onMouseMove);

    // --- Cleanup ---
    return () => {
      container.removeEventListener('mouseenter', onMouseEnter);
      container.removeEventListener('mouseleave', onMouseLeave);
      container.removeEventListener('mousemove', onMouseMove);
      gsap.killTweensOf(child);
    };
  }, [scale, movementFactor]); // Rerun effect if these props change

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