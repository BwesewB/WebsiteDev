"use client";

import styles from "./pinSection.module.css";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const Card = ({ title, copy, src, backgroundColor }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardInner} style={{ backgroundColor }}>
        <div className={styles.cardContent}>
          <h1>{title}</h1>
          <p>{copy}</p>
        </div>
        <div className={styles.cardImg}>
          <img className={styles.img} src={src} alt={title} />
        </div>
      </div>
    </div>
  );
};

export default function PinSection({ cards }) {
  const container = useRef();

  useGSAP(() => {
    const cardsElements = gsap.utils.toArray(`.${styles.card}`);

    ScrollTrigger.create({
      trigger: cardsElements[0],
      start: "top 35%",
      endTrigger: cardsElements[cardsElements.length - 1],
      end: "top 30%",
      pin: `.${styles.hero}`,
      pinSpacing: false,
    //   markers:true
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
