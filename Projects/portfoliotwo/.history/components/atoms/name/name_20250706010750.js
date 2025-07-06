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

        // --- THE SOLUTION: A SINGLE, FULLY REVERSIBLE TIMELINE ---
        
        // 1. Immediately set the final "small" state.
        // We set the properties that the elements WILL HAVE at the end of the animation.
        gsap.set(h1, { fontSize: "1.2rem" });
        gsap.set(nameContainer, { width: '8%' });
        gsap.set(lettersToHide, {
            opacity: 0,
            width: 0,
            minWidth: 0,
            padding: 0,
            margin: 0,
            xPercent: -100 // Set the final x position here
        });

        // 2. Create a master timeline that animates FROM this end state.
        // When played forward, it will look like it's animating TO the small state.
        // When reversed, it animates perfectly back to the initial "large" state.
        const masterTl = gsap.timeline({
            paused: true,
            onStart: () => setIsSmall(true),
            onReverseComplete: () => setIsSmall(false),
            defaults: {
                duration: 0.5,
                ease: 'power2.inOut',
                overwrite: 'auto'
            }
        });

        // 3. Build the timeline using .from()
        // This tells GSAP to animate FROM the values we just set
        // TO the values the elements had before we ran the .set() calls.
        masterTl
            .from(h1, { fontSize: "+=0" }) // A trick to grab the original font-size
            .from(nameContainer, { width: '100%' }, "<") // Animate from 100% width, at the same time
            .from(lettersToHide, {
                opacity: 1,
                width: 'auto',
                minWidth: 'auto',
                padding: '0 0.05em', // Use the actual padding if it exists
                margin: '0',
                xPercent: 0, // Animate from xPercent: 0
                stagger: 0.02
            }, "<"); // Start at the same time as the others

        // --- CONTROL THE MASTER TIMELINE WITH SCROLLTRIGGER ---
        ScrollTrigger.create({
            trigger: pinnedElement,
            start: "top top",
            end: "top top-=15px",
            // onEnter: playForward (but playForward is now masterTl.play())
            onEnter: () => masterTl.play(),
            // onLeaveBack: playBackward (but playBackward is now masterTl.reverse())
            onLeaveBack: () => masterTl.reverse(),
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