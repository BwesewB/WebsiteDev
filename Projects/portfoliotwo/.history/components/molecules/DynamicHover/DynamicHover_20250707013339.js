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

  // This useEffect logic is correct and targets the right elements in the new structure.
  useEffect(() => {
    const container = containerRef.current;
    const child = childRef.current;
    if (!container || !child) return;

    const onMouseEnter = () => {
      gsap.to(child, { scale: scale, duration: 0.5, ease: 'power3.out' });
    };

    const onMouseLeave = () => {
      gsap.killTweensOf(child);
      gsap.to(child, { scale: 1, x: 0, y: 0, duration: 0.5, ease: 'power3.out' });
    };

    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.pageX - (rect.left + window.scrollX)) / rect.width - 0.5;
      const y = (e.pageY - (rect.top + window.scrollY)) / rect.height - 0.5;
      gsap.to(child, { x: x * movementFactor, y: y * movementFactor, duration: 0.8, ease: 'power3.out' });
    };

    container.addEventListener('mouseenter', onMouseEnter);
    container.addEventListener('mouseleave', onMouseLeave);
    container.addEventListener('mousemove', onMouseMove);

    return () => {
      if (container) {
        container.removeEventListener('mouseenter', onMouseEnter);
        container.removeEventListener('mouseleave', onMouseLeave);
        container.removeEventListener('mousemove', onMouseMove);
      }
      gsap.killTweensOf(child);
    };
  }, [scale, movementFactor]);

  // --- NEW RENDER LOGIC ---
  // The component ALWAYS returns this structure. The link is an optional overlay within it.
  return (
    <div
      // The containerRef is on this stable, outermost div.
      // This div defines the boundaries for all events.
      ref={containerRef}
      className={`${styles.dynamicHoverContainer} ${className}`}
    >
      <div
        // The childRef is on the div that holds the content.
        // This is the only element that GSAP will transform.
        ref={childRef}
        className={styles.dynamicHoverChild}
      >
        {children}
      </div>

      {/* If a link is provided, render the invisible link overlay. */}
      {link && (
        <Link 
          href={link} 
          className={styles.linkOverlay}
          // Add a title for accessibility/SEO
          title={typeof children.props?.alt === 'string' ? children.props.alt : 'Navigate'}
        />
      )}
    </div>
  );
};

export default DynamicHover;