import styles from "@/styles/image.module.css";
import HeadData from "@/components/HeadData";
import gsap from 'gsap';
import { useEffect } from "react";
import Image from "next/image";
import LogoSection from "@/components/logoSection";
import LandingPreloader from "@/components/preloaders/landingPreloader";
import Header from "@/components/Header";

export default function Home() {
  useEffect(() => {
    gsap.to("." + styles.imageContainer1, {
      duration: 1.5,
      delay: 5,
      opacity: 1,
      ease:"power3"
    });
  }, []);

  return (
    <>
      <HeadData title="Digital Archive" description="Created by Sebastian Fok. Media by Colin Chan"/>
      <main className={`${styles.main}`}>
        <LandingPreloader/>
        <LogoSection/>
        <div className={styles.landingSection}>
          <div className={styles.imageContainer1}>
            <Image 
              src="/images/redsign.jpg"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
        <Header/>
        <div className={styles.heightTest}></div>
      </main>
    </>
  );
}
