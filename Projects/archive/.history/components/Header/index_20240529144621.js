import { useState, useEffect } from "react";
import gsap from "gsap";
import styles from "../Header/Header.module.css"

export default function Header(){

    useEffect(() => {
        gsap.to("." + styles.onePixelDivHorizontal, {
            duration: 1.5,
            delay: 7.5,
            width: 1,
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
                        <h6 className={styles.headerNames}>home</h6>
                    </div>
                    <div className={styles.buttonContainer}>
                        <div className={styles.onePixelDivHorizontal}></div>
                        <h6 className={styles.headerNames}>image</h6>
                    </div>
                    <div className={styles.buttonContainer}>
                        <div className={styles.onePixelDivHorizontal}></div>
                        <h6 className={styles.headerNames}>video</h6>
                    </div>
                    <div className={styles.buttonContainer}>
                        <div className={styles.onePixelDivHorizontal}></div>
                        <h6 className={styles.headerNames}>3d</h6>
                    </div>
                </div>
            </header>
        </>
    )
}