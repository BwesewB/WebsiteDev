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

  useGSAP(() => {
    if (!isHomePage) return;

    const h1 = h1Ref.current;
    const nameContainer = nameContainerRef.current;
    if (!h1 || !nameContainer) return;

    // Split text into letters. This only needs to happen once.
    const text = h1.textContent;
    h1.innerHTML = text.split("").map((char) => {
      const safeChar = char === " " ? "&nbsp;" : char;
      return `<span class='letter'>${safeChar}</span>`;
    }).join("");

    const allLetters = gsap.utils.toArray('.letter', h1);

    // The intro animations
    gsap.from(allLetters, {
      yPercent: -50,
      autoAlpha: 0,
      stagger: 0.02,
      duration: 0.3,
      ease: 'power2.out',
      delay: 0.5,
    });

    gsap.fromTo(nameContainer, {
      xPercent: 50,
      width: '100%'
    }, {
      xPercent: 0,
      width: '',
      duration: 1,
      ease: "custom.default",
      delay: 0.5,
    });

  // Dependencies: only isHomePage. It will NOT re-run on resize.
  }, { scope: nameOuterRef, dependencies: [isHomePage] });


  // --- HOOK 2: Scroll-Based Animation (Re-runs on resize) ---
  useGSAP(() => {
    if (!isHomePage) {
        setIsSmall(true);
        return;
    }
    
    setIsSmall(false);

    const h1 = h1Ref.current;
    const nameContainer = nameContainerRef.current;
    if (!h1 || !nameContainer) return;

    // We still need to grab the elements here for the scroll animation
    const allLetters = gsap.utils.toArray('.letter', h1);
    const lettersToHide = allLetters.slice(3, 10);

    // This needs to be re-calculated on resize in case of responsive font-sizes
    const originalFontSize = window.getComputedStyle(h1).fontSize;

    const playForward = () => {
      setIsSmall(true);
      gsap.timeline({ defaults: { overwrite: 'auto' } })
          .to(h1, { fontSize: "1.2rem", duration: 0.5, ease: "power2.inOut" }, 0)
          .to(nameContainer, { delay: 0.2, width: '8%', ease: "power2.out" }, 0)
          .to(lettersToHide, {
            opacity: 0, stagger: 0.02, width: 0, minWidth: 0,
            padding: 0, margin: 0, duration: 0.3, ease: "power2.inOut",
            onComplete: () => gsap.set(lettersToHide, { yPercent: 100 })
          }, 0);
    };

    const playBackward = () => {
      setIsSmall(false);
      gsap.timeline({ defaults: { overwrite: 'auto' } })
        .to(h1, { fontSize: originalFontSize, duration: 0.5, ease: "power2.inOut" })
        .to(nameContainer, { width: '100%' }, 0)
        .to(lettersToHide, {
          width: 'auto', padding: '', margin: '', stagger: 0.03,
          duration: 0.1, ease: "power4.out",
          onComplete: () => {
            gsap.to(lettersToHide, {
              yPercent: 0, duration: 0.5, stagger: 0.02,
              ease: "power2.inOut", opacity: 1,
            });
          },
        }, -0.1);
    };

    const st = ScrollTrigger.create({
      trigger: nameContainer,
      start: "top top",
      end: "top top-=15px",
      onEnter: playForward,
      onLeaveBack: playBackward,
    });

    // Cleanup for this hook
    return () => {
        st.kill();
    }

  // Dependencies: includes windowSize. This hook WILL re-run on resize.
  }, { scope: nameOuterRef, dependencies: [isHomePage, windowSize] });

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
