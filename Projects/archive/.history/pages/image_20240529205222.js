import styles from "@/styles/image.module.css";
import HeadData from "@/components/HeadData";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useEffect } from "react";
import Image from "next/image";
import LogoSection from "@/components/logoSection";
import Header from "@/components/Header";

gsap.registerPlugin(ScrollTrigger);

export default function ImageSection() {
    useEffect(() => {
        // Ensure the DOM is fully loaded
        document.addEventListener("DOMContentLoaded", function() {
            const contentHolderHeight = document.querySelector(".contentHolder").offsetHeight;
            const additionalHeight = window.innerHeight;
            const bodyHeight = additionalHeight + contentHolderHeight;
            document.body.style.height = `${bodyHeight}px`;
        });

        ScrollTrigger.create({
            trigger: `.${styles.webContent}`,
            start: "-0.1% top",
            end: "bottom bottom",
            onEnter: () => {
                gsap.set(`.${styles.webContent}`, { position: 'absolute', top: '195%' });
            },
            onLeaveBack: () => {
                gsap.set(`.${styles.webContent}`, { position: 'fixed', top: '0' });
            }
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: `.${styles.header}`,
                start: "top top",
                end: "bottom top",
                scrub: true,
                pin: true,
                markers: true,
                onLeave: () => {
                    // Allow scrolling of the rest of the content
                    ScrollTrigger.create({
                        trigger: `.${styles.webContent}`,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: true,
                        pin: true,
                    });
                },
            }
        });

        // Animate the first set of letters
        tl.to(`.${styles.header} .${styles.letters}:first-child div`, {
            x: () => -window.innerWidth * 3,
            scale: 10,
            ease: "power2.inOut",
        });

        // Animate the second set of letters
        tl.to(`.${styles.header} .${styles.letters}:last-child div`, {
            x: () => window.innerWidth * 3,
            scale: 10,
            ease: "power2.inOut",
        }, "-=1.5"); // Overlap with the previous animation

        // Animate the clip-path and scale of the image
        gsap.to(`.${styles.imageContainerImage}`, {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            ease: "power2.inOut",
            scrollTrigger: {
                start: "top top",
                end: `+=200%`,
                scrub: 1
            }
        });

        gsap.to(`.${styles.actualImage}`, {
            scale: 1,
            ease: "power2.inOut",
            scrollTrigger: {
                start: "top top",
                end: `+=200%`,
                scrub: 1
            }
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
        <div className={styles.contentHolder}>
            <div>hihiwahiwahi</div>
        {/* <Header/> */}
        </div>

      </main>
    </>
  );
}
