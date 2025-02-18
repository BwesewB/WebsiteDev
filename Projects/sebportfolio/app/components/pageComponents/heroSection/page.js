"use client"

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import styles from "./heroSection.module.css"

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection({
    heroSectionTitle = "",
    japaneseText = ""
}) {

    useEffect(() => {
      const ctx = gsap.context(() => {
        gsap.fromTo(`.${styles.letter}`, {
          y:40,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "expoScale",
          stagger: 0.05, // Stagger for smoother animation
        });
      });

      return () => ctx.revert(); // Cleanup GSAP animation on unmount
    }, []);

    useEffect(() => {
      const ctx = gsap.context(() => {
        gsap.fromTo(`.${styles.japanese}`, {
          x:-40,
        },
        {
          x: 0,
          delay:0.5,
          opacity: 1,
          duration: 0.6,
          ease: "expoScale",
          stagger: 0.05, // Stagger for smoother animation
        });
      });

      return () => ctx.revert(); // Cleanup GSAP animation on unmount
    }, []);

    return (
      <div className={styles.hero}>
          <div className={styles.title}>
            {heroSectionTitle.split("").map((char, index) => (
              <h1 key={index} className={styles.letter}>{char === " " ? "\u00A0" : char}</h1>
            ))}
          </div>

          <div className={styles.japaneseWrap}>
            {japaneseText.split("").map((char, index) => (
              <h3 key={index} className={styles.japanese}>{char === " " ? "\u00A0" : char}</h3>
            ))}
          </div>

      </div>
    )
}