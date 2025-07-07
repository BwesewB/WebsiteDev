// components/molecules/DynamicHover.js

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import styles from './DynamicHover.module.css';

const DynamicHover = ({ 
  children, 
  className = '', 
  scale = 1.15, 
  movementFactor = 20,
  onClick,
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
      // Get the bounding box of the container
      const { left, top, width, height } = container.getBoundingClientRect();

      // Calculate the mouse position relative to the container center
      // A value from -0.5 to 0.5
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;

      // Move the child element. The movementFactor determines how much it moves.
      gsap.to(child, {
        x: x * movementFactor,
        y: y * movementFactor,
        duration: 0.8, // A slightly longer duration makes the "follow" feel smoother
        ease: 'power3.out',
      });
    };

    // --- Event Listener Setup ---
    container.addEventListener('mouseenter', onMouseEnter);
    container.addEventListener('mouseleave', onMouseLeave);
    container.addEventListener('mousemove', onMouseMove);

    // --- Cleanup ---
    // This is crucial for performance and to prevent memory leaks
    return () => {
      container.removeEventListener('mouseenter', onMouseEnter);
      container.removeEventListener('mouseleave', onMouseLeave);
      container.removeEventListener('mousemove', onMouseMove);
    };
  }, [scale, movementFactor]); // Rerun effect if these props change

  const containerProps = {
    ref: containerRef,
    className: `${styles.dynamicHoverContainer} ${className}`,
    onClick: onClick,
  };

  if (onClick) {
    containerProps.role = 'button';
    containerProps.tabIndex = 0; // Makes it focusable
    containerProps.onKeyDown = (e) => {
      // Trigger onClick on 'Enter' or 'Space' key press for accessibility
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault(); // Prevent page scroll on spacebar
        onClick(e);
      }
    };
  }

  return (
    <div {...containerProps}>
      <div ref={childRef} className={styles.dynamicHoverChild}>
        {children}
      </div>
    </div>
  );
};

export default DynamicHover;