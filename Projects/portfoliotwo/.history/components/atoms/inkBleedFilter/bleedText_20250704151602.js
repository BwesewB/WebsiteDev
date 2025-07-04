// components/BleedText.js
'use client'; // This component uses event handlers

import { useRef } from 'react';
import { gsap } from 'gsap';

// A reusable component for text with the bleed effect
const BleedText = ({ children, as: Component = 'span' }) => {
  const componentRef = useRef(null);

  // We target the filter elements directly. GSAP can animate any attribute.
  const turbulence = useRef(null);
  const displacement = useRef(null);

  const handleMouseEnter = () => {
    // Find the filter elements for the first time if we haven't already
    if (!turbulence.current) {
      turbulence.current = document.querySelector('#ink-bleed-filter feTurbulence');
      displacement.current = document.querySelector('#ink-bleed-filter feDisplacementMap');
    }

    // Animate the filter attributes with GSAP
    gsap.to(turbulence.current, {
      duration: 0.8,
      attr: { baseFrequency: '0.005 0.001' }, // Lower frequency = larger, blotchier shapes
      ease: 'power2.out',
    });
    gsap.to(displacement.current, {
      duration: 0.8,
      attr: { scale: 20 }, // Increase the displacement scale
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    // Animate back to the initial state
    gsap.to(turbulence.current, {
      duration: 0.8,
      attr: { baseFrequency: '0.04 0.01' }, // Back to fine grain
      ease: 'power2.inOut',
    });
    gsap.to(displacement.current, {
      duration: 0.8,
      attr: { scale: 0 }, // Back to no displacement
      ease: 'power2.inOut',
    });
  };

  return (
    <Component
      ref={componentRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="bleed-text"
    >
      {children}
    </Component>
  );
};

export default BleedText;