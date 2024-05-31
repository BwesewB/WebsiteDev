import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "../Header/Header.module.css"
import Link from "next/link";
import { useRouter } from "next/router";

export default function Header({
    lineHoriz = 6.5,
    headerNamesDelay = 6.7,
    headerButtonDelay = 6.9,
}){

    const [primaryColor, setprimaryColor] = useState();
    const headerRef = useRef(null);
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
        const headerElement = headerRef.current;
        if (!headerElement) return;

        const bgColor = window.getComputedStyle(headerElement).getPropertyValue("background-color");
        const luminance = getLuminance(bgColor);

        // If the background is light, set text color to black, otherwise set to white
        setprimaryColor(luminance > 0.5 ? "var(--black)" : "var(--white)");
    }, [router.pathname]);

    // Function to calculate the luminance of a color
    const getLuminance = (color) => {
        const rgb = color.match(/\d+/g);
        const luminance = (0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]) / 255;
        return luminance;
    };

    return(
        <>
            <header className={styles.headerArea} >
                <div className={styles.headerContainer}>
                    <div className={styles.buttonContainer}>
                        <div className={styles.onePixelDivHorizontal} style={{ backgroundColor: primaryColor}}></div>
                        <Link href='/' className={styles.navigationLink}><h6 className={styles.headerNames} style={{ color: primaryColor}}>home</h6></Link>
                    </div>
                    <div className={styles.buttonContainer}>
                        <div className={styles.onePixelDivHorizontal} style={{ backgroundColor: primaryColor}}></div>
                        <Link href='/image' className={styles.navigationLink}><h6 className={styles.headerNames} style={{ color: primaryColor}}>image</h6></Link> 
                    </div>
                    <div className={styles.buttonContainer}>
                        <div className={styles.onePixelDivHorizontal} style={{ backgroundColor: primaryColor}}></div>
                        <Link href='' className={styles.navigationLink}><h6 className={styles.headerNames} style={{ color: primaryColor}}>video</h6></Link>
                    </div>
                    <div className={styles.buttonContainer}>
                        <div className={styles.onePixelDivHorizontal} style={{ backgroundColor: primaryColor}}></div>
                        <Link href='' className={styles.navigationLink}><h6 className={styles.headerNames} style={{ color: primaryColor}}>3d</h6></Link>
                    </div>
                </div>
            </header>
        </>
    )
}

// useEffect(() => {
//     // Check if current route is "/image" and update colors accordingly
//     if (router.pathname === "/image") {
//         setPrimaryColor("var(--white)");
//     } else {
//         setPrimaryColor("var(--black)");
//     }
// }, [router.pathname]);