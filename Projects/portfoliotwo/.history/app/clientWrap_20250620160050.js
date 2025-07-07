"use client";
import { usePathname } from "next/navigation";
import Navbar from "@/components/organisms/navbar/page";
import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
// import Footer from "./components/uiComponents/footer/page";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function ClientWrap({ children }) {
  const pathname = usePathname();
  
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
        // Create the ScrollSmoother instance
        const smoother = ScrollSmoother.create({
            wrapper: "#smooth-wrapper",
            content: "#smooth-content",
            smooth: 0.8, // Adjust smoothness as needed
            effects: true, // Keep parallax effects if you use them

            // THE FIX: This tells GSAP to use a method compatible with sticky/fixed positioning.
            normalizeScroll: true, 
        });

        // Cleanup function
        return () => {
            if (smoother) smoother.kill();
        };
    }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content"
        style={{ 
            position: "relative",
            paddingLeft: "calc(2 * var(--masterSpacing))",
            paddingRight: "calc(2 * var(--masterSpacing))",
            // border:"1px solid red",
            overflowX: "hidden",
            margin:"0 auto",
            /* flex-direction: column; */
            alignItems: "center",
            maxWidth: "1920px",
        }}
      >
        <Navbar />
        {children}
        {/* {footerVisible && <Footer />} */}
      </div>
    </div>
  );
}