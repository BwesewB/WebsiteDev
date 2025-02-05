"use client";
import { usePathname } from "next/navigation";
import Navbar from "./components/uiComponents/navbar/page";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis"

export default function ClientWrap({ children }) {

  const pathname = usePathname();

  const pageStyles = {
    "/": { bgColor: "var(--white)", navColor: "var(--blue)" },
    "/pages/3d": { bgColor: "var(--black)", navColor: "var(--white)" },
    "/pages/motion": { bgColor: "var(--white)", navColor: "var(--blue)" },
    "/pages/visual": { bgColor: "var(--white)", navColor: "var(--blue)" },
    "/pages/teamwork": { bgColor: "var(--white)", navColor: "var(--blue)" },
    "/pages/motion/projects/blackHole": { bgColor: "var(--black)", navColor: "var(--blue)" },
    "/pages/motion/projects/taxes": { bgColor: "var(--sand)", navColor: "var(--blue)" },
    "/pages/visual/projects/logo": { bgColor: "var(--sand)", navColor: "var(--blue)" },
    "/pages/teamwork/projects/flare": { bgColor: "var(--sand)", navColor: "var(--blue)" },
  };

  const { bgColor, navColor } = pageStyles[pathname] || pageStyles["/"];

  // Update styles for the html and body elements directly
  useEffect(() => {
    document.documentElement.style.backgroundColor = bgColor; // Update html background color
    document.body.style.backgroundColor = bgColor; // Update body background color
  }, [bgColor]);

  useEffect(() => {
    document.documentElement.style.setProperty('--nav-color', navColor); // Update nav color
  }, [navColor]);


//Lenis smooth scrolling
  useEffect(() => {
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
      <Navbar navColor={navColor} />
      {children}
    </>
  );
}
