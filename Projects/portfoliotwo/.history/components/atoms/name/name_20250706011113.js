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

        // --- THE SOLUTION: A SINGLE, CONTROLLABLE TIMELINE ---
        
        // 1. Create ONE master timeline that is initially paused.
        const masterTl = gsap.timeline({
            paused: true,
            defaults: {
                overwrite: 'auto' // Prevents tweens from fighting
            }
        });

        // 2. Add labels to define the start and end points of our animation segment.
        masterTl.addLabel("start");

        // 3. Recreate your EXACT `playForward` animation on this single timeline.
        //    (Note: The duplicate 'duration' property has been removed for correctness).
        masterTl
            .to(h1, {
                fontSize: "1.2rem",
                duration: 0.5,
                ease: "power2.inOut"
            }, "start") // Position at the "start" label
            .to(nameContainer, {
                width: '8%',
                duration: 0.5, // Giving it a duration for smooth animation
                ease: "power2.out",
            }, "start+=0.2") // Start 0.2s after the "start" label, preserving your delay
            .to(lettersToHide, {
                opacity: 0,
                stagger: 0.02,
                width: 0,
                minWidth: 0,
                padding: 0,
                margin: 0,
                duration: 0.3, // Your original duration
                ease: "power2.inOut",
            }, "start"); // Position at the "start" label

        // 4. *** THIS IS THE CRITICAL FIX ***
        // Convert your `onComplete` into a `.set()` call on the timeline.
        // A .set() is like an instant .to(), and it IS part of the timeline,
        // so it can be properly reversed.
        // This happens 0.3s after "start", right when the lettersToHide animation ends.
        masterTl.set(lettersToHide, { xPercent: -50 }, "start+=0.3");

        // 5. Add a label to mark the end of the animation.
        masterTl.addLabel("end");


        // --- CONTROL THE MASTER TIMELINE WITH SCROLLTRIGGER ---
        ScrollTrigger.create({
            trigger: pinnedElement,
            start: "top top",
            end: "top top-=15px",

            // onEnter: Instead of calling a function that creates a NEW timeline,
            // we tell our MASTER timeline to play forward to the "end" label.
            onEnter: () => {
                setIsSmall(true);
                masterTl.tweenTo("end");
            },

            // onLeaveBack: We tell our MASTER timeline to play in reverse
            // back to the "start" label.
            onLeaveBack: () => {
                masterTl.tweenTo("start", {
                    // This ensures the state is only set back to 'large'
                    // after the reverse animation is fully complete.
                    onComplete: () => {
                        setIsSmall(false);
                    }
                });
            },
            
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
        style={{ height: homePageHeight > 0 ? `${homePageHeight}px` : "100vh" }}
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