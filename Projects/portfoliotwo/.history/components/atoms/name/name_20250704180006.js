// components/atoms/name/Name.js
"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import StickyContainer from "../stickyContainer/page";
import styles from "./name.module.css";

export default function Name({ isHomePage }) {
  const nameOuterRef = useRef(null);
  const endTriggerRef = useRef(null);

  useLayoutEffect(() => {
    // We only run this complex logic on the homepage.
    if (isHomePage) {
      
      // THE FIX: Use a small timeout to wait for the DOM to settle.
      // This gives the `{children}` in ClientWrap time to render fully.
      const timer = setTimeout(() => {
        const mainContent = document.querySelector("#main-content-area");
        const nameOuter = nameOuterRef.current;

        if (mainContent && nameOuter) {
          // --- DEBUGGING LOGS ---
          console.log("Attempting to measure #main-content-area...");
          const contentHeight = mainContent.offsetHeight;
          console.log(`Measured content height: ${contentHeight}px`);

          if (contentHeight > 0) {
            // Set the height of our trigger div to match
            nameOuter.style.height = `${contentHeight}px`;
            console.log(`Set .nameOuterHome height to ${contentHeight}px`);

            // We also need to set the ref for the StickyContainer's end trigger
            endTriggerRef.current = mainContent;
            
            // IMPORTANT: If you use GSAP ScrollSmoother, you need to tell it to refresh
            // after you programmatically change the layout height.
            if (window.ScrollSmoother) {
                const smoother = window.ScrollSmoother.get();
                if (smoother) {
                    console.log("ScrollSmoother found. Refreshing...");
                    smoother.refresh();
                }
            }
            
          } else {
            console.error("Calculation failed: mainContent height is 0. The page may not have rendered yet.");
          }
        } else {
          console.error("Could not find #main-content-area or nameOuterRef.current.");
        }
      }, 100); // 100ms is usually a safe delay.

      // Cleanup function to clear the timeout if the component unmounts
      return () => clearTimeout(timer);
    }
  }, [isHomePage]); // Rerun this effect if the page changes

  // The name content itself (no changes here)
  const nameContent = (
    <div className={styles.nameContainer}>
      <Link href="/">
        <h1>Sebastian Fok</h1>
      </Link>
    </div>
  );

  // The render logic (no changes here)
  if (isHomePage) {
    return (
      <div ref={nameOuterRef} className={styles.nameOuterHome}>
        <StickyContainer endTriggerRef={endTriggerRef}>
          {nameContent}
        </StickyContainer>
      </div>
    );
  } else {
    return <div className={styles.nameOuterOther}>{nameContent}</div>;
  }
}