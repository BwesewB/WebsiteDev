"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import ArrowRight from "@/app/components/uiComponents/arrowRight.jsx";
import styles from "./mobileNav.module.css";
import dynamic from "next/dynamic";

gsap.registerPlugin(CustomEase);

CustomEase.create("rollingEase", "M0,0 C0.2,0.8 0.4,1.2 1,1");

const MobileNavbar = ({ navColor, textColor }) => {
  const [isActive, setIsActive] = useState(false);

  const arrowMobileCircleRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const mobileNavBackgroundWrapRef = useRef(null);

  const handleArrowClick = () => {
    setIsActive((prevState) => !prevState);

    if (!isActive) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = "auto"; // Enable scrolling again
    }

    if (isActive) {
      gsap.to(arrowMobileCircleRef.current, {
        rotate: 0,
        duration: 0.4,
        ease: "back.inOut",
      });

      gsap.to(mobileNavBackgroundWrapRef.current, {
        height: "0",
        width: "0",
        borderBottomLeftRadius: "100%",
        borderBottomRightRadius: "100%",
        borderTopLeftRadius: "100%",
        transformOrigin: "top right",
        duration: 0.6,
        ease: "power1.inOut",
      });
    } else {
      gsap.to(arrowMobileCircleRef.current, {
        rotate: 180,
        duration: 0.4,
        ease: "back.inOut",
      });

      gsap.to(mobileNavBackgroundWrapRef.current, {
        height: "200vh",
        width: "200vh",
        borderBottomLeftRadius: "0%",
        borderBottomRightRadius: "0%",
        borderTopLeftRadius: "0%",
        transformOrigin: "top right",
        duration: 0.6,
        ease: "power1.inOut",
      });
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.to(mobileMenuRef.current, {
        margin: "var(--sideSpacing)",
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
    }
  }, []);

  return (
    <div className={styles.mobileNav} ref={mobileMenuRef} style={{ backgroundColor: navColor }}>
      <div className={styles.arrowDivMobile} ref={arrowMobileCircleRef} onClick={handleArrowClick}>
        <div className={styles.arrowMobileContainer}>
          <ArrowRight color={textColor} width="auto" height="auto" />
        </div>
      </div>

      <div className={styles.mobileNavBackgroundWrap} ref={mobileNavBackgroundWrapRef} style={{ backgroundColor: navColor }} />
    </div>
  );
};

export default dynamic(() => Promise.resolve(MobileNavbar), { ssr: false });