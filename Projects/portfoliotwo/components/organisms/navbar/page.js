"use client";

import { useAppTransition } from "@/app/utils/TransitionContext";
import { useTransitionRouter } from "next-view-transitions";
import Link from "next/link";
import styles from "./navbar.module.css";
import { useState, useEffect } from "react";
import MobileNavbar from "../mobileNav/page";
import { usePathname } from "next/navigation";

export default function Navbar({}) {
    const [isMobile, setIsMobile] = useState(false);
    const pathname = usePathname(); // 2. Get the current path
    const isHomePage = pathname === "/";
    const router = useTransitionRouter();
    const { startTransition } = useAppTransition();

    function slideInOut() {
        document.documentElement.animate(
            [
                {
                    opacity: 1,
                    // transform: "translateY(0)",
                    filter: "brightness(1)",
                },
                {
                    opacity: 0.2,
                    // transform: "translateY(-35%)",
                    filter: "brightness(0.2)",
                    offset: 1,
                }
            ], {
                duration: 2000,
                easing: "cubic-bezier(0.8, 0, 0.2, 1)",
                fill: "forwards",
                pseudoElement: "::view-transition-old(root)",
            }
        )

        // We only need to wait for the NEW content animation to finish
        const newContentAnimation = document.documentElement.animate(
            [
                {
                    clipPath: "inset(100% 0% 0% 0% round 30px)",
                    transform: "translateY(35%) scale(1.2)"
                },
                {
                    clipPath: "inset(0% 0% 0% 0% round 30px)",
                    transform: "translateY(0) scale(1)",
                    offset: 0.99,
                },
                {
                    clipPath: "inset(0% 0% 0% 0% round 0px)",
                    offset: 1,
                }
            ], {
                duration: 2000,
                easing: "cubic-bezier(0.87,0,0.13,1)",
                fill: "forwards",
                pseudoElement: "::view-transition-new(root)",
            }
        );
        
        return newContentAnimation; // 3. Return the animation object
    }


    // Effect to check screen size
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleNavClick = (e, href) => {
        e.preventDefault();
        console.log("A. [Navbar] Link clicked, calling startTransition for:", href);
        startTransition(href, slideInOut, 1400);
    };

    return (
        <>
            <nav className={styles.navbar}>
                <div>
                    { !isHomePage && (
                        <Link href="/" onClick={(e) => handleNavClick(e, "/")}>
                            <h5 className={styles.desktopNav} style={{fontSize:"1.2rem", textTransform: "lowercase" }}>
                                sebfok
                            </h5>
                        </Link>
                    )}
                </div>

                {isMobile ? (
                    <MobileNavbar />
                ) : (
                    <h5 className={styles.desktopNav}>
                        <Link href="/" onClick={(e) => handleNavClick(e, "/")}>
                            Home
                        </Link>
                        {/* <Link href="/about">About</Link> */}
                        <Link href="/works" onClick={(e) => handleNavClick(e, "/works")}>
                            Works
                        </Link>
                        <Link href="/gallery" onClick={(e) => handleNavClick(e, "/gallery")}>
                            Gallery
                        </Link>
                    </h5>
                )}
            </nav>
        </>

    );
}
