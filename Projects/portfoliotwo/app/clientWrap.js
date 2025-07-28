"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/organisms/navbar/page";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis"
import { setupGsap } from "./utils/gsap-setup";

setupGsap();

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
    gsap.to(wrapper, {
      autoAlpha: 1, // Fades from `visibility: 'hidden'` to `visibility: 'visible'`
      duration: 0.5,
      delay: 0.1, // A small delay before starting the fade
      
      // C. THE CRITICAL FIX: Refresh ScrollTrigger AFTER the animation is complete.
      onComplete: () => {
        // By now, the page is fully visible and the browser has calculated its true height.
        ScrollTrigger.refresh();
        console.log("Page transition complete. ScrollTrigger refreshed with correct height.");
      }
    });
    
  }, [pathname]);

  return (
    <>
      <Navbar />
      <div className="page-container" key={pathname} ref={contentWrapperRef} style={{ visibility: 'hidden' }}>
        {/* <Name isHomePage={isHomePage} key={pathname} /> */}
        <main>
          {children}  
        </main>
      </div>
    </>
  );
}