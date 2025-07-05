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
        
        // --- THE "PLAY FORWARD" ANIMATION ---
        const playForward = () => {
          gsap.timeline()
            .to(h1, { fontSize: "1rem", duration: 0.5, ease: "power2.inOut" }, 0)
            .to(lettersToHide, {
                opacity: 0,
                duration: 0.3,
                stagger: 0.02,
                ease: "power2.out",
                // After fading out, set width to 0 to collapse the space.
                onComplete: () => gsap.set(lettersToHide, { width: 0, padding: 0, margin: 0 })
            }, 0);
        };

        // --- THE "PLAY BACKWARD" (RESTORE) ANIMATION ---
        const playBackward = () => {
          gsap.timeline()
            .to(h1, { fontSize: "4rem", duration: 0.5, ease: "power2.inOut" }, 0)
            // STEP 1: Immediately restore the width. This makes space.
            .set(lettersToHide, { width: 'auto', padding: '', margin: '' })
            // STEP 2: Now that there's space, fade the letters back in.
            .to(lettersToHide, {
                opacity: 1,
                duration: 0.3,
                stagger: {
                    each: 0.02,
                    from: "end" // Stagger in from the right for a nice effect
                },
                ease: "power2.in"
            }, ">-0.2"); // Overlap slightly with the font-size animation
        };

        // --- THE SCROLLTRIGGER CONTROLLER ---
        ScrollTrigger.create({
          trigger: pinnedElement,
          start: "top top",
          end: "top top-=15px", // A small buffer zone
          
          onEnter: () => playForward(),
          onLeaveBack: () => playBackward(),

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