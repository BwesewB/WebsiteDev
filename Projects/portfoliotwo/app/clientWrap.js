"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/organisms/navbar/page";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import Name from "@/components/atoms/name/Name";
// import Footer from "./components/uiComponents/footer/page";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function ClientWrap({ children }) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const mainRef = useRef(null);
  const smootherRef = useRef(null);
  
  const hasLogged = useRef(false);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    if (!hasLogged.current) {
      hasLogged.current = true;

      const asciiArt = `
                 *###############*                 
             %##@@@@@@@@@@@@@@@@@@@###             
          +@@@@@@@@@@@@@@@@@@@@@@@@@@@@@+          
        +@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@+        
      +@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*      
     @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@     
   @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@##@@@@@@@@@@@@   
  #@@@@@@@@@@@@@@@@@@@@@@@@@@#%*      #%%@@@@@@@#  
 *@@@@@@@@@@@@@@@@@@@##@@@@+              *@@@@@@  
 @@@@@@@@@@@@@@@@@@@    *+             #    #@@@@@ 
#@@@@@@#####%@@@@@@#                 +@@@@=  %@@@@%
#@@@@*        *###%                 +@@@@@#   %@@@#
#@@@                                 #@@@@=    @@@#
#@@%                                   +       #@@#
#@@%                                           #@@#
#@@@                                           @@@#
#@@@@+         %#%#                           *@@@#
#@@@@@@#####%@@@@@@@#                        %@@@@*
 @@@@@@@@@@@@@@@@@@@@@###+                  #@@@@@ 
 %@@@@@@@@@@@@@@@@@@@@@@@@@*              *@@@@@@# 
  %@@@@@@@@@@@@@@@@@@@@@@@@@@%#%      %#%@@@@@@@#  
   %@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@##@@@@@@@@@@@#   
     @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*    
      *@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@+      
        *@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@+        
          *@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*          
             ###@@@@@@@@@@@@@@@@@@@###             
                 *###############+                 
      `;
      console.log(`%c${asciiArt}`, 'font-size: 16px;');
    }
  }, []);

  useLayoutEffect(() => {
    smootherRef.current = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 0.7,
      ease: "power3.out",
      smoothTouch: 0,
      effects: true,
      normalizeScroll: true,
    });

    const refreshTimeout = setTimeout(() => {
      console.log("Forcing final ScrollTrigger refresh after initial load.");
      ScrollTrigger.refresh(true);
    }, 500); 

    return () => {
      smoother.kill();
      clearTimeout(refreshTimeout);
    };
  }, []);

  useLayoutEffect(() => {
    // When the user navigates to a new page, it's also good to trigger a refresh.
    const navRefreshTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 300);

    return () => clearTimeout(navRefreshTimeout);
  }, [pathname]);

  return (
    <>
      <Navbar />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="page-container">
            <Name isHomePage={isHomePage} key={pathname} />
            <main ref={mainRef}>
              {children}  
            </main>
          </div>
        </div>
      </div>
    </>
  );
}