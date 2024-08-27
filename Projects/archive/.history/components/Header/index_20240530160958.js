import { useState, useEffect } from "react";
import gsap from "gsap";
import styles from "../Header/Header.module.css"
import Link from "next/link";
import Swup from "swup";
import { useRouter } from "next/router";

export default function Header({
    lineHoriz = 6.5,
    headerNamesDelay = 6.7,
    headerButtonDelay = 6.9,
}){

    const router = useRouter();

    useEffect(() => {
        gsap.to("." + styles.onePixelDivHorizontal, {
            duration: 1.5,
            delay: lineHoriz,
            width: "100%",
            stagger: {
                amount: 0.5,
            },
            ease: "expo.inOut"
        });

        gsap.to("." + styles.headerNames, {
            duration: 1.5,
            delay: headerNamesDelay,
            x: "5rem",
            stagger: {
                amount: 0.5,
            },
            ease: "expo.inOut"
        });

        gsap.to("." + styles.buttonContainer, {
            duration: 1.5,
            delay: headerButtonDelay,
            y: "-2rem",
            stagger: {
                amount: 0.5,
            },
            ease: "expo.inOut"
        });

    }, [])

    // const handleImageLinkClick = (e) => {
    //     e.preventDefault();
    //     const tl = gsap.timeline({
    //         onComplete: () => {
    //             setTimeout(() => {
    //                 router.push('/image');
    //             }, 2000); // Wait for 2 seconds before navigating
    //         }
    //     });

    //     tl.to("." + styles.headerArea, {
    //         duration: 1,
    //         opacity: 0,
    //         ease: "power1.inOut"
    //     });
    // };


    return(
        <>
            <header className={styles.headerArea}>
                <div className={styles.headerContainer}>
                    <div className={styles.buttonContainer}>
                        <div className={styles.onePixelDivHorizontal}></div>
                        <Link href='/' className={styles.navigationLink}><h6 className={styles.headerNames}>home</h6></Link>
                    </div>
                    <div className={styles.buttonContainer}>
                        <div className={styles.onePixelDivHorizontal}></div>
                        <Link href='/image' className={styles.navigationLink} onClick={handleImageLinkClick}><h6 className={styles.headerNames}>image</h6></Link>
                    </div>
                    <div className={styles.buttonContainer}>
                        <div className={styles.onePixelDivHorizontal}></div>
                        <Link href='' className={styles.navigationLink}><h6 className={styles.headerNames}>video</h6></Link>
                    </div>
                    <div className={styles.buttonContainer}>
                        <div className={styles.onePixelDivHorizontal}></div>
                        <Link href='' className={styles.navigationLink}><h6 className={styles.headerNames}>3d</h6></Link>
                    </div>
                </div>
            </header>
        </>
    )
}