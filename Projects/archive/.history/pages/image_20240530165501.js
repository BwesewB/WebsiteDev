import styles from "@/styles/image.module.css";
import HeadData from "@/components/HeadData";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import LogoSection from "@/components/logoSection";
import Header from "@/components/Header";

gsap.registerPlugin(ScrollTrigger);

export default function ImageSection() {
    useEffect(() => {
        const timeline1 = gsap.timeline();
        timeline1.fromTo(
            `.${styles.letters} > div`,
            {
                y: "100%",
                opacity: 1 // Set opacity to 1 to use it as a mask
            },
            {
                y: "0%",
                opacity: 1, // Fade out the text to reveal the image
                duration: 2,
                ease: "power4.inOut",
                stagger: 0.05,
            }
        );

        // Animate the image to zoom in and replace the text
        gsap.to(`.${styles.actualImage}`, {
            scale: 2, // Zoom in by a factor of 2
            opacity: 1, // Make the image fully visible
            duration: 2, // Animation duration
            ease: "power4.inOut", // Easing function
            delay: 2.5 // Delay the image animation to start after the text animation
        });

    }, []);

  return (
    <>
      <HeadData title="images" description="Gallery by Colin Chan"/>
      <main className={`${styles.main}`}>
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

        <div className={styles.webContent}>
            <LogoSection animate={false}/>
            <div className={styles.imageContainerImage}>
                <Image 
                className={styles.actualImage}
                src="/images/corridor.jpg"
                layout="fill"
                objectFit="cover"
                />
            </div>
        </div>

      </main>
    </>
  );
}
