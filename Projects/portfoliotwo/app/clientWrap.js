"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/organisms/navbar/page";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis"
import { setupGsap } from "./utils/gsap-setup";
import { useAppTransition } from "./utils/TransitionContext";

setupGsap();

gsap.registerPlugin(ScrollTrigger);

export default function ClientWrap({ children }) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const contentWrapperRef = useRef(null);
  const lenisRef = useRef(null);

  const { pageKey, isTransitioning } = useAppTransition();
  const combinedKey = `${pathname}-${pageKey}`;

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

    if (isTransitioning) {
        return; // Correct: Do nothing, content remains hidden.
    }

    // This logic runs only after the remount and when isTransitioning is false.
    let animationFrameId;
    let timeoutId;

    // We defer all GSAP work until the next available paint cycle.
    // This gives React's remount time to fully complete.
    animationFrameId = requestAnimationFrame(() => {
        // Now animate the wrapper in.
        gsap.to(wrapper, {
            autoAlpha: 1,
            duration: 0.4, // A quick fade-in for the container
            onStart: () => {
                // As soon as the container starts to become visible,
                // set up the scroller and refresh ScrollTrigger.
                lenisRef.current.scrollTo(0, { immediate: true });
                
                timeoutId = setTimeout(() => {
                    console.log(`[ClientWrap] Refreshing ScrollTrigger for key: ${combinedKey}`);
                    ScrollTrigger.refresh();
                }, 50); 
            }
        });
    });

    return () => {
        // Correctly clean up everything.
        cancelAnimationFrame(animationFrameId);
        clearTimeout(timeoutId);
        gsap.killTweensOf(wrapper);
        ScrollTrigger.killAll();
    };

}, [combinedKey, isTransitioning]);


  return (
    <>
      <Navbar />
      <div className="page-container" key={combinedKey} ref={contentWrapperRef} style={{ opacity: 0, visibility: 'hidden' }}>
        <main>
          {children}
        </main>
      </div>
    </>
  );
}