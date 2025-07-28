"use client";

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

    function slideInOut() {
        document.documentElement.animate(
            [
                {
                    opacity: 1,
                    transform: "translateY(0)"
                },
                {
                    opacity: 0.2,
                    transform: "translateY(-35%)"
                }
            ], {
                duration: 1500,
                easing: "cubic-bezier(0.8, 0, 0.2, 1)",
                fill: "forwards",
                pseudoElement: "::view-transition-old(root)",
            }
        )
        document.documentElement.animate(
            [
                {
                    clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%",
                },
                {
                    clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%",
                },
            ], {
                duration: 1500,
                easing: "cubic-bezier(0.87,0,0.13,1)",
                fill: "forwards",
                pseudoElement: "::view-transition-new(root)",
            }
        )
    }


    // Effect to check screen size
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            <nav className={styles.navbar}>
                <div>
                    { !isHomePage && (
                        <Link href="/">
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
                        <Link 
                            href="/"
                            onClick={(e) => {
                                e.preventDefault();
                                router.push("/", {
                                    onTransitionReady: slideInOut,
                                })
                            }}
                        >
                            Home
                        </Link>
                        {/* <Link href="/about">About</Link> */}
                        <Link 
                            href="/works"
                            onClick={(e) => {
                                e.preventDefault();
                                router.push("/works", {
                                    onTransitionReady: slideInOut,
                                })
                            }}
                        >
                            Works
                        </Link>
                        <Link 
                            href="/gallery"
                            onClick={(e) => {
                                e.preventDefault();
                                router.push("/gallery", {
                                    onTransitionReady: slideInOut,
                                })
                            }}
                        >
                            Gallery
                        </Link>
                    </h5>
                )}
            </nav>
        </>

    );
}
