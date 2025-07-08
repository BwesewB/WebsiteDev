"use client";

import { useRef, useLayoutEffect, useState } from "react";
import Link from "next/link";
import StickyContainer from "../stickyContainer/page";
import styles from "./name.module.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

export default function Name({ isHomePage }) {
  const nameOuterRef = useRef(null);
  const h1Ref = useRef(null);
  const endTriggerForSticky = useRef(null);
  const nameContainerRef = useRef(null);
  const [isSmall, setIsSmall] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: undefined });

  useGSAP(() => {
      function handleResize() {
          setWindowSize({ width: window.innerWidth });
          ScrollTrigger.refresh()
      }

      window.addEventListener("resize", handleResize);

      handleResize();

      return () => window.removeEventListener("resize", handleResize);
  }, []);

  useGSAP(
    () => {
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

      const text = h1.textContent;
      h1.innerHTML = text.split("").map((char, i) => {
        if (i <= 2) return `<span class='letter-keep'>${char}</span>`;
        if (i <= 9) return `<span class='letter-hide'>${char}</span>`;
        return `<span class='letter-move'>${char}</span>`;
      }).join("");

      const lettersToHide = gsap.utils.toArray('.letter-hide', h1);
      if (lettersToHide.length === 0) return;

      const originalFontSize = window.getComputedStyle(h1).fontSize;

      let activeTimeline;

      const playForward = () => {
        if (activeTimeline) activeTimeline.kill();
        setIsSmall(true);

        activeTimeline = gsap.timeline({ defaults: { overwrite: 'auto' } })
            .to(h1, {
                fontSize: "1.2rem",
                duration: 0.5,
                ease: "power2.inOut",
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
      };

      const playBackward = () => {
        if (activeTimeline) activeTimeline.kill();
          setIsSmall(false);
          gsap.set(lettersToHide, { xPercent: 0 });
          activeTimeline = gsap.timeline({ defaults: { overwrite: 'auto' } })
            .to(h1, { 
                fontSize: originalFontSize, 
                duration: 0.5, 
                ease: "power2.inOut",
            })
            .to(nameContainer, {
                width: '100%',
            }, 0)
            .to(lettersToHide, {
                xPercent: 0,
                width: 'auto', 
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
                },
            }, 0.2);
      };

      ScrollTrigger.create({
          trigger: pinnedElement,
          start: "top top",
          end: "top top-=15px",
          onEnter: playForward,
          onLeaveBack: playBackward,
          markers: true,
      });
  },     {
      dependencies: [isHomePage, windowSize], // ✅ only re-run when necessary
      scope: nameOuterRef, // ✅ limits selector scope to this component subtree
    });

  const nameContent = (
    <div ref={nameContainerRef} className={`${styles.nameContainer} ${!isSmall ? styles.isLarge : ''}`}>
      <Link href="/" >
        <h1 ref={h1Ref}>Sebastian fok</h1>
      </Link>
    </div>
  );

  if (isHomePage) {
    return (
      <div
        ref={nameOuterRef}
        className={styles.nameOuterHome}
        // style={{ height: homePageHeight > 0 ? `${homePageHeight}px` : "100vh" }}
        // style={{ height: "1000vh" }}
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