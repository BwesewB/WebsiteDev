import styles from "@/styles/image.module.css";
import HeadData from "@/components/HeadData";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useEffect } from "react";
import Image from "next/image";
import LogoSection from "@/components/logoSection";
import LandingPreloader from "@/components/preloaders/landingPreloader";
import Header from "@/components/Header";

gsap.registerPlugin(ScrollTrigger);

export default function ImageSection() {
    useEffect(() => {
        // Ensure the DOM is fully loaded
        document.addEventListener("DOMContentLoaded", function() {
            const bodyHeight = window.innerHeight;
            document.body.style.height = `${bodyHeight}px`;
        });

        ScrollTrigger.create({
            trigger: ".webContent",
            start: "-0.1% top",
            end: "bottom bottom",
            onEnter: () => {
                gsap.set(".webContent", { position: 'absolute', top: '195%' });
            },
            onLeaveBack: () => {
                gsap.set(".webContent", { position: 'fixed', top: '0' });
            }
        });

        gsap.to(`.${styles.header} .${styles.letters}:first-child div`, {
            x: () => -window.innerWidth * 3,
            scale: 10,
            ease: "power2.inOut",
            scrollTrigger: {
                start: "top top",
                end: `+=200%`,
                scrub: 1,
            }
        });

        gsap.to(`.${styles.header} .${styles.letters}:last-child div`, {
            x: () => window.innerWidth * 3,
            scale: 10,
            ease: "power2.inOut",
            scrollTrigger: {
                start: "top top",
                end: `+=200%`,
                scrub: 1,
            }
        });
    }, []);

  return (
    <>
      <HeadData title="images" description="Gallery by Colin Chan"/>
      <main className={`${styles.main}`}>
        <LogoSection animate={false}/>
        <div className={styles.header}>
            <div className={styles.letters}>
                <div>E</div>
                <div>X</div>
                <div>P</div>
            </div>
            <div className={styles.letters}>
                <div>O</div>
                <div>S</div>
                <div>U</div>
                <div>R</div>
                <div>E</div>
                <div>S</div>
            </div>
        </div>

        <div className={styles.webContent}>
            <div className={styles.imageContainerImage}>
                <Image 
                    className={styles.actualImage}
                src="/images/corridor.jpg"
                layout="fill"
                objectFit="cover"
                />
            </div>
        </div>
        <div className={styles.contentHolder}>
        {/* <Header/> */}
        </div>

      </main>
    </>
  );
}
