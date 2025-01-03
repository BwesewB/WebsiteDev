import styles from '../logoSection/logoSection.module.css';
import gsap from 'gsap';
import { useEffect } from 'react';

export default function logoSection(){
    useEffect(() => {

        gsap.to("." + styles.onePixelDiv, {
          duration: 1,
          delay: 5.3,
          height: "3vw",
        });

        gsap.to("." + styles.websiteNameHeader, {
            duration: 1,
            delay: 5.6,
            x: "-6vw",
            ease:"power3"
        });
        
        gsap.to("." + styles.websiteJapanHeader, {
            duration: 1,
            delay: 5.6,
            x: "6vw",
            ease:"power3"
        });

      }, []);
    return(
        <>
            <div className={styles.logoSection}>
                <div className={styles.websiteName}>
                    <h5 className={styles.websiteNameHeader}>DOUGA</h5>
                </div>
                <div className={styles.onePixelDiv}></div>
                <div className={styles.websiteJapan}>
                    <h6 className={styles.websiteJapanHeader}>Japan</h6>
                </div>
            </div>
        </>
    )
}