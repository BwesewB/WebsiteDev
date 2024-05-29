import { useState } from "react";
import gsap from "gsap";
import styles from "../Header/Header.module.css"

export default function Header(){

    useEffect(() => {
        const header = document.querySelector(`.${styles.headerArea}`);
        const parent = header.parentElement;
        const stickyPoint = parent.offsetTop + header.offsetTop;

        const handleScroll = () => {
            if (window.scrollY > stickyPoint) {
                header.classList.add(styles.sticky);
                parent.style.paddingTop = `${header.offsetHeight}px`; // Prevent layout shift
            } else {
                header.classList.remove(styles.sticky);
                parent.style.paddingTop = 0;
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);


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