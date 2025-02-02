"use client";

import styles from "./pinSection.module.css";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import Link from "next/link";

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
    skills = "Lorem ipsum dolor seit ameit", 
    src, 
    projectHref = "",
    backgroundColor, 
    color = "var(--black)"
}) => {
  return (
    <div className={styles.card}>
        <Link href={projectHref} className={styles.projectLink}>
            <div className={styles.cardInner} style={{ backgroundColor }}>
                <div className={styles.cardContent} style={{ color }}>
                    <h2>{splitTextToSpans(title)}</h2>
                    <h5>{copy}</h5>
                    <p>{skills}</p>
                </div>
                <div className={styles.cardImg}>
                    <img className={styles.img} src={src} alt={title} />
                </div>
            </div>
        </Link>
    </div>
  );
};

export default function PinSection({ cards = [] }) {
    const container = useRef();
    
    useEffect(() => {
        const cardsElements = document.querySelectorAll(`.${styles.card}`);
        
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
                        trigger: card, // Each card will trigger its own animation
                        start: "top 75%",
                        end: "top 50%",
                        scrub: true,
                        toggleActions: "play none none none",
                        once: true,
                        markers: true,
                    }
                }
            );
        });
    }, []);


    useGSAP(() => {
        const cardsElements = gsap.utils.toArray(`.${styles.card}`);

        ScrollTrigger.create({
            trigger: cardsElements[0],
            start: "top 35%",
            endTrigger: cardsElements[cardsElements.length - 1],
            end: "top 30%",
            pin: `.${styles.hero}`,
            pinSpacing: false,
            // markers:true
        });

        cardsElements.forEach((card, index) => {
        const isLastCard = index === cardsElements.length - 1;
        const cardInner = card.querySelector(`.${styles.cardInner}`);

        if (!isLastCard) {
            ScrollTrigger.create({
            trigger: card,
            start: "top 25%", //og 35
            endTrigger: `.${styles.bottom}`,
            end: "top 65%", //og 65
            pin: true,
            pinSpacing: false,
            //   markers:true
            });

            gsap.to(cardInner, {
            y: `-${(cardsElements.length - index) * 14}vh`,
            ease: "none",
            scrollTrigger: {
                trigger: card,
                start: "top 25%",
                endTrigger: `.${styles.bottom}`,
                end: "top 65%",
                scrub: true,
                // markers:true
            },
            });
        }
        });

        return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, { scope: container });
    
    if (!cards || cards.length === 0) {
        return <div>No cards available</div>;
    }

    return (
        <div ref={container} className={styles.pinSectionContainer}>
            <div className={styles.hero}></div>
                <section className={styles.cardsSection}>
                    {cards.map((card, index) => (
                    <Card key={index} {...card} index={index} />
                    ))}
                </section>
            <div className={styles.bottom}></div>
        </div>
    );
}
