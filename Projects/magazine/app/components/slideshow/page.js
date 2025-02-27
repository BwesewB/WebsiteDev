"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import styles from "./slideshow.module.css";

// Import all individual pages
import CoverPage from "../slides/coverPage/page";

// Define all slides
const slides = [CoverPage];

export default function Slideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      slideRef.current,
      { opacity: 0, x: 100 },
      { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" }
    );
  }, [currentIndex]);

  const nextSlide = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const ActiveSlide = slides[currentIndex];

  return (
    <div className={styles.slideshow}>
      <div ref={slideRef} className={styles.slide}>
        <ActiveSlide />
      </div>

      <button className={styles.navButton} onClick={prevSlide} disabled={currentIndex === 0}>
        ◀
      </button>
      <button className={styles.navButton} onClick={nextSlide} disabled={currentIndex === slides.length - 1}>
        ▶
      </button>
    </div>
  );
}
