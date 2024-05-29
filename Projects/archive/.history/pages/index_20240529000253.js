import styles from "@/styles/Home.module.css";
import HeadData from "@/components/HeadData";
import { gsap } from 'gsap';
import Image from "next/image";
import logoSection from "@/components/logoSection";

export default function Home() {
  return (
    <>
      <HeadData title="Digital Archive" description="Created by Sebastian Fok. Media by Colin Chan"/>
      <main className={`${styles.main}`}>
        <div className={styles.landingSection}>
          
          <div className={styles.imageContainer1}>
            <Image 
              src="/images/redsign.jpg"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>

      </main>
    </>
  );
}
