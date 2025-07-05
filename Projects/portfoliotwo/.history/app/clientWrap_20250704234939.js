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
  const [contentHeight, setContentHeight] = useState(0);
  const mainContentRef = useRef(null);
  
  const hasLogged = useRef(false);

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

  const pageStyles = {
    "/": { bgColor: "var(--white)", navColor: "var(--blue)" },
    "/pages/3d": { bgColor: "var(--black)", navColor: "var(--blue)" },
    "/pages/motion": { bgColor: "var(--white)", navColor: "var(--blue)" },
    "/pages/visual": { bgColor: "var(--white)", navColor: "var(--blue)" },

    "/works/blackHole": { bgColor: "var(--sand)", navColor: "var(--blue)" },
    "/works/taxes": { bgColor: "var(--sand)", navColor: "var(--blue)" },
    "/works/logo": { bgColor: "var(--sand)", navColor: "var(--blue)"},
    "/works/deckedBeer": { bgColor: "var(--sand)", navColor: "var(--blue)"},
    "/works/magazine": { bgColor: "var(--sand)", navColor: "var(--blue)"},
    "/works/citadel": { bgColor: "var(--sand)", navColor: "var(--blue)"},
    "/works/flare": { bgColor: "var(--sand)", navColor: "var(--blue)"},
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

  // GSAP Smooth Scrolling
  useLayoutEffect(() => {
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 0.7,
      ease: "power3.out", 
      smoothTouch: 0,
      effects: true,
      normalizeScroll: true, 
    });

    return () => {
      // Kill the smoother instance when the component unmounts
      if (smoother) smoother.kill();
    };
  }, []);

  useLayoutEffect(() => {
    // This effect runs whenever the children (page content) change
    if (isHomePage && mainContentRef.current) {
        
        const timer = setTimeout(() => {
            const height = mainContentRef.current.offsetHeight;
            console.log(`[ClientWrap] Measured content height: ${height}px`);
            setContentHeight(height);
        }, 100); // Small delay to ensure layout is final

        return () => clearTimeout(timer);
    } else {
        // Reset height on other pages
        setContentHeight(0);
    }
  }, [children, isHomePage]);

  return (
    <>
      <Navbar />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="page-container">
            <Name isHomePage={isHomePage} homePageHeight={contentHeight} />
            <main ref={mainContentRef}>
              {children}  
            </main>
          </div>
        </div>
      </div>
    </>
  );
}