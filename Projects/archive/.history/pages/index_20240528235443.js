import styles from "@/styles/Home.module.css";
import HeadData from "@/components/HeadData";
import { gsap } from 'gsap';
import Image from "next/image";

export default function Home() {
  return (
    <>
      <HeadData title="Digital Archive" description="Created by Sebastian Fok. Media by Colin Chan"/>
      <main className={`${styles.main}`}>
        <div className={styles.landingSection}>
          <div className={styles.logoSection}>
            <div className={styles.websiteName}>
              <h5>DOUGA</h5>
            </div>
            <div className={styles.websiteJapan}>
              <h6>Japan</h6>
            </div>
          </div>
        </div>

      </main>
    </>
  );
}
