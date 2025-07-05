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
        if (!h1) return;

        const pinnedElement = h1.parentElement;
        const lettersToHide = gsap.utils.toArray('.letter-hide', h1);
        if (lettersToHide.length === 0) return;
        
        // --- THE DYNAMIC FIX ---
        // 1. Measure and store the original font size BEFORE animating.
        const originalFontSize = gsap.getProperty(h1, "fontSize");

        // --- THE SINGLE, REVERSIBLE TIMELINE ---
        const tl = gsap.timeline({ 
            paused: true,
            // When the timeline reverses, tell it what to do with the letters
            onReverseComplete: () => {
                // Instantly remove the width/padding styles, allowing
                // CSS to restore their natural size.
                gsap.set(lettersToHide, { clearProps: "all" });
            }
        });

        // Define the "Sebfok" state
        tl
          .to(h1, { 
            fontSize: "1rem", 
            duration: 0.5, 
            ease: "power2.inOut" 
          })
          .to(lettersToHide, {
            width: 0,
            padding: 0,
            margin: 0,
            minWidth: 0,
            opacity: 0,
            duration: 0.4,
            stagger: 0.02,
            ease: "power2.in"
          }, "<"); // "<" means start at the same time as the previous animation

        // --- THE CONTROLLER ---
        ScrollTrigger.create({
          trigger: pinnedElement,
          start: "top top",
          end: "top top-=15px",
          
          // When entering, we play the timeline forward.
          onEnter: () => tl.play(),
          
          // When leaving back up, we REVERSE the same timeline.
          onLeaveBack: () => {
            // Before reversing, ensure the font size tween targets the original size.
            // This is how you dynamically update a tween in a timeline!
            tl.tweenTo(0, { // Animate the playhead back to the start
              duration: 0.6,
              ease: "power2.inOut",
              overwrite: true, // Overwrite any currently running tweens on the same target
              onUpdate: function() {
                // While reversing, also reverse the font-size tween dynamically
                const h1Tween = tl.getChildren(false, true, true)[0]; // Get the first tween (the h1 tween)
                h1Tween.vars.fontSize = originalFontSize;
              }
            });
          }
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