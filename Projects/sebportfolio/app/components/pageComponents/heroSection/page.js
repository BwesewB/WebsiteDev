"use client"

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import styles from "./heroSection.module.css"

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection({
    heroSectionTitle = "",
    japaneseText = "",
    position = "fixed"
}) {

  const titleRef = useRef(null);
  const japaneseRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title letters
      gsap.fromTo(
        titleRef.current?.children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "expo.out",
          stagger: 0.05,
        }
      );

      // Animate Japanese text
      gsap.fromTo(
        japaneseRef.current?.children,
        { x: -40, rotate: -10, opacity: 0 },
        {
          x: 0,
          rotate: 0,
          opacity: 1,
          duration: 0.6,
          ease: "expo.out",
          delay: 0.3,
          stagger: 0.05,
        }
      );
    });

    return () => ctx.revert(); // Cleanup GSAP animation on unmount
  }, []);

    return (
      <div className={styles.hero} style={{position:position}}>
          <div className={styles.title} ref={titleRef}>
            {heroSectionTitle.split("").map((char, index) => (
              <h1 key={index} className={styles.letter}>{char === " " ? "\u00A0" : char}</h1>
            ))}
          </div>

          <div className={styles.japaneseWrap} ref={japaneseRef}>
            {japaneseText.split("").map((char, index) => (
              <h3 key={index} className={styles.japanese}>{char === " " ? "\u00A0" : char}</h3>
            ))}
          </div>
      </div>
    )
}