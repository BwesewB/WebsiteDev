"use client"

import styles from "./sectionOne.module.css";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)

export default function SectionOne({
    paragraphTitleText = "Lorem Ipsum",
    textColour = "var(--black)",
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
        const headingText = document.querySelectorAll(`.${styles.headingText}`);
        
        // Function to trigger GSAP animation when the element enters the viewport
        const animateText = (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    gsap.fromTo(headingText, {
                        y: 10
                    }, {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        ease: "expoScale",
                        stagger: 0.2
                    });
                    // Once animation is triggered, stop observing
                    observer.unobserve(entry.target);
                }
            });
        };

        // Create an IntersectionObserver instance
        const observer = new IntersectionObserver(animateText, {
            threshold: 0.6, // The animation triggers when 80% of the element is in the viewport
        });

        if (headerRef.current) {
            observer.observe(headerRef.current); // Start observing the target element
        }

        return () => {
            if (headerRef.current) {
                observer.unobserve(headerRef.current); // Clean up observer
            }
        };
    }, []);

    return (
        <section ref={headerRef} className={styles.largeTextContainer}>
            <h3 style={{ color: textColour }}>
                {splitTextToSpans(paragraphTitleText)}
            </h3>
        </section>
    );
}