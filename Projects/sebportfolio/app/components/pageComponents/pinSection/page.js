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
    skills = [], 
    src, 
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
                        {isVideo(src) ? (
                            <video className={styles.img} src={src} alt={title} autoPlay loop muted />
                        ) : (
                            <img className={styles.img} src={src} alt={title} />
                        )}
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default function PinSection({ cards = [] }) {
    const container = useRef();
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useGSAP(() => {
        const cardsElements = container.current.querySelectorAll(`.${styles.card}`);
        
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
                        // markers: true,
                    }
                }
            );
        });
    }, { scope: container });


    useGSAP(() => {
        const cardsElements = gsap.utils.toArray(`.${styles.card}`);

        ScrollTrigger.create({
            trigger: cardsElements[0],
            start: "top 35%",
            endTrigger: cardsElements[cardsElements.length - 1],
            end: "top 30%",
            pin: `.${styles.hero}`,
            pinSpacing: false,
            anticipatePin: 1
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
                end: "top 75%", //og 65. make sure the one below has sthe same end percentage. more padding higher percentage
                scrub: 0.3,
                pin: true,
                pinSpacing: false,
                // markers:true
            });

            gsap.to(cardInner, {
                y: `-${(cardsElements.length - index) * 14}vh`,
                ease: "none",
                scrollTrigger: {
                    trigger: card,
                    start: "top 25%",
                    endTrigger: `.${styles.bottom}`,
                    end: "top 75%", //og 65
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
            <div className={styles.hero}><h1>Hero section in progress... Please Scroll Down</h1></div>
                <section className={styles.cardsSection}>
                    {cards.map((card, index) => (
                        <Card key={index} {...card} index={index} />
                    ))}
                </section>
            <div className={styles.bottom}></div>
        </div>
    );
}
