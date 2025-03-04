"use client";

import styles from "./pinSection.module.css";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import Link from "next/link";
import HeroSection from "../heroSection/page";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const splitTextToSpans = (text) => {
    return text.split(" ").map((word, index) => (
        <span key={index} className={styles.headingText}>
            {word}&nbsp;
        </span>
    ));
};

const Card = ({ 
    title, 
    copy, 
    skills = [], 
    src = "/media/placeholder.png", 
    projectLink = "",
    backgroundColor, 
    color = "var(--white)"
}) => {

const isVideo = (src) => {
    const videoExtensions = ['.mp4', '.mov'];
    return videoExtensions.some(ext => src.endsWith(ext));
};

    return (
        <div className={styles.card}>
            <Link href={projectLink} className={styles.projectLink}>
                <div className={styles.cardInner} style={{ backgroundColor }}>
                    <div className={styles.cardContent} style={{ color }}>
                        <h2>{splitTextToSpans(title)}</h2>
                        <h5>{copy}</h5>
                        <ul>
                            {skills.map((skill, index) => (
                                <li key={index}><p>{skill}</p></li>
                            ))}
                        </ul>
                    </div>
                    <div className={styles.cardImg}>
                        <div className={styles.cardImgWrap}>
                            {isVideo(src) ? (
                                <video className={styles.img} src={src} alt={title} autoPlay loop muted />
                            ) : (
                                <img className={styles.img} src={src} alt={title} />
                            )}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default function PinSection({ 
    cards = [], 
    heroSectionTitle,
    japaneseText,
}) {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
    
        const cardsElements = gsap.utils.toArray(`.${styles.card}`);
    
        // Animation for text spans
        cardsElements.forEach((card) => {
            const headingTextSpans = card.querySelectorAll(`.${styles.headingText}`);
    
            gsap.fromTo(
                headingTextSpans,
                { y: 20, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 2,
                    ease: "power4.out",
                    stagger: 0.2,
                    scrollTrigger: {
                        trigger: card,
                        start: "top 75%",
                        end: "top 50%",
                        scrub: true,
                        once: true,
                    },
                }
            );
        });
    
        // MatchMedia for responsive breakpoints
        let mm = gsap.matchMedia();
    
        mm.add(
            {
                isDesktop: "(min-width: 768px)",
                isMobile: "(max-width: 767px)"
            },
            (context) => {
                let { isDesktop, isMobile } = context.conditions;
    
                ScrollTrigger.create({
                    trigger: cardsElements[0],
                    start: isDesktop ? "top 35%" : "top top",
                    endTrigger: cardsElements[cardsElements.length - 1],
                    end: "top 30%",
                    pin: `.${styles.hero}`,
                    pinSpacing: false,
                    anticipatePin: 1,
                    scrub: true,
                });
    
                cardsElements.forEach((card, index) => {
                    const isLastCard = index === cardsElements.length - 1;
                    const cardInner = card.querySelector(`.${styles.cardInner}`);
    
                    if (!isLastCard) {
                        ScrollTrigger.create({
                            trigger: card,
                            start: isDesktop ? "top 25%" : "top top",
                            endTrigger: `.${styles.bottom}`,
                            end: "top 75%",
                            scrub: 0.3,
                            pin: true,
                            pinSpacing: false,
                        });
    
                        gsap.to(cardInner, {
                            y: `-${(cardsElements.length - index) * 14}vh`,
                            ease: "none",
                            scrollTrigger: {
                                trigger: card,
                                start: isDesktop ? "top 25%" : "top top",
                                endTrigger: `.${styles.bottom}`,
                                end: "top 75%",
                                scrub: true,
                                // markers: true,
                            },
                        });
                    }
                });
            }
        );
    
        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
            mm.revert(); // Clean up media query listeners
        };
    }, []);
    
    
    if (!cards || cards.length === 0) {
        return <div>No cards available</div>;
    }

    return (
        <div ref={containerRef} className={styles.pinSectionContainer}>
            <div className="hero">
                <HeroSection
                    heroSectionTitle={heroSectionTitle}
                    japaneseText={japaneseText}
                />
            </div>
            <div className={styles.spacerSection}>

            </div>
            <section className={styles.cardsSection}>
                {cards.map((card, index) => (
                    <Card key={index} {...card} index={index} />
                ))}
            </section>
            <div className={styles.bottom}></div>
        </div>
    );
}
