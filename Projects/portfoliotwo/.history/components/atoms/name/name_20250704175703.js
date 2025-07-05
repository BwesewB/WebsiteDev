"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import StickyContainer from "../stickyContainer/page";
import styles from "./styles/name.module.css";

export default function Name({ isHomePage }) {
  const nameOuterRef = useRef(null);
  const endTriggerRef = useRef(null);

  useLayoutEffect(() => {
    if (isHomePage) {
      // Logic only for the homepage
      const mainContent = document.querySelector("#main-content-area");
      if (mainContent && nameOuterRef.current) {
        // Calculate the height of all the content on the homepage
        const contentHeight = mainContent.offsetHeight;
        // Set the height of our trigger div to match
        nameOuterRef.current.style.height = `${contentHeight}px`;

        // We also need to set the ref for the StickyContainer's end trigger
        endTriggerRef.current = mainContent;
      }
    }
  }, [isHomePage]); // Rerun this effect if the page changes

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
    return (
      <div ref={nameOuterRef} className={styles.nameOuterHome}>
        <StickyContainer endTriggerRef={endTriggerRef}>
          {nameContent}
        </StickyContainer>
      </div>
    );
  } else {
    // --- RENDER FOR ALL OTHER PAGES ---
    // No sticky container, no complex layout. Just the name.
    return <div className={styles.nameOuterOther}>{nameContent}</div>;
  }
}