"use client";
import { usePathname } from "next/navigation";
import Navbar from "./components/uiComponents/navbar/page";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis"
import Footer from "./components/uiComponents/footer/page";

export default function ClientWrap({ children }) {

  const pathname = usePathname();

  const pageStyles = {
    "/": { bgColor: "var(--white)", navColor: "var(--blue)" },
    "/pages/3d": { bgColor: "var(--black)", navColor: "var(--white)", textColor: "var(--black)" },
    "/pages/motion": { bgColor: "var(--white)", navColor: "var(--blue)" },
    "/pages/visual": { bgColor: "var(--white)", navColor: "var(--blue)" },
    "/pages/teamwork": { bgColor: "var(--white)", navColor: "var(--blue)" },

    "/pages/motion/projects/blackHole": { bgColor: "var(--black)", navColor: "var(--blue)" },
    "/pages/motion/projects/taxes": { bgColor: "var(--sand)", navColor: "var(--blue)" },
    "/pages/visual/projects/logo": { bgColor: "var(--sand)", navColor: "var(--blue)" },
    "/pages/visual/projects/deckedBeer": { bgColor: "var(--sand)", navColor: "var(--blue)" },
    "/pages/teamwork/projects/flare": { bgColor: "var(--sand)", navColor: "var(--blue)" },
  };

  const { bgColor, navColor, textColor } = pageStyles[pathname] || pageStyles["/"];

  // Update styles for the html and body elements directly
  useEffect(() => {
    document.documentElement.style.backgroundColor = bgColor; // Update html background color
    document.body.style.backgroundColor = bgColor; // Update body background color
  }, [bgColor]);

  useEffect(() => {
    document.documentElement.style.setProperty('--nav-color', navColor); // Update nav color
  }, [navColor]);

  useEffect(() => {
    document.documentElement.style.setProperty('--text-color', textColor); // Update nav color
  }, [textColor]);


//Lenis smooth scrolling
  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /android|iphone|ipad|ipod|blackberry|windows phone|opera mini|mobile/i.test(userAgent);
  
    if (isMobile) return;

    const lenis = new Lenis({
      duration: 0.7, // Scroll duration. How smooth it is
      easing: (t) => 1 - Math.pow(1 - t, 3), // Easing
      smooth: true, // Enable smooth scrolling
      smoothTouch: false, // Disable smooth scrolling on touch devices
      direction: "vertical",
    });

    let animationFrameId;

    function raf(time) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy(); // Cleanup Lenis
    };
  }, []);

  return (
    <>
      <Navbar navColor={navColor} textColor={textColor}/>
      {children}
      <Footer />
    </>
  );
}
