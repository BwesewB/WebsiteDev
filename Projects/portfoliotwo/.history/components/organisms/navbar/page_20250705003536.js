"use client";

import Link from "next/link";
import styles from "./navbar.module.css";
import { useState, useEffect } from "react";
import MobileNavbar from "../mobileNav/page";
import StickyContainer from "@/components/atoms/stickyContainer/page";

export default function Navbar({}) {
    const [isMobile, setIsMobile] = useState(false);


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
                    <Link href="/">
                        <h5 className={styles.desktopNav}>sebfok</h5>
                    </Link>
                </div>

                {isMobile ? (
                    <MobileNavbar />
                ) : (
                    <h5 className={styles.desktopNav}>
                        <Link href="/">Home</Link>
                        <Link href="/about">About</Link>
                        <Link href="/works">Works</Link>
                        <Link href="/gallery">Gallery</Link>
                    </h5>
                )}
            </nav>
        </>

    );
}
