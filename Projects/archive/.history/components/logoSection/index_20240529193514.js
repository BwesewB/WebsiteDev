import styles from '../logoSection/logoSection.module.css';
import gsap from 'gsap';
import { useEffect } from 'react';

export default function logoSection({
    lineVert = 5.3,
    headerDelay = 5.6,
}){
    useEffect(() => {

        gsap.to("." + styles.onePixelDiv, {
          duration: 1,
          delay: lineVert,
          height: "3vw",
        });

        gsap.to("." + styles.websiteNameHeader, {
            duration: 2,
            delay: headerDelay,
            x: "-8rem",
            ease:"expo.inOut"
        });
        
        gsap.to("." + styles.websiteJapanHeader, {
            duration: 2,
            delay: headerDelay,
            x: "8rem",
            ease:"expo.inOut"
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