import { useState } from "react";
import gsap from "gsap";
import styles from "../Header/Header.module.css"

export default function Header(){

    return(
        <>
            <header className={styles.headerArea}>
                <div className={styles.home}>
                    <div className={styles.onePixelDivHorizontal}></div>
                    <h6 className={styles.headerNames}>home</h6>
                </div>
                <div className={styles.image}>
                    <div className={styles.onePixelDivHorizontal}></div>
                    <h6 className={styles.headerNames}>image</h6>
                </div>
                <div className={styles.video}>
                    <div className={styles.onePixelDivHorizontal}></div>
                    <h6 className={styles.headerNames}>video</h6>
                </div>
                <div className={styles.threeD}>
                    <div className={styles.onePixelDivHorizontal}></div>
                    <h6 className={styles.headerNames}>3d</h6>
                </div>
            </header>
        </>
    )
}