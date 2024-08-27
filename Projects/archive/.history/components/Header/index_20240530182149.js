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
}) {

    const [textColor, setTextColor] = useState("var(--black)"); // Default text color
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

    useEffect(() => {
        // Check if current route is "/image" and update text color based on background contrast
        if (router.pathname === "/image") {
            setTextColor("var(--white)");
        } else {
            setTextColor("var(--black)");
        }
    }, [router.pathname]);

    return (
        <>
            <header className={styles.headerArea} style={{ backgroundColor: "var(--background-color)" }}>
                <div className={styles.headerContainer}>
                    <div className={styles.buttonContainer}>
                        <div className={styles.onePixelDivHorizontal} style={{ backgroundColor: "var(--background-color)" }}></div>
                        <Link href='/' className={styles.navigationLink}><h6 className={styles.headerNames} style={{ color: textColor }}>home</h6></Link>
                    </div>
                    <div className={styles.buttonContainer}>
                        <div className={styles.onePixelDivHorizontal} style={{ backgroundColor: "var(--background-color)" }}></div>
                        <Link href='/image' className={styles.navigationLink}><h6 className={styles.headerNames} style={{ color: textColor }}>image</h6></Link>
                    </div>
                    <div className={styles.buttonContainer}>
                        <div className={styles.onePixelDivHorizontal} style={{ backgroundColor: "var(--background-color)" }}></div>
                        <Link href='' className={styles.navigationLink}><h6 className={styles.headerNames} style={{ color: textColor }}>video</h6></Link>
                    </div>
                    <div className={styles.buttonContainer}>
                        <div className={styles.onePixelDivHorizontal} style={{ backgroundColor: "var(--background-color)" }}></div>
                        <Link href='' className={styles.navigationLink}><h6 className={styles.headerNames} style={{ color: textColor }}>3d</h6></Link>
                    </div>
                </div>
            </header>
        </>
    )
}