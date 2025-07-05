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
        const lettersToMove = gsap.utils.toArray('.letter-move', h1);

        if (lettersToHide.length === 0) return;

        // 1. DYNAMICALLY CALCULATE THE GAP WIDTH
        let gapWidth = 0;
        const letterBoxes = lettersToHide.map(el => el.getBoundingClientRect());
        letterBoxes.forEach(box => gapWidth += box.width);
        
        const tl = gsap.timeline({ paused: true });

        tl
          .to(h1, { fontSize: "1rem", duration: 0.6, ease: "power2.inOut" }, 0)
          .to(lettersToHide, {
            yPercent: 100,
            opacity: 0,
            duration: 0.3,
            stagger: 0.02,
            ease: "power2.in"
          }, 0)
          .to(lettersToMove, {
            x: -gapWidth, // Use the precise pixel value
            duration: 0.6,
            ease: "power2.inOut"
          }, 0);

        // 2. USE MORE ROBUST SCROLLTRIGGER SETTINGS
        ScrollTrigger.create({
          trigger: pinnedElement,
          start: "top top",
          end: "top top-=10", // Create a 10px active zone
          toggleActions: "play none reverse reset", // "reset" is our failsafe
          animation: tl,
          // markers: true,
        });

      }, nameOuterRef);

      return () => animationContext.revert();
    }
  }, [isHomePage]);

  // --- JSX (No changes needed here) ---
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