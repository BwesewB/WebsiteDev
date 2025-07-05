// components/atoms/name/Name.js
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
    // --- THIS IS THE KEY ---
    // Create a GSAP context scoped to the component's main element.
    const animationContext = gsap.context(() => {
      // If we are NOT on the homepage, there's nothing to do.
      if (!isHomePage) {
        // We can also ensure the "small" state is correct for non-home pages
        setIsSmall(true);
        return; 
      }
      
      // If we ARE on the homepage, reset the state to large.
      setIsSmall(false);
      
      endTriggerForSticky.current = nameOuterRef.current;
      
      const h1 = h1Ref.current;
      const nameContainer = nameContainerRef.current;
      if (!h1 || !nameContainer) return;

      const pinnedElement = nameContainer;
      const lettersToHide = gsap.utils.toArray('.letter-hide', h1);
      if (lettersToHide.length === 0) return;

      const originalFontSize = gsap.getProperty(h1, "fontSize");
      
        const playForward = () => {
            setIsSmall(true);
            gsap.timeline()
                .to(h1, { fontSize: "1.2rem", duration: 0.5, ease: "power2.inOut" }, 0)
                .to(nameContainer, {
                    delay: 0.2,
                    width: '8%',
                    ease: "power2.out",
                }, 0)
                .to(lettersToHide, {
                    opacity: 0,
                    duration: 0.5,
                    stagger: 0.02,
                    width: 0,
                    minWidth: 0,
                    padding: 0,
                    margin: 0,
                    duration: 0.3,
                    ease: "power2.inOut",
                    onComplete: () => {
                        gsap.to(lettersToHide, {
                            xPercent: -50,
                        });
                    }
                }, 0);
        };

        const playBackward = () => {
            setIsSmall(false);
            const tl = gsap.timeline();
            tl.to(h1, { 
                fontSize: originalFontSize, 
                duration: 0.5, 
                ease: "power2.inOut" 
            });
            tl.to(nameContainer, {
                width: '100%',
            }, 0)
            tl.add(() => {
                gsap.set(lettersToHide, {
                    delay: 0.5,
                    width: 'auto',
                    minWidth: '',
                    padding: '',
                    margin: '',
                    stagger: 0.02,
                    duration: 2,
                    ease: "power1.inOut",
                    onComplete: () => {
                        gsap.to(lettersToHide, {

                        });
                    }
                });
                gsap.to(lettersToHide, {
                    delay: 0.8,
                    // opacity: 1,
                    duration: 0.2,
                    stagger: 0.01,
                    xPercent: 0,
                    ease: "power2.inOut"
                });
            }, "<");
        };

      ScrollTrigger.create({
        trigger: pinnedElement,
        start: "top top",
        end: "top top-=15px",
        onEnter: playForward,
        onLeaveBack: playBackward,
        // markers: true,
      });

    }, nameOuterRef); // The context is scoped here.

    // --- THE RESET MECHANISM ---
    // This cleanup function runs whenever `isHomePage` changes.
    // `ctx.revert()` KILLS all animations and ScrollTriggers inside the context
    // AND removes all inline styles added by GSAP.
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