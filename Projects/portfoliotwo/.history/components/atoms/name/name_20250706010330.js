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

            // --- THE SOLUTION: A SINGLE, CONTROLLABLE TIMELINE ---
            // We create ONE master timeline that is initially paused.
            // This timeline will contain the entire "forward" animation.
            const masterTl = gsap.timeline({
                paused: true,
                // These callbacks are tied to the timeline's playback state.
                onStart: () => setIsSmall(true), // When it starts playing forward
                onReverseComplete: () => setIsSmall(false), // When it finishes reversing
                defaults: {
                    // This is a safety net. If tweens overlap, the new one will
                    // intelligently kill the old one, preventing conflicts.
                    overwrite: 'auto'
                }
            });

            // --- BUILD THE FORWARD ANIMATION ON THE MASTER TIMELINE ---
            // We build the sequence once, just like your `playForward` function.
            
            masterTl
                .to(h1, {
                    fontSize: "1.2rem",
                    duration: 0.5,
                    ease: "power2.inOut"
                }, 0) // Position at the start
                .to(nameContainer, {
                    width: '8%',
                    duration: 0.5, // Give it a matching duration
                    ease: "power2.out"
                }, 0) // Position at the start
                .to(lettersToHide, {
                    // Combine all properties into one efficient tween
                    opacity: 0,
                    xPercent: -100, // Move them out of the way
                    width: 0,
                    minWidth: 0,
                    padding: 0,
                    margin: 0,
                    stagger: 0.02,
                    duration: 0.4,
                    ease: "power2.inOut",
                }, 0); // Position at the start


            // --- CONTROL THE MASTER TIMELINE WITH SCROLLTRIGGER ---
            // Instead of calling functions that create new timelines, we just
            // control the playback of our single master timeline.
            ScrollTrigger.create({
                trigger: pinnedElement,
                start: "top top",
                end: "top top-=15px",

                // When you enter the trigger area, play the timeline forward.
                onEnter: () => masterTl.play(),

                // When you leave the trigger area (scrolling up), reverse the timeline.
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