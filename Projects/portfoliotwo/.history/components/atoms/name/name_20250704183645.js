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
      // --- Part 1: Make StickyContainer work ---
      // We must set its endTrigger ref. This makes it sticky.
      endTriggerForSticky.current = nameOuterRef.current;
      
      // --- Part 2: Set up the "play once" animation ---
      const animationContext = gsap.context(() => {
        const h1 = h1Ref.current;
        if (!h1) return;

        // The element that will be pinned by StickyContainer
        const pinnedElement = h1.parentElement; 

        const lettersToHide = gsap.utils.toArray('.letter-hide', h1);
        const lettersToMove = gsap.utils.toArray('.letter-move', h1);

        if (lettersToHide.length === 0) return;

        // --- Create a timeline, but keep it PAUSED initially ---
        const tl = gsap.timeline({ paused: true });

        // Define the animation steps (what it should animate TO)
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
            xPercent: -65, // Adjust this value if spacing is off
            duration: 0.6,
            ease: "power2.inOut"
          }, 0);

        // --- Create the ScrollTrigger to control the timeline ---
        ScrollTrigger.create({
          // The trigger is the pinned element itself!
          trigger: pinnedElement,
          
          // Animate when the top of the pinned element hits the top of the viewport
          start: "top top", 
          
          // No "end" needed for this type of trigger
          
          // This is the magic for a "play once" animation
          // onEnter: play forward
          // onLeave: do nothing
          // onEnterBack: play in reverse
          // onLeaveBack: do nothing
          toggleActions: "play none reverse none",
          
          // We link it to our timeline by calling .play() and .reverse()
          onEnter: () => tl.play(),
          onEnterBack: () => tl.reverse(),
          
          // markers: true, // Crucial for debugging the trigger point!
        });

      }, nameOuterRef);

      return () => animationContext.revert();
    }
  }, [isHomePage]); // Dependency array is correct

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