"use client";

import { useRef, useLayoutEffect, useState } from "react";
import Link from "next/link";
import StickyContainer from "../stickyContainer/page";
import styles from "./name.module.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Name({ isHomePage, nameOuterRef }) {
  const h1Ref = useRef(null);
  const nameContainerRef = useRef(null); 
  const [isSmall, setIsSmall] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: undefined });

  useLayoutEffect(() => {
    function handleResize() {
      setWindowSize({ width: window.innerWidth });
      ScrollTrigger.refresh()
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useGSAP(
    (context) => {
      if (!isHomePage) {
        setIsSmall(true);
        return;
      }

      console.log("[Name.js] Setting up homepage animations.");
      setIsSmall(false);

      context.add(() => {
        const h1 = h1Ref.current;
        const nameContainer = nameContainerRef.current;
        if (!h1 || !nameContainer) return;

        const text = h1.textContent;
        h1.innerHTML = text.split("").map((char, i) => {
          const safeChar = char === " " ? "&nbsp;" : char;
          return `<span class='letter'>${safeChar}</span>`;
        }).join("");
        const allLetters = gsap.utils.toArray('.letter', h1);
        const lettersToHide = allLetters.slice(3, 10);

        const originalFontSize = window.getComputedStyle(h1).fontSize;

        gsap.from(allLetters, {
          yPercent: -50,      // Start off-screen to the right
          autoAlpha: 0,   // Start invisible
          stagger: 0.02,  // "Wave" effect
          duration: 0.3,
          ease: 'power2.out',
          delay: 0.5,     // A small delay after page loads
      });

      gsap.fromTo(nameContainer, {
        xPercent:50,
        width: '100%'
      }, 
      {
        xPercent: 0,
        width: '',
        duration: 1,
        ease: "custom.default",
        delay: 0.5, 
      })

      const playForward = () => {
        setIsSmall(true);

        gsap.timeline({ defaults: { overwrite: 'auto' } })
            .to(h1, {
              fontSize: "1.2rem",
              duration: 0.5,
              ease: "power2.inOut",
            }, 0)
            .to(nameContainer, {
              delay: 0.2,
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
                  gsap.set(lettersToHide, { yPercent: 50 });
              }
            }, 0);
        };

      const playBackward = () => {
        setIsSmall(false);
        gsap.timeline({ defaults: { overwrite: 'auto' } })
          .to(h1, { 
            fontSize: originalFontSize, 
            duration: 0.5, 
            ease: "power2.inOut",
          })
          .to(nameContainer, {
            width: '100%',
          }, 0)
          .to(lettersToHide, {
            width: 'auto', 
            padding: '',
            margin: '',
            stagger: 0.03,
            duration: 0.1, 
            ease: "power4.out",
            onComplete: () => {
              gsap.to(lettersToHide, {
                yPercent: 0,
                duration: 0.5, 
                stagger: 0.02,
                ease: "power2.inOut",
                opacity: 1,
              });
            },
          }, -0.1);
      };

      ScrollTrigger.create({
        trigger: nameContainer,
        start: "top top",
        end: "top top-=15px",
        onEnter: playForward,
        onLeaveBack: playBackward,
        // markers: true,
      });

    }); 

  }, { scope: nameOuterRef, dependencies: [isHomePage, windowSize] }
);

  const nameContent = (
    <div ref={nameContainerRef} className={`${styles.nameContainer} ${!isSmall ? styles.isLarge : ''}`}>
      <Link href="/" >
        <h1 ref={h1Ref}>Sebastian fok</h1>
      </Link>
    </div>
  );

  if (isHomePage) {
    return (
      <div
        ref={nameOuterRef}
        className={styles.nameOuterHome}
      >
        <StickyContainer endTriggerRef={nameOuterRef}>
          {nameContent}
        </StickyContainer>
      </div>
    );
  } else {
    return 
  }
}
