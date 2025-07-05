// components/atoms/name/Name.js
"use client";

import { useRef, useLayoutEffect } from "react";
import Link from "next/link";
import StickyContainer from "../stickyContainer/page";
import styles from "./name.module.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Name({ isHomePage, homePageHeight }) {
  const nameOuterRef = useRef(null);
  const h1Ref = useRef(null);
  
  // This ref is ESSENTIAL for StickyContainer to work. We must keep it.
  const endTriggerForSticky = useRef(null);

  useLayoutEffect(() => {
    if (isHomePage) {
      endTriggerForSticky.current = nameOuterRef.current;
      
      const animationContext = gsap.context(() => {
        const h1 = h1Ref.current;
        if (!h1) return;

        const pinnedElement = h1.parentElement;
        const lettersToHide = gsap.utils.toArray('.letter-hide', h1);
        if (lettersToHide.length === 0) return;
        
        // --- THE .fromTo() TIMELINE ---
        // This gives us explicit control over the start and end states.
        const tl = gsap.timeline({ paused: true });

        // Set the initial state of the letters that will hide.
        // We ensure they start visible and with their natural layout.
        gsap.set(lettersToHide, {
            display: 'inline-block',
            opacity: 1,
            width: 'auto',
            minWidth: 'auto',
            margin: 'auto',
            padding: 'auto',
        });
        
        // Animate the font size
        tl.to(h1, { 
            fontSize: "1rem", 
            duration: 0.6, 
            ease: "power2.inOut" 
        });

        // Use .fromTo() for the letters that hide.
        // We are animating FROM their natural state TO a collapsed state.
        tl.fromTo(lettersToHide, 
            { // FROM state (redundant but explicit)
                opacity: 1,
                // No need to define width here, let CSS handle it.
            },
            { // TO state (the collapsed state)
                opacity: 0,
                width: 0,
                minWidth: 0,
                padding: 0,
                margin: 0,
                duration: 0.4,
                stagger: 0.02,
                ease: "power2.in"
            }, 
        "<"); // Position parameter: start at the same time as the font-size change.
        

        // The ScrollTrigger is correct and controls the whole timeline.
        ScrollTrigger.create({
          trigger: pinnedElement,
          start: "top top",
          end: "top top-=15px",
          onEnter: () => tl.play(),
          onLeaveBack: () => tl.reverse(),
          // markers: true,
        });

      }, nameOuterRef);

      return () => animationContext.revert();
    }
  }, [isHomePage]);

  const nameContent = (
    <div className={styles.nameContainer}>
      <Link href="/">
        <h1 ref={h1Ref}>
          <span className="letter-keep">S</span><span className="letter-keep">e</span><span className="letter-keep">b</span>
          <span className="letter-hide">a</span><span className="letter-hide">s</span><span className="letter-hide">t</span><span className="letter-hide">i</span><span className="letter-hide">a</span><span className="letter-hide">n</span><span className="letter-hide"> </span>
          <span className="letter-move">f</span><span className="letter-move">o</span><span className="letter-move">k</span>
        </h1>
      </Link>
    </div>
  );

  if (isHomePage) {
    return (
      <div
        ref={nameOuterRef}
        className={styles.nameOuterHome}
        style={{ height: homePageHeight > 0 ? `${homePageHeight}px` : "100vh" }}
      >
        <StickyContainer endTriggerRef={endTriggerForSticky}>
          {nameContent}
        </StickyContainer>
      </div>
    );
  } else {
    // ... return for other pages
    return (
      <div className={styles.nameOuterOther}>
        <div className={styles.nameContainer}>
          <Link href="/">
            <h1 style={{ fontSize: '1rem' }}>Sebfok</h1>
          </Link>
        </div>
      </div>
    );
  }
}