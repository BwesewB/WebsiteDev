import styles from "@/styles/Home.module.css";
import HeadData from "@/components/HeadData";
import gsap from 'gsap';
import { useEffect } from "react";
import Image from "next/image";
import LogoSection from "@/components/logoSection";
import LandingPreloader from "@/components/preloaders/landingPreloader";
import Header from "@/components/Header";

export default function ImageSection() {
//   useEffect(() => {

//   }, []);

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
        {/* <div className={styles.imageContainerImage}>
            <Image 
              src="/images/corridor.jpg"
              layout="fill"
              objectFit="cover"
            />
        </div> */}
        {/* <Header/> */}
      </main>
    </>
  );
}
