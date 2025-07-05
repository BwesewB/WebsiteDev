// components/atoms/name/Name.js
"use client";

import { useRef, useLayoutEffect } from "react";
import Link from "next/link";
import StickyContainer from "../stickyContainer/page";
import styles from "./name.module.css";
import { gsap } from "gsap"; // <-- Import GSAP
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Name({ isHomePage, homePageHeight }) {
  const nameOuterRef = useRef(null);
  const endTriggerForSticky = useRef(null);
  
  // --- Refs for Animation Targets ---
  const h1Ref = useRef(null);
  const nameContainerRef = useRef(null);

  useLayoutEffect(() => {
    // This hook ONLY runs on the client.
    if (isHomePage) {
      endTriggerForSticky.current = nameOuterRef.current;
      
      // --- GSAP ANIMATION SETUP ---
      // We wait for a moment to ensure everything is rendered.
      const timer = setTimeout(() => {
        const h1 = h1Ref.current;
        if (!h1) return;

        // Target our specific letter groups
        const lettersToHide = gsap.utils.toArray('.letter-hide');
        const lettersToMove = gsap.utils.toArray('.letter-move');

        // Create a single timeline to control all animations
        const tl = gsap.timeline({ paused: true });

        tl
          // 1. Animate the font size of the container
          .to(h1, {
            fontSize: "1rem", // Target font size
            duration: 1,
            ease: "power2.inOut"
          }, 0) // The '0' places this animation at the start of the timeline
          
          // 2. Animate the "astian " letters down and out
          .to(lettersToHide, {
            y: "100%",      // Move them down by their own height
            opacity: 0,
            duration: 0.5,
            stagger: 0.03, // A slight delay between each letter for a nice effect
            ease: "power2.in"
          }, 0)
          
          // 3. Animate the "fok" letters left to close the gap
          .to(lettersToMove, {
            x: "-65%", // This value may need tweaking based on your font
            duration: 1,
            ease: "power2.inOut"
          }, 0);

        // Create a ScrollTrigger to control the timeline
        ScrollTrigger.create({
          trigger: nameOuterRef.current,
          start: "bottom bottom", // When the bottom of the spacer hits the bottom of the screen
          end: "bottom 90",    // Animate until the spacer is at the top
          scrub: 0.5,           // Smoothly scrub through the animation
          animation: tl,        // Link the trigger to our timeline
          markers: true
        });

      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isHomePage]);

  // --- NEW: Split the text into individually controllable spans ---
  const name = "Sebastian fok";
  const nameContent = (
    <div ref={nameContainerRef} className={styles.nameContainer}>
      <Link href="/">
        <h1 ref={h1Ref}>
          <span className="letter-keep">S</span>
          <span className="letter-keep">e</span>
          <span className="letter-keep">b</span>
          <span className="letter-hide">a</span>
          <span className="letter-hide">s</span>
          <span className="letter-hide">t</span>
          <span className="letter-hide">i</span>
          <span className="letter-hide">a</span>
          <span className="letter-hide">n</span>
          <span className="letter-hide"> </span> {/* The space is also hidden */}
          <span className="letter-move">f</span>
          <span className="letter-move">o</span>
          <span className="letter-move">k</span>
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
    // --- RENDER FOR ALL OTHER PAGES ---
    // On other pages, we just want the final "Sebfok" state
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