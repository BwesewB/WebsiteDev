// components/InkBleedFilter.js

import styles from './InkBleedEffect.module.css';
const InkBleedFilter = () => {
  return (
    <svg style={{ display: 'none' }} width="0" height="0" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter className={styles.bleedText}>
          {/* 
            feTurbulence creates the noise.
            - baseFrequency is the key to the animation. Lower values = bigger, blurrier noise.
            - numOctaves adds detail to the noise.
            - We give it a result name 'turbulence' to reference it later.
          */}
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.04 0.01" // Start with a fine grain
            numOctaves="2"
            result="turbulence"
            data-testid="turbulence" // For easier selection with GSAP
          />

          {/* 
            feDisplacementMap uses the 'turbulence' noise to distort the source graphic (our text).
            - scale is the amount of displacement. Animating this makes the bleed grow.
          */}
          <feDisplacementMap
            in="SourceGraphic"
            in2="turbulence"
            scale="0" // Start with no displacement
            xChannelSelector="R"
            yChannelSelector="G"
            result="displacement"
          />

          {/* Optional: A little blur to soften the edges */}
          <feGaussianBlur in="displacement" stdDeviation="0.5" />
        </filter>
      </defs>
    </svg>
  );
};

export default InkBleedFilter;