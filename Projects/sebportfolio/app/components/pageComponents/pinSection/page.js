"use client";

import styles from "./pinSection.module.css"
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from '@gsap/react';
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis"
import HeroSection from "../heroSection/page";

gsap.registerPlugin(useGSAP)
gsap.registerPlugin(ScrollTrigger);

const Card = ({ title, copy, src="/images/placeholder.png", index }) => {
    return (
        <div className={styles.card}>
            <div className={`${styles.cardInner} 
                ${index === 0 ? styles.firstCard : ''}
                ${index === 1 ? styles.secondCard : ''}
                ${index === 2 ? styles.thirdCard : ''}`}
            >
                <div className={styles.cardContent}>
                    <h1>{title}</h1>
                    <p>{copy}</p>
                </div>
                <div className={styles.cardImg}>
                    <img className={styles.img} src={src} alt={title} />
                </div>
            </div>
        </div>
    )
}

export default function PinSection({
    
}) {

    const cards = [
        {
            title:"Flare",
            copy:"FFF",
        },
        {
            title:"Sakanaya",
            copy:"SSS",
        },
        {
            title:"West Point Hotel",
            copy:"WWW",
        },
        
    ]

    const container = useRef()

    useGSAP(() => {
        const cards = gsap.utils.toArray(`.${styles.card}`);

        ScrollTrigger.create({
            trigger:cards[0],
            start: "top 35%",
            endTrigger: cards[cards.length - 1],
            end: "top 30%",
            pin: `.${styles.hero}`,
            pinSpacing: false,
        });

        cards.forEach((card, index) => {
            const isLastCard = index === cards.length - 1;
            const cardInner = card.querySelector(`.${styles.cardInner}`);

            if (!isLastCard) {
                ScrollTrigger.create ({
                    trigger: card,
                    start: "top 35%",
                    endTrigger: `.${styles.bottom}`,
                    end: "top 65%",
                    pin: true,
                    pinSpacing: false,
                })

                gsap.to(cardInner, {
                    y: `-${(cards.length - index) * 14}vh`,
                    ease: "none",
                    scrollTrigger: {
                        trigger:card,
                        start: "top 35%",
                        endTrigger:  `.${styles.bottom}`,
                        end: "top 65%",
                        scrub:true,
                    }
                })
            }
        })

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
        }
    }, {scope: container});

    return (
        <div ref={container}>
            <div className={styles.hero}>

            </div>
            <section className={styles.cardsSection}>
                {cards.map((card, index) => (
                    <Card key={index} {...card} index={index} />
                ))}
            </section>
            <div className={styles.bottom}>

            </div>
        </div>
    )
}