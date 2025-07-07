"use client";

import { useRef, useLayoutEffect, useState } from "react";
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
    const nameContainerRef = useRef(null);
    const [isSmall, setIsSmall] = useState(false);

useLayoutEffect(() => {
    const animationContext = gsap.context(() => {
        if (!isHomePage) {
            setIsSmall(true);
            return;
        }

        setIsSmall(false);
        endTriggerForSticky.current = nameOuterRef.current;
        
        const h1 = h1Ref.current;
        const nameContainer = nameContainerRef.current;
        if (!h1 || !nameContainer) return;

        const pinnedElement = nameContainer;
        const lettersToHide = gsap.utils.toArray('.letter-hide', h1);
        if (lettersToHide.length === 0) return;

        const originalFontSize = gsap.getProperty(h1, "fontSize");

        // --- THE SOLUTION: INTERRUPT-SAFE TIMELINES ---
        
        // 1. Create a variable to hold the currently active timeline.
        let activeTimeline;

        const playForward = () => {
            // If another animation is running, kill it instantly.
            if (activeTimeline) {
                activeTimeline.kill();
            }
            setIsSmall(true);

            // Create a new timeline for the forward animation.
            const tl = gsap.timeline({ defaults: { overwrite: 'auto' } });
            
            // Your original forward animation, preserved exactly.
            // (Corrected by removing the duplicate 'duration' property).
            tl
                .to(h1, {
                    fontSize: "1.2rem",
                    duration: 0.5,
                    ease: "power2.inOut"
                }, 0)
                .to(nameContainer, {
                    delay: 0.2, // This delay is relative to the start of the timeline
                    width: '8%',
                    ease: "power2.out",
                }, 0)
                .to(lettersToHide, {
                    opacity: 0,
                    stagger: 0.02, // Stagger from first to last letter
                    width: 0,
                    minWidth: 0,
                    padding: 0,
                    margin: 0,
                    duration: 0.3,
                    ease: "power2.inOut",
                    onComplete: () => {
                        gsap.set(lettersToHide, { xPercent: -50 });
                    }
                }, 0);
            
            // Store this new timeline as the active one.
            activeTimeline = tl;
        };

        const playBackward = () => {
            // If another animation is running, kill it instantly.
            if (activeTimeline) {
                activeTimeline.kill();
            }
            setIsSmall(false);

            // Create a new timeline for the backward animation.
            const tl = gsap.timeline({ defaults: { overwrite: 'auto' } });

            // To animate in reverse, we first need to ensure the letters are
            // in the correct starting position (from the end of the forward animation).
            // We use .set() to do this instantly.
            gsap.set(lettersToHide, { xPercent: 0 });

            tl
              .to(h1, { 
                  fontSize: originalFontSize, 
                  duration: 0.5, 
                  ease: "power2.inOut" 
              })
              .to(nameContainer, {
                  width: '100%',
              }, 0)
              .to(lettersToHide, {
                  xPercent: 0,
                  width: 'auto', 
                  minWidth: '', 
                  padding: '',
                  margin: '',
                  stagger: 0.03,
                  duration: 0.1, 
                  ease: "power4.out",
                  onComplete: () => {
                      gsap.to(lettersToHide, {
                          // delay: 0.2,
                          xPercent: 0,
                          duration: 0.5, 
                          stagger: 0.02,
                          ease: "power2.inOut",
                          opacity: 1,
                      });
                  }
              }, 0.2);

            activeTimeline = tl;
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
}, [isHomePage]);

  const nameContent = (
    <div ref={nameContainerRef} className={`${styles.nameContainer} ${!isSmall ? styles.isLarge : ''}`}>
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
        // style={{ height: homePageHeight > 0 ? `${homePageHeight}px` : "100vh" }}
        style={{ height: "1000vh" }}
      >
        <StickyContainer endTriggerRef={endTriggerForSticky}>
          {nameContent}
        </StickyContainer>
      </div>
    );
  } else {
    return 
  }
}