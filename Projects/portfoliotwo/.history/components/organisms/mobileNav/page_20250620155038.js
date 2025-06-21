"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import styles from './mobileNavbar.module.css';

export default function MobileNavbar() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    // GSAP Animation to slide the menu in and out
    useEffect(() => {
        if (isOpen) {
            gsap.to(menuRef.current, { 
                x: 0, 
                duration: 0.5, 
                ease: 'power3.out' 
            });
        } else {
            gsap.to(menuRef.current, { 
                x: '100%', 
                duration: 0.5, 
                ease: 'power3.in' 
            });
        }
    }, [isOpen]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* The menu icon (a simple black circle) */}
            <button 
                className={styles.menuIcon} 
                onClick={toggleMenu}
                aria-label="Toggle menu"
            />

            {/* The off-screen menu panel */}
            <div className={styles.menuPanel} ref={menuRef}>
                <nav className={styles.navLinks}>
                    <Link href="/" onClick={toggleMenu}>Home</Link>
                    <Link href="/about" onClick={toggleMenu}>About</Link>
                    <Link href="/works" onClick={toggleMenu}>Works</Link>
                    <Link href="/gallery" onClick={toggleMenu}>Gallery</Link>
                </nav>
            </div>
        </>
    );
}
