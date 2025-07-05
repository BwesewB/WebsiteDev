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
  const h1Ref = useRef(null);
  // We don't actually need nameContainerRef anymore
  // const nameContainerRef = useRef(null); 

  useLayoutEffect(() => {
    if (isHomePage) {
      endTriggerForSticky.current = nameOuterRef.current;

      const timer = setTimeout(() => {
        // --- THIS IS THE KEY ---
        // We establish our scope first. All selections will be inside this element.
        const scope = h1Ref.current; 
        if (!scope) return;

        // --- ALL SELECTORS NOW INCLUDE THE SCOPE ---
        const lettersToHide = gsap.utils.toArray('.letter-hide', scope);
        const lettersToMove = gsap.utils.toArray('.letter-move', scope);

        // If the selectors don't find anything, abort.
        if (lettersToHide.length === 0 || lettersToMove.length === 0) {
            console.warn("GSAP could not find letters to animate. Check classes and scope.");
            return;
        }

        const tl = gsap.timeline({
          // Add this to your timeline for better performance and to avoid flashes
          defaults: { ease: "power2.inOut", duration: 1 } 
        });

        tl
          .to(scope, { fontSize: "1rem" }, 0)
          .to(lettersToHide, {
            y: "100%",
            opacity: 0,
            duration: 0.5, // Keep a shorter duration for the hide animation
            stagger: 0.03,
            ease: "power2.in"
          }, 0)
          .to(lettersToMove, { x: "-65%" }, 0);

        // --- NEW: Use a GSAP Context for easier cleanup ---
        let ctx = gsap.context(() => {
            ScrollTrigger.create({
              trigger: nameOuterRef.current,
              start: "bottom bottom",
              end: "bottom top",
              scrub: 0.5,
              animation: tl,
              // markers: true,
            });
        });
        
        // Return a cleanup function
        return () => {
            clearTimeout(timer);
            ctx.revert(); // This will kill the ScrollTrigger and revert all animations
        };

      }, 100);
    }
  }, [isHomePage]);

  // The JSX part is already correct. No changes needed there.
  const nameContent = (
    <div className={styles.nameContainer}>
      <Link href="/">
        <h1 ref={h1Ref}>
          <span className="letter-keep">S</span>
          {/* ... all your other spans ... */}
          <span className="letter-hide">a</span>
          <span className="letter-hide">s</span>
          <span className="letter-hide">t</span>
          <span className="letter-hide">i</span>
          <span className="letter-hide">a</span>
          <span className="letter-hide">n</span>
          <span className="letter-hide"> </span>
          <span className="letter-move">f</span>
          <span className="letter-move">o</span>
          <span className="letter-move">k</span>
        </h1>
      </Link>
    </div>
  );

  if (isHomePage) {
    // ... return logic is correct
    return (
      <div
        ref={nameOuterRef}
        className={styles.nameOuterHome}
        style={{ height: homePageHeight > 0 ? `${homePageHeight}px` : "100vh" }}
      >
        <StickyContainer endTriggerForSticky={endTriggerForSticky}>
          {nameContent}
        </StickyContainer>
      </div>
    );
  } else {
    // ... return logic is correct
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