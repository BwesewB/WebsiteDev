import { useState, useEffect } from "react";
import gsap from "gsap";
import styles from "../Header/Header.module.css"
import Link from "next/link";

export default function Header({
    lineVert="6.5",
    headerNamesDelay="6.7",
    headerButtonDelay="6.9",
}){

    useEffect(() => {
        gsap.to("." + styles.onePixelDivHorizontal, {
            duration: 1.5,
            delay: {lineVert},
            //6.5
            width: "100%",
            stagger: {
                amount: 0.5,
            },
            ease: "expo.inOut"
        });

        gsap.to("." + styles.headerNames, {
            duration: 1.5,
            delay: {headerNamesDelay},
            //6.7
            x: "5rem",
            stagger: {
                amount: 0.5,
            },
            ease: "expo.inOut"
        });

        gsap.to("." + styles.buttonContainer, {
            duration: 1.5,
            delay: {headerButtonDelay},
            //6.9
            y: "-2rem",
            stagger: {
                amount: 0.5,
            },
            ease: "expo.inOut"
        });

    }, [])

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
                        <Link href='/image' className={styles.navigationLink}><h6 className={styles.headerNames}>image</h6></Link>
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