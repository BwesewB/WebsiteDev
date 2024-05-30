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
        <LogoSection lineVert={0} headerDelay={0}/>

        <Header/>
      </main>
    </>
  );
}
