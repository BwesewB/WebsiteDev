"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./navbar.module.css";
import Logo from "@/public/media/logo/Logo";
import ArrowRight from "@/public/icons/arrowRight";
import { useState, useRef, useEffect } from "react";
import { setupNavbarAnimations } from "./navbarAnimations";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import MobileNavbar from "../mobileNav/page";

gsap.registerPlugin(CustomEase);

CustomEase.create("rollingEase", "M0,0 C0.2,0.8 0.4,1.2 1,1");

export default function Navbar({ 
  navColor = "var(--blue)", 
  navBG = "", 
  textColor = "var(--white)" 
}) {

  // animation refs
  const hoverMenuRef = useRef(null);
  const menuWordRef = useRef(null);
  const navWordRef = useRef(null);
  const arrowOneRef = useRef(null);
  const arrowOneCircleRef = useRef(null);
  const arrowTwoRef = useRef(null);
  const arrowTwoCircleRef = useRef(null);
  const logoContainerRef = useRef(null);
  const textNavRef = useRef(null);


  
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const logo = logoContainerRef.current;
    gsap.timeline()
    .to(logo, 
      { 
        delay: 0.3,
        x: 30, 
        rotate: 30, 
        duration: 0.6, 
        ease: "rollingEase" 
      }
    )
    .to(logo, 
      { 
        x: 0, 
        rotate: 0, 
        duration: 0.3, 
        ease: "power1.out" 
      }
    );
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const linkContainers = document.querySelectorAll(`.${styles.linkContainer}`);

    gsap.timeline()
      gsap.to(arrowOneRef.current, 
        {
          delay:0.6,
          x:0,
          duration: 0.6, 
          ease: "back.out"
        }
      )

      gsap.to(hoverMenuRef.current,
        {
          x:0,
          duration: 0.9, 
          ease: "rollingEase",
        }
      )

      gsap.to(arrowOneCircleRef.current,
        {
          delay:0.2,
          scale:1,
          duration:0.6,
          ease: "power4.out"
        }
      )

      gsap.to(textNavRef.current,
        {
          delay:0.7,
          x:0,
          scale:1,
          width:"auto",
          duration: 0.6,
          ease: "power2.out"
        }
      )

      gsap.fromTo(menuWordRef.current,
        {
          y:50,
        },
        {
          y:0,
          delay:1,
          duration: 0.6,
          ease: "back.out"
        }
      )

    const { handleMouseEnter, handleMouseLeave } = setupNavbarAnimations(
      hoverMenuRef,
      menuWordRef,
      navWordRef,
      linkContainers,
      arrowOneRef,
      arrowOneCircleRef,
      arrowTwoRef,
      arrowTwoCircleRef,
    );

    const hoverMenu = hoverMenuRef.current;
    hoverMenu.addEventListener("mouseenter", handleMouseEnter);
    hoverMenu.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      hoverMenu.removeEventListener("mouseenter", handleMouseEnter);
      hoverMenu.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isMobile]);



  return (
    <nav className={styles.navbar} style={{ backgroundColor: navBG }}>
      <div className={styles.logoContainer} ref={logoContainerRef}>
        <Link href="/">
          <Logo color={navColor} />
        </Link>
      </div>

      {isMobile ? (
        <MobileNavbar navColor={navColor} textColor={textColor} />
      ) : (
        <div className={styles.hoverMenu} ref={hoverMenuRef}>
          {/* Arrow Two */}
          <div className={styles.arrowDivTwo} style={{ backgroundColor: navColor }} ref={arrowTwoCircleRef}>
            <div className={styles.arrowContainerTwo} ref={arrowTwoRef}>
              <ArrowRight color={textColor} width="auto" height="auto" />
            </div>
          </div>

          {/* Navigation Links */}
          <div className={styles.textNav} style={{ backgroundColor: navColor, color: textColor }} ref={textNavRef}>
            <div className={styles.menuWord}>
              <h4 ref={menuWordRef}>Menu</h4>
            </div>
            <ul className={styles.navPages} ref={navWordRef}>
              {["3d", "motion", "visual"].map((page) => (
                <li className={styles.linkContainer} key={page}>
                  <Link href={`/pages/${page}`}>
                    <h5>{page.toUpperCase()}</h5>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Arrow One */}
          <div className={styles.arrowDivOne} style={{ backgroundColor: navColor }} ref={arrowOneCircleRef}>
            <div className={styles.arrowContainerOne} ref={arrowOneRef}>
              <ArrowRight color={textColor} width="auto" height="auto" />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}