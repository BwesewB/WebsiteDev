"use client"

import Link from "next/link";
import Image from "next/image";
import styles from "./navbar.module.css";
import Logo from "@/public/media/logo/Logo";
import ArrowRight from "@/public/icons/arrowRight";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

export default function Navbar({
  navColor = "var(--blue)",
  navBG = "",
  textColor = "var(--white)"
}) {
  const hoverMenuRef = useRef(null);
  const menuWordRef = useRef(null)
  const navWordRef = useRef(null)

  const arrowOneRef = useRef(null);
  const arrowOneCircleRef = useRef(null);

  const arrowTwoRef = useRef(null);
  const arrowTwoCircleRef = useRef(null);

  useEffect(() => {
    const hoverMenu = hoverMenuRef.current;
    const menuWord = menuWordRef.current;
    const navWord = navWordRef.current;


    const arrowOne = arrowOneRef.current;
    const arrowOneCircle = arrowOneCircleRef.current

    const arrowTwo = arrowTwoRef.current;
    const arrowTwoCircle = arrowTwoCircleRef.current

    const handleMouseEnter = () => {

      gsap.to(navWord, {

      })

      gsap.to(arrowOne, { 
        x: -50, 
        opacity: 1, 
        duration: 0.3, 
        ease: "expoScale" 
      });

      gsap.to(arrowOneCircle, { 
        width: 0,
        height: 0, 
        opacity: 1, 
        duration: 0.3, 
        ease: "expoScale" 
      });

      gsap.to(arrowTwo, { 
        x: 0, 
        opacity: 1, 
        duration: 0.3, 
        ease: "expoScale" 
      });

      gsap.to(arrowTwoCircle, { 
        width: "60px",
        height: "60px", 
        opacity: 1, 
        duration: 0.3, 
        ease: "expoScale" 
      });
    };

    const handleMouseLeave = () => {
      gsap.to(arrowOne, { 
        x: 0, 
        opacity: 1, 
        duration: 0.3, 
        ease: "power2.in" 
      });

      gsap.to(arrowOneCircle, { 
        width: "60px",
        height: "60px", 
        opacity: 1, 
        duration: 0.3, 
        ease: "expoScale" 
      });

      gsap.to(arrowTwo, { 
        x: 40, 
        opacity: 1, 
        duration: 0.3, 
        ease: "expoScale" 
      });

      gsap.to(arrowTwoCircle, { 
        width: 0,
        height: 0, 
        opacity: 1, 
        duration: 0.3, 
        ease: "expoScale" 
      });
    };

    hoverMenu.addEventListener("mouseenter", handleMouseEnter);
    hoverMenu.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      hoverMenu.removeEventListener("mouseenter", handleMouseEnter);
      hoverMenu.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    // <div className={styles.fullWithNavbar}>
      <nav className={styles.navbar} style={{ backgroundColor: navBG}}>
        <div className={styles.logoContainer}>
          <Link href="/">
            <Logo color={navColor} />
          </Link>
        </div>

        <div className={styles.hoverMenu} ref={hoverMenuRef}>
          <div className={styles.arrowDivTwo} style={{backgroundColor: navColor}} ref={arrowTwoCircleRef}>
            <div className={styles.arrowContainerTwo} ref={arrowTwoRef}>
              <ArrowRight color={textColor} width="auto" height="auto"/>
            </div>
          </div>

          <div className={styles.textNav} style={{backgroundColor: navColor, color: textColor}}>
            <h4 ref={menuWordRef}>Menu</h4>
            <ul className={styles.navPages} ref={navWordRef}>
              <li className={styles.linkContainer}>
                <Link href="/pages/3d"><h5>3D</h5></Link>
              </li>
              <li className={styles.linkContainer}>
                <Link href="/pages/motion"><h5>MOTION</h5></Link>
              </li>
              <li className={styles.linkContainer}>
                <Link href="/pages/visual"><h5>VISUAL</h5></Link>
              </li>
              <li className={styles.linkContainer}>
                <Link href="/pages/teamwork"><h5>TEAMWORK</h5></Link>
              </li>
            </ul>
          </div>

          <div className={styles.arrowDivOne} style={{backgroundColor: navColor}} ref={arrowOneCircleRef}>
            <div className={styles.arrowContainerOne} ref={arrowOneRef}>
              <ArrowRight color={textColor} width="auto" height="auto"/>
            </div>
          </div>
        </div>

        {/* <ul className={styles.navPages} style={{ color: navColor }}>
          <li className={styles.linkContainer}>
            <Link href="/pages/3d">3D</Link>
          </li>
          <li className={styles.linkContainer}>
            <Link href="/pages/motion">MOTION</Link>
          </li>
          <li className={styles.linkContainer}>
            <Link href="/pages/visual">VISUAL</Link>
          </li>
          <li className={styles.linkContainer}>
            <Link href="/pages/teamwork">TEAMWORK</Link>
          </li>
        </ul> */}
      </nav>
    // </div>
  );
}



