// components/atoms/name/Name.js
"use client";

import { useRef } from "react"; // No longer need useLayoutEffect here
import Link from "next/link";
import StickyContainer from "../stickyContainer/page";
import styles from "./name.module.css";

// The component now accepts `homePageHeight`
export default function Name({ isHomePage, homePageHeight }) {
  // We still need a ref for the StickyContainer's endTrigger
  const endTriggerRef = useRef(null);

  // The name content itself
  const nameContent = (
    <div className={styles.nameContainer}>
      <Link href="/">
        <h1>Sebastian Fok</h1>
      </Link>
    </div>
  );

  if (isHomePage) {
    // --- RENDER FOR HOMEPAGE ---
    // The endTrigger ref is now simply the component's own outer div
    endTriggerRef.current = document.querySelector(`.${styles.nameOuterHome}`);
    
    return (
      // Apply the height directly via inline style from the prop
      <div 
        ref={endTriggerRef} 
        className={styles.nameOuterHome} 
        style={{ height: homePageHeight > 0 ? `${homePageHeight}px` : '100vh' }}
      >
        <StickyContainer endTriggerRef={endTriggerRef}>
          {nameContent}
        </StickyContainer>
      </div>
    );
  } else {
    // --- RENDER FOR ALL OTHER PAGES ---
    return <div className={styles.nameOuterOther}>{nameContent}</div>;
  }
}