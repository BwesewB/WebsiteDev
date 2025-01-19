import styles from '../logoSection/logoSection.module.css';
import gsap from 'gsap';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function logoSection({
    lineVert = 5.3,
    headerDelay = 5.6,
    animate = true,
}){
    const router = useRouter();
    const [bgColor, setBgColor] = useState();
    const [primaryColor, setPrimaryColor] = useState();

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

    useEffect(() => {
        if (router.pathname === "/image") {
            setBgColor("var(--white)");
            setPrimaryColor("var(--white)");
        } else {
            setBgColor("var(--black)");
            setPrimaryColor("var(--black)");
        }
    }, [router.pathname]);

    return(
        <>
            <div className={styles.logoSection}>
                <div className={styles.websiteName}>
                    <h5 className={styles.websiteNameHeader} style={{ color: primaryColor}}>DOUGA</h5>
                </div>
                <div className={styles.onePixelDiv} style={{ backgroundColor: bgColor}}></div>
                <div className={styles.websiteJapan}>
                    <h6 className={styles.websiteJapanHeader} style={{ color: primaryColor}}>Japan</h6>
                </div>
            </div>
        </>
    )
}