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

    // const [isAnimating, setIsAnimating] = useState(false);
    // const handleClick = () => {
    //     setIsAnimating(true);
    // };

    const [isAnimating, setIsAnimating] = useState(false);
    const router = useRouter();

    const handleClick = (href) => {
        setIsAnimating(true);

        // Delay navigation to match the animation duration
        setTimeout(() => {
            router.push(href);
        }, 1500); // Ensure this delay matches your animation duration
    };

    useEffect(() => {
        // This will run every time `isAnimating` changes
        if (isAnimating) {
            console.log("Starting animation");

            gsap.to("." + styles.bar, {
                duration: 1.5,
                height: 0,
                stagger: {
                    amount: 0.5,
                },
                ease: "power1.inOut"
            });

            gsap.to("." + styles.overlay, {
                delay: 1.5,
                opacity: 0,
                onComplete: () => {
                    setIsAnimating(false);
                    console.log("Animation completed");
                }
            });
        }
    }, [isAnimating]);

    useEffect(() => {
        // This runs once when the component mounts
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

    }, []);

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
                        <Link href='/video' onClick={() => handleClick('/video')} className={styles.navigationLink}><h6 className={styles.headerNames} style={{ color: primaryColor}}>video</h6></Link>
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