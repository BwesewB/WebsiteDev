"use client"

import styles from "./LargeTextSection.module.css";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)

export default function LargeTextSection({
    paragraphTitleText = "Lorem Ipsum",
}) {

    const headerRef = useRef(null);

    const splitTextToSpans = (text) => {
        return text.split(" ").map((word, index) => (
            <span key={index} className={styles.headingText}>
                {word}&nbsp;
            </span>
        ));
    };

    useEffect(() => {
        // Target all largeTextContainer sections
        const sections = gsap.utils.toArray(`.${styles.largeTextContainer}`);
    
        sections.forEach((section) => {
          const headingText = section.querySelectorAll(`.${styles.headingText}`);
    
          gsap.fromTo(
            headingText,
            { y: 10, opacity: 0 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "expo.out",
              stagger: 0.2,
              scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "bottom 20%",
                // markers: true,
                scrub: false,
              },
            }
          );
        });
    
        return () => {
          ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
      }, []);

    return (
        <section ref={headerRef} className={styles.largeTextContainer}>
            <h3>
                {splitTextToSpans(paragraphTitleText)}
            </h3>
        </section>
    );
}