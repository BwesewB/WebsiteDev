"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import ArrowRight from "@/public/icons/arrowRight";
import styles from "./mobileNav.module.css";

gsap.registerPlugin(CustomEase);

CustomEase.create("rollingEase", "M0,0 C0.2,0.8 0.4,1.2 1,1");

export default function MobileNavbar({ navColor, textColor }) {
  const [isActive, setIsActive] = useState(false);

  const arrowMobileRef = useRef(null);
  const arrowMobileCircleRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const handleArrowClick = () => {
    const mobileMenuCircle = arrowMobileCircleRef.current;
    const mobileMenu = mobileMenuRef.current;

    setIsActive((prevState) => !prevState);

    if (isActive) {
      gsap.to(mobileMenuCircle, {
        borderRadius: "100%", 
        duration: 0.6,
        ease: "power4.inOut",
      });

      gsap.to(mobileMenu, {
        width: "auto",
        height: "60px",
        borderRadius: "100%",
        transformOrigin: "top right",
        duration: 0.6,
        ease: "power4.inOut",
        padding: 0,
        margin: "var(--sideSpacing)",
      });
    } else {
      gsap.to(mobileMenuCircle, {
        borderRadius: "0%",
        duration: 0.6,
        ease: "power4.inOut",
      });

      gsap.to(mobileMenu, {
        top: 0,
        right: 0,
        height: "calc(100vh)",
        width: "calc(100vw)",
        borderRadius: "0%",
        transformOrigin: "top right",
        duration: 0.6,
        ease: "power4.inOut",
        margin: 0,
        border: "1px solid red",
        onComplete: () => {
          gsap.to(mobileMenu, {
            padding: "var(--sideSpacing)",
            duration: 0.6,
            ease: "power4.out",
          });
        },
      });
    }
  };

  useEffect(() => {
    gsap.to(mobileMenuRef.current, {
      x: 0,
      duration: 0.9,
      scale: 1,
      ease: "rollingEase",
    });

    gsap.to(arrowMobileCircleRef.current, {
      scale: 1,
      duration: 0.6,
      ease: "power4.out",
    });
  }, []);

  return (
    <div className={styles.mobileNav} ref={mobileMenuRef} style={{ backgroundColor: navColor }}>
      <div className={styles.arrowDivMobile} ref={arrowMobileCircleRef} onClick={handleArrowClick}>
        <div className={styles.arrowMobileContainer} ref={arrowMobileRef} style={{ transform: "rotate(180deg)" }}>
          <ArrowRight color={textColor} width="auto" height="auto" />
        </div>
      </div>
    </div>
  );
}
