import styles from "@/styles/image.module.css";
import HeadData from "@/components/HeadData";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import LogoSection from "@/components/logoSection";
import Header from "@/components/Header";
import ImageAndText from "@/components/imagesPage/imageAndText";

gsap.registerPlugin(ScrollTrigger);

export default function ImageSection() {
    useEffect(() => {
        // Check if animations have already been played
        const animationsPlayed = sessionStorage.getItem('animationsPlayed');
    
        if (!animationsPlayed) {
            const timeline1 = gsap.timeline();
            const timeline2 = gsap.timeline();
    
            timeline1.fromTo(
                `.${styles.letters} > div`,
                {
                    y: "100%",
                    opacity: 0
                },
                {
                    y: "0%",
                    opacity: 1,
                    duration: 2,
                    ease: "power4.inOut",
                    stagger: 0.05,
                }
            )
            .to(
                `.${styles.letters} > div`,
                {
                    y: "-100%",
                    opacity: 0,
                    duration: 2,
                    ease: "power4.inOut",
                    stagger: 0.05,
                    delay: 1
                }
            );
    
            timeline2.fromTo(`.${styles.imageContainerImage}`, {
                clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
    
            }, {
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                opacity: 1,
                delay: 4,
                duration: 1.5, // Animation duration
                ease: "power4.inOut" // Easing function
            });
    
            // Mark animations as played
            sessionStorage.setItem('animationsPlayed', 'true');
        }
    }, []);

  return (
    <>
      <HeadData title="image" description="Gallery by Colin Chan"/>
      <main className={`${styles.main}`}>
        <LogoSection animate={true} lineVert={4.3} headerDelay={4.6}/>
        <div className={styles.header}>
            <div className={styles.letters}>
                <div>E</div>
                <div>X</div>
                <div>P</div>
                <div>O</div>
                <div>S</div>
                <div>U</div>
                <div>R</div>
                <div>E</div>
                <div>S</div>
            </div>
        </div>
        <div className={styles.imageContainerImage}>
            <Image 
                className={styles.actualImage}
                src="/images/corridor.jpg"
                layout="fill"
                objectFit="cover"
            />
        </div>
        <div className={styles.heighter}></div>
        <div className={styles.marginular}>
            <Header
                lineHoriz = {5.5}
                headerNamesDelay = {5.7}
                headerButtonDelay = {5.9}
                primaryColor={primaryColor}
            />
        </div>
        <div className={styles.imageContent}>
            <ImageAndText imageLink="/images/mandarinHw.jpg" width="45rem" height="30rem" alt=""/>
        </div>



      </main>
    </>
  );
}