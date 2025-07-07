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

//   useLayoutEffect(() => {
//     if (isHomePage) {
//       endTriggerForSticky.current = nameOuterRef.current;
      
//       const animationContext = gsap.context(() => {
//         const h1 = h1Ref.current;
//         if (!h1) return;

//         const pinnedElement = h1.parentElement;
//         const lettersToHide = gsap.utils.toArray('.letter-hide', h1);
//         if (lettersToHide.length === 0) return;
        
//         const tl = gsap.timeline({ paused: true });

//         // THE "BRUTE FORCE" ANIMATION - We target every possible spacing property
//         const hideAnimation = {
//             opacity: 0,
//             duration: 0.2,
//             stagger: 0.02,
//             ease: "power2.out",
//                 onComplete: () => {
//                     gsap.to(lettersToHide, {
//                     width: 0,
//                     minWidth: 0,
//                     padding: 0,
//                     margin: 0,
//                     duration: 0.3,
//                     ease: "power2.inOut"
//                     });
//                 }
//         };

//         tl
//           .to(h1, { 
//             delay: 0.2,
//             fontSize: "1rem", 
//             duration: 0.6, 
//             ease: "power2.inOut" 
//           }, 0)
          
//           .to(lettersToHide, hideAnimation, 0)
//           .set(lettersToHide, { display: 'none' });

//         ScrollTrigger.create({
//           trigger: pinnedElement,
//           start: "top top",
//           end: "top top-=15px",
//           onEnter: () => tl.play(),
//           onLeaveBack: () => tl.reverse(),
//           // markers: true,
//         });

//       }, nameOuterRef);

//       return () => animationContext.revert();
//     }
//   }, [isHomePage]);

  useLayoutEffect(() => {
    if (isHomePage) {
      endTriggerForSticky.current = nameOuterRef.current;
      
      const animationContext = gsap.context(() => {
        const h1 = h1Ref.current;
        const nameContainer = nameContainerRef.current; // Get the container element
        if (!h1 || !nameContainer) return;

        const pinnedElement = nameContainer;
        const lettersToHide = gsap.utils.toArray('.letter-hide', h1);
        if (lettersToHide.length === 0) return;

        const originalFontSize = gsap.getProperty(h1, "fontSize");
        
        // --- FORWARD ANIMATION (The Collapse and Shrink) ---
        const playForward = () => {
          gsap.timeline()
            // Animate font size, letter collapse, and CONTAINER RESIZE all at once
            .to(h1, { fontSize: "1.2rem", duration: 0.5, ease: "power2.inOut" }, 0)
            .to(lettersToHide, {
                opacity: 0,
                width: 0,
                padding: 0,
                margin: 0,
                minWidth: 0,
                stagger: 0.02,
                duration: 0.4,
                ease: "power2.in"
            }, 0)
            // THE NEW PART: Animate the container itself
            .to(nameContainer, {
                width: "auto",      // Let it shrink-wrap the content
                margin: "0",        // Or your desired final margin
                padding: "1.5rem 2rem", // Or your desired final padding
                duration: 0.5,
                ease: "power2.inOut"
            }, 0);
        };

        // --- BACKWARD ANIMATION (The Restore and Expand) ---
        const playBackward = () => {
          gsap.timeline()
            // Restore font size and CONTAINER SIZE at the same time
            .to(h1, { fontSize: originalFontSize, duration: 0.5, ease: "power2.inOut" }, 0)
            .to(nameContainer, {
                width: "auto", // Or back to its original width if needed
                margin: "calc(3 * var(--masterSpacing)) calc(4 * var(--masterSpacing))",
                padding: "", // Let CSS handle it
                duration: 0.5,
                ease: "power2.inOut"
            }, 0)
            // Restore the hidden letters' width first to make space
            .set(lettersToHide, { width: 'auto', minWidth: '', padding: '', margin: '' }, 0)
            // Then fade them in
            .to(lettersToHide, {
                opacity: 1,
                duration: 0.3,
                stagger: {
                    each: 0.02,
                    from: "end"
                }
            }, 0.1);
        };

        ScrollTrigger.create({
          trigger: pinnedElement,
          start: "top top",
          end: "top top-=15px",
          onEnter: playForward,
          onLeaveBack: playBackward,
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
          <span className="letter-keep">S</span>
          <span className="letter-keep">e</span>
          <span className="letter-keep">b</span>
          <span className="letter-hide">a</span>
          <span className="letter-hide">s</span>
          <span className="letter-hide">t</span>
          <span className="letter-hide">i</span>
          <span className="letter-hide">a</span>
          <span className="letter-hide">n</span>
          <span className="letter-hide"> </span>
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
    return (
      <div className={styles.nameOuterOther}>
        <div className={styles.nameContainer}>
          <Link href="/">
            <h1 style={{ fontSize: '1rem' }}>sebfok</h1>
          </Link>
        </div>
      </div>
    );
  }
}