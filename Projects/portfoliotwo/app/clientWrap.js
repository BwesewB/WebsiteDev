"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/organisms/navbar/page";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import Lenis from "@studio-freight/lenis"
import Name from "@/components/atoms/name/Name";
// import Footer from "./components/uiComponents/footer/page";

gsap.registerPlugin(ScrollTrigger);

export default function ClientWrap({ children }) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const contentWrapperRef = useRef(null);
  const lenisRef = useRef(null);

  useLayoutEffect(() => {
    // Create the Lenis instance
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // A popular easing function
    });

    // Store the instance in a ref
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000); 
    });
    
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useLayoutEffect(() => {
    const wrapper = contentWrapperRef.current;
    if (!wrapper || !lenisRef.current) return;
    
    lenisRef.current.scrollTo(0, { immediate: true });
    gsap.delayedCall(0.1, () => {
      ScrollTrigger.refresh();
      gsap.fromTo(wrapper, 
        { autoAlpha: 0 }, 
        { autoAlpha: 1, duration: 0.5 }
      );
    });
    
  }, [pathname]);

  return (
    <>
      <Navbar />
      <div className="page-container" key={pathname}
      ref={contentWrapperRef}
      style={{ visibility: 'hidden' }}>
        <Name isHomePage={isHomePage} key={pathname + "-name"} />
        <main>
          {children}  
        </main>
      </div>
    </>
  );
}