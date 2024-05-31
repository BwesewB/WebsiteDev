import styles from "@/styles/Home.module.css";
import HeadData from "@/components/HeadData";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useEffect } from "react";
import Image from "next/image";
import LogoSection from "@/components/logoSection";
import LandingPreloader from "@/components/preloaders/landingPreloader";
import Header from "@/components/Header";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function Home() {
  useEffect(() => {

    let smoother = ScrollSmoother.create({
      wrapper: '.main',
      content: '.smoothContent'
    })

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
        <div className={styles.smoothContent}>
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
        </div>
      </main>
    </>
  );
}
