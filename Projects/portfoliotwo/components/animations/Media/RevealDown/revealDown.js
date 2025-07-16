'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const RevealDown = ({ children, start = "top 90%", duration = 1.4, scale = false }) => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    // Use a selector to find the direct child to apply the scale animation to, if enabled.
    // This is safer than assuming there's only one child.
    const elementToScale = scale ? container.firstChild : null;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: start,
        toggleActions: "play none none none",
        // Only show markers in development for cleaner production code
        markers: process.env.NODE_ENV === "development",
      }
    });

    // Animate the container (the wrapper)
    tl.from(container, {
      clipPath: "inset(0% 0% 100% 0%)",
      ease: "power3.out",
      duration: duration,
    });

    // If scale is enabled, animate the child element
    if (elementToScale) {
      tl.from(elementToScale, {
        scale: 1.5,
        ease: "power3.out",
        duration: duration,
      }, "<"); // "<" starts this animation at the same time as the previous one
    }

  }, { scope: containerRef, dependencies: [scale] }); // Re-run if `scale` prop changes

  return (
    // We apply a style here to make the clip-path work correctly.
    // GSAP will animate this from inset(100%) to inset(0).
    <div ref={containerRef} style={{ clipPath: 'inset(0% 0% 100% 0%)' }}>
      {children}
    </div>
  );
};

export default RevealDown;