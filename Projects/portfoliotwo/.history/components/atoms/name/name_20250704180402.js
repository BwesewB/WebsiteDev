// components/atoms/name/Name.js
"use client";

// We need both useRef and useLayoutEffect again
import { useRef, useLayoutEffect } from "react";
import Link from "next/link";
import StickyContainer from "../stickyContainer/page";
import styles from "./name.module.css";

export default function Name({ isHomePage, homePageHeight }) {
  // We need a ref for the component's own outer div
  const nameOuterRef = useRef(null);
  
  // And a separate ref to pass to the StickyContainer
  const endTriggerForSticky = useRef(null);

  // --- THIS IS THE FIX ---
  useLayoutEffect(() => {
    // This hook ONLY runs on the client, so `document` is available.
    if (isHomePage) {
      // We set the ref that StickyContainer needs here, safely on the client.
      endTriggerForSticky.current = nameOuterRef.current;
    }
  }, [isHomePage]); // Rerun if the page type changes

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
      <div
        // Attach the ref to the element we want to reference
        ref={nameOuterRef}
        className={styles.nameOuterHome}
        // Apply the height from the prop, with a fallback
        style={{ height: homePageHeight > 0 ? `${homePageHeight}px` : "100vh" }}
      >
        {/* 
          Pass the `endTriggerForSticky` ref to the container.
          This ref is populated by the useLayoutEffect hook above.
        */}
        <StickyContainer endTriggerRef={endTriggerForSticky}>
          {nameContent}
        </StickyContainer>
      </div>
    );
  } else {
    // --- RENDER FOR ALL OTHER PAGES ---
    return <div className={styles.nameOuterOther}>{nameContent}</div>;
  }
}