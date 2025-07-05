"use client";

import { useRef, useLayoutEffect } from "react";
import Link from "next/link";
import StickyContainer from "../stickyContainer/page";
import styles from "./name.module.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Name({ isHomePage, homePageHeight }) {
  const nameOuterRef = useRef(null);
  const endTriggerForSticky = useRef(null);

  useLayoutEffect(() => {
    if (isHomePage) {
      endTriggerForSticky.current = nameOuterRef.current;
    }
  }, [isHomePage]);

  const nameContent = (
    <div className={styles.nameContainer}>
      <Link href="/">
        <h1>Sebastian Fok</h1>
      </Link>
    </div>
  );

  if (isHomePage) {
    return (
      <div
        ref={nameOuterRef}
        className={styles.nameOuterHome}
        style={{ height: homePageHeight > 0 ? `${homePageHeight}px` : "100vh" }}
      >
        <StickyContainer endTriggerRef={endTriggerForSticky}>
          {nameContent}
        </StickyContainer>
      </div>
    );
  } else {
    return <div className={styles.nameOuterOther}>{nameContent}</div>;
  }
}