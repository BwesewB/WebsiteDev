"use client";

import Link from "next/link";
import styles from "./navbar.module.css";
import { useState, useEffect } from "react";
import MobileNavbar from "../mobileNav/page";
import BleedText from "@/components/atoms/inkBleedFilter/bleedText";

// A simple SVG logo component for demonstration
const Logo = ({ color }) => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill={color}>
        <circle cx="20" cy="20" r="18" stroke={color} strokeWidth="2" fill="none" />
        <text x="50%" y="55%" textAnchor="middle" fill={color} fontSize="18px" fontFamily="Arial">L</text>
    </svg>
);

export default function Navbar({ 
    navColor = "var(--white)", 
    textColor = "var(--black)" 
}) {
    const [isMobile, setIsMobile] = useState(false);

    // Effect to check screen size
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        
        // Check on initial load
        handleResize();
        
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <nav className={styles.navbar}>
            <div className={styles.logoContainer}>
                <Link href="/">

                </Link>
            </div>

            {isMobile ? (
                <MobileNavbar />
            ) : (
                <h5 className={styles.desktopNav}>
                    <BleedText>
                        <Link href="/">Home</Link>
                    </BleedText>
                    <Link href="/about">About</Link>
                    <Link href="/works">Works</Link>
                    <Link href="/gallery">Gallery</Link>
                </h5>
            )}
        </nav>
    );
}
