"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/organisms/navbar/page";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis"
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

    // 1. If a transition is happening, we do NOTHING.
    // The component is mounted but remains hidden due to its inline style.
    // This runs on the *new* page's first render, preventing the flash.
    // Crucially, it also runs on the *old* page when `isTransitioning` becomes true,
    // but since it just returns, the old page content remains visible for the snapshot.
    if (isTransitioning) {
      console.log(`[ClientWrap] Transition in progress. Awaiting signal to animate in.`);
      return;
    }

    // 2. This code now ONLY runs when we are NOT in a transition.
    // (e.g., initial page load, or after the remount when isTransitioning is set to false).
    console.log(`[ClientWrap] Finalizing setup for key: ${combinedKey}. Making content visible.`);

    // Animate the content in, now that we are ready.
    gsap.set(wrapper, { autoAlpha: 1 });

    lenisRef.current.scrollTo(0, { immediate: true });

    const refreshTimeout = setTimeout(() => {
      console.log(`[ClientWrap] Refreshing ScrollTrigger for key: ${combinedKey}`);
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(refreshTimeout);
      console.log(`[ClientWrap] Killing triggers for key: ${combinedKey}`);
      ScrollTrigger.killAll();
    };

    // The effect depends on the remount key and the transition flag.
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