import { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import gsap from "gsap";
import Link from "next/link";
import PageTransition from "@/components/BarAnimation";
import styles from "../Header/Header.module.css";

export default function Header({
    lineHoriz = 6.5,
    headerNamesDelay = 6.7,
    headerButtonDelay = 6.9,
    primaryColor = "var(--black)"
}){

    const [isAnimating, setIsAnimating] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false); // Add a state to track if animation has occurred
    const router = useRouter();

    useEffect(() => {
        if (router.pathname === '/video' && isAnimating) {
            // Ensure animation runs once
            if (!hasAnimated) {
                setHasAnimated(true);
            }
        }
    }, [isAnimating, router.pathname, hasAnimated]);

    useEffect(() => {
        if (isAnimating) {
            // Wait for the animation duration plus delay before navigating
            const timer = setTimeout(() => {
                if (router.pathname !== '/video') {
                    router.push('/video');
                }
            }, 1500); // 1.5 seconds delay

            // Clean up timer on component unmount
            return () => clearTimeout(timer);
        }
    }, [isAnimating, router.pathname]);

    const handleClick = () => {
        if (!isAnimating) {
            setIsAnimating(true);
        }
    };

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
                        <Link href='/video' className={styles.navigationLink}><h6 className={styles.headerNames} style={{ color: primaryColor}}>video</h6></Link>
                    </div>
                    <div className={styles.buttonContainer}>
                        <div className={styles.onePixelDivHorizontal} style={{ backgroundColor: primaryColor}}></div>
                        <Link href='' className={styles.navigationLink}><h6 className={styles.headerNames} style={{ color: primaryColor}}>3d</h6></Link>
                    </div>
                </div>
            </header>
            <PageTransition isAnimating={isAnimating} />
        </>
    )
}

// onClick={() => handleClick('/video')}