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

  const mobileNavBackgroundWrapRef = useRef(null);

//   const handleArrowClick = () => {
//     const mobileMenuCircle = arrowMobileCircleRef.current;
//     const mobileMenu = mobileMenuRef.current;

//     setIsActive((prevState) => !prevState);

//     const tl = gsap.timeline();

//     if (isActive) {
//       gsap.to(mobileMenuCircle, {
//         borderRadius: "100%", 
//         duration: 0.6,
//         ease: "power1.inOut",
//       });

//       tl.to(mobileMenu, {
//         width: "auto",
//         height: "60px",
//         borderRadius: "100%",
//         transformOrigin: "top right",
//         duration: 0.6,
//         ease: "power1.inOut",
//       })
//       .to(
//         mobileMenu,
//         {
//             margin: "var(--sideSpacing)",
//             padding: 0,
//             duration: 0.6,
//         },
//         "-=1"
//       )
      
//     } else {
//       gsap.to(mobileMenuCircle, {
//         borderRadius: "0%",
//         duration: 0.6,
//         ease: "power1.inOut",
//       });

//       tl.to(mobileMenu, {
//         top: 0,
//         right: 0,

//         height: "100vh",
//         width: "100vw",
//         borderRadius: "0%",
//         transformOrigin: "top right",
//         duration: 0.6,
//         ease: "power1.inOut",
//       }, )
//       .to(
//         mobileMenu,
//         {
//             margin: 0,
//             padding: "var(--sideSpacing)",
//             duration: 0.6,
//         },
//         "-=1"
//       )
//     }
//   };

const handleArrowClick = () => {
    setIsActive((prevState) => !prevState);

    if (isActive) {
        gsap.to(arrowMobileCircleRef.current, {
            rotate: 0,
            duration: 0.4,
            ease: "back.inOut",
        });

        gsap.to(mobileNavBackgroundWrapRef.current, {
            height: "0",
            width: "0",
            // borderRadius: "100%",
            borderBottomLeftRadius: "100%",
            borderBottomRightRadius: "100%",
            borderTopLeftRadius: "100%",
            transformOrigin: "top right",
            duration: 0.6,
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
            // borderRadius: "0%",
            borderBottomLeftRadius: "0%",
            borderBottomRightRadius: "0%",
            borderTopLeftRadius: "0%",
            transformOrigin: "top right",
            duration: 1,
        });
    }
  };

  useEffect(() => {
    gsap.to(mobileMenuRef.current, {
      margin: "var(--sideSpacing)",
      x:0,
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

      <div className={styles.mobileNavBackgroundWrap} ref={mobileNavBackgroundWrapRef} style={{ backgroundColor: navColor }}>

      </div>
    </div>
  );
}
