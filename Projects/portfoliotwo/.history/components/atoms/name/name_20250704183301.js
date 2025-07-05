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
  const endTriggerForSticky = useRef(null);
  const h1Ref = useRef(null);

  useLayoutEffect(() => {
    if (isHomePage) {
      const animationContext = gsap.context(() => {
        const h1 = h1Ref.current;
        if (!h1) return;

        const lettersToHide = gsap.utils.toArray('.letter-hide', h1);
        const lettersToMove = gsap.utils.toArray('.letter-move', h1);

        if (lettersToHide.length === 0 || lettersToMove.length === 0) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: nameOuterRef.current,
            start: "bottom bottom", // When it hits the bottom
            end: "bottom top+=10%", // A little buffer so it finishes before the top
            scrub: 0.5,
            // markers: true,
          }
        });

        tl
          .to(h1, { fontSize: "1rem", ease: "power2.out" }, 0)
          .to(lettersToHide, {
            yPercent: 100, // Use yPercent for more reliable "move by own height"
            opacity: 0,
            stagger: 0.03,
            ease: "power2.in"
          }, 0)
          .to(lettersToMove, {
            xPercent: -65, // Use xPercent for more reliable percentage-based movement
            ease: "power2.inOut"
          }, 0);

      }, nameOuterRef); // <-- Scope the context to our main container

      // The cleanup function for THIS component's animations
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
          <span className="letter-hide"> </span>
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
            <h1 style={{ fontSize: '1rem' }}>Sebfok</h1>
          </Link>
        </div>
      </div>
    );
  }
}