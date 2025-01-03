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
        gsap.fromTo(`.${styles.letters} > div`, 
            {
                y: "100%",
                opacity: 0
            },
            {
                y: "0%",
                opacity: 1,
                duration: 0.5,
                ease: "expo.out",
                stagger: 0.2,
            }
        );
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
