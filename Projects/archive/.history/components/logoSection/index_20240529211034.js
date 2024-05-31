import styles from '../logoSection/logoSection.module.css';
import gsap from 'gsap';
import { useEffect } from 'react';

export default function logoSection({
    lineVert = 5.3,
    headerDelay = 5.6,
    animate = true,
}){
    useEffect(() => {
        if (animate) {
            gsap.to("." + styles.onePixelDiv, {
                duration: 0.5,
                delay: lineVert,
                height: "3vw",
            });

            gsap.to("." + styles.websiteNameHeader, {
                duration: 2,
                delay: headerDelay,
                x: "-8rem",
                ease: "expo.inOut"
            });

            gsap.to("." + styles.websiteJapanHeader, {
                duration: 2,
                delay: headerDelay,
                x: "8rem",
                ease: "expo.inOut"
            });
        }  else {
            // Instantly apply the final state without animation
            gsap.set("." + styles.onePixelDiv, {
                height: "3vw",
            });

            gsap.set("." + styles.websiteNameHeader, {
                x: "-8rem",
            });

            gsap.set("." + styles.websiteJapanHeader, {
                x: "8rem",
            });
        }
    }, [animate, lineVert, headerDelay]);
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