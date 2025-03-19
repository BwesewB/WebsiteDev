"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import ArrowRight from "@/app/components/uiComponents/arrowRight.jsx";
import styles from "./mobileNav.module.css";
import dynamic from "next/dynamic";
import Link from "next/link";

gsap.registerPlugin(CustomEase);

CustomEase.create("rollingEase", "M0,0 C0.2,0.8 0.4,1.2 1,1");

const MobileNavbar = ({ navColor, textColor }) => {
  const [isActive, setIsActive] = useState(false);

  const arrowMobileCircleRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const mobileNavBackgroundWrapRef = useRef(null);
  const navWordRef = useRef(null);

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
        height: 0,
        width: 0,
        borderBottomLeftRadius: "100%",
        borderBottomRightRadius: "100%",
        borderTopLeftRadius: "100%",
        transformOrigin: "top right",
        duration: 0.6,
        ease: "power1.inOut",
        // padding: "0",
      });

      gsap.to(navWordRef.current.children, {
        y: 50,
        opacity: 0,
        duration: 0.6,
        ease: "power1.inOut",
        stagger: 0.1,
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
        // padding: "var(--sideSpacing)",
      });

      gsap.to(
        navWordRef.current.children,
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power1.out",
          stagger: 0.1,
        }
      );
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.to(mobileMenuRef.current, {
        x: 0,
        duration: 0.9,
        scale: 1,
        ease: "rollingEase",
      });

      gsap.to(arrowMobileCircleRef.current, {
        scale: 1,
        duration: 1,
        ease: "back.inOut",
        rotate: 0,
      });

      gsap.set(navWordRef.current.children, { y: 50, opacity: 0 });
    }
  }, []);

  return (
    <div className={styles.mobileNav} ref={mobileMenuRef} style={{ backgroundColor: navColor }}>
      <div className={styles.arrowDivMobile} ref={arrowMobileCircleRef} onClick={handleArrowClick}>
        <div className={styles.arrowMobileContainer}>
          <ArrowRight color={textColor} width="25px" height="25px" />
        </div>
      </div>

      <div className={styles.mobileNavBackgroundWrap} ref={mobileNavBackgroundWrapRef} style={{ backgroundColor: navColor }} >
        <ul className={styles.navPages} ref={navWordRef} style={{ color: "var(--white)" }} >
          {["home", "3d", "motion", "visual"].map((page) => (
            <li className={styles.linkContainer} key={page} onClick={handleArrowClick}>
              <Link href={page === "home" ? "/" : `/pages/${page}`}>
                <div className={styles.linkWrapper}>
                  <h1>{page.toUpperCase()}</h1>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(MobileNavbar), { ssr: false });