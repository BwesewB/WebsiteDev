"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import Lenis from "@studio-freight/lenis";
import styles from "./heroSection.module.css"

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection({
    imageSrc="",
    videoSrc="",
    parentRef,
    position="relative"
}) {

    const videoRef = useRef(null);

    const [isScrolling, setIsScrolling] = useState(false);

    useEffect(() => {
        console.clear();
    
        const video = videoRef.current;
        if (!video || !parentRef?.current) return;
    
        let src = video.currentSrc || video.src;
        console.log(video, src);
    
        // Ensure video plays on touchstart for iOS
        function once(el, event, fn, opts) {
          const onceFn = function (e) {
            el.removeEventListener(event, onceFn);
            fn.apply(this, arguments);
          };
          el.addEventListener(event, onceFn, opts);
          return onceFn;
        }
    
        once(document.documentElement, "touchstart", function () {
          video.play();
          video.pause();
        });
    
        // Setup Lenis smooth scrolling
        const lenis = new Lenis({
          duration: 1.0, // Smooth scroll duration
          easing: (t) => 1 - Math.pow(1 - t, 3), // Easing function
          smooth: true, // Enable smooth scrolling
          smoothTouch: false, // Disable smooth scrolling on touch devices
          direction: "vertical",
        });
    
        // Use requestAnimationFrame to sync Lenis with GSAP scroll updates
        function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }
    
        requestAnimationFrame(raf);
    
        // Scroll Control with GSAP
        const tl = gsap.timeline({
          defaults: { duration: 1 },
          scrollTrigger: {
            trigger: parentRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true, // Syncs video time with scroll position
            onUpdate: (self) => {
              if (!isScrolling) {
                setIsScrolling(true);
                window.requestAnimationFrame(() => {
                  // Update video currentTime based on scroll position
                  const scrollPos = self.progress;
                  video.currentTime = video.duration * scrollPos;
                });
              }
            },
          },
        });
    
        // Set up video timeline once metadata is loaded
        once(video, "loadedmetadata", () => {
          tl.fromTo(
            video,
            { currentTime: 0 },
            { currentTime: video.duration || 1 }
          );
        });
    
        // Prefetch video to avoid issues with dropping frames
        setTimeout(() => {
          if (window.fetch) {
            fetch(src)
              .then((response) => response.blob())
              .then((response) => {
                const blobURL = URL.createObjectURL(response);
                const t = video.currentTime;
    
                once(document.documentElement, "touchstart", function () {
                  video.play();
                  video.pause();
                });
    
                video.setAttribute("src", blobURL);
                video.currentTime = t + 0.01;
              });
          }
        }, 1000);
    
        return () => {
          lenis.destroy(); // Cleanup Lenis
          ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
      }, [videoSrc, parentRef, isScrolling]);

    return(
        <>
            <div 
                className={styles.fullWidth} 
                style={{
                    position: position,
                    top: position === "sticky" ? "0" : "auto",
                }}
            >
                {
                    imageSrc && 
                    <img src={imageSrc} alt={imageSrc} className={styles.image} />
                }
                
                {
                    videoSrc && 
                    <video 
                        ref={videoRef}
                        loop 
                        muted 
                        preload="auto"
                        playsInline
                        className={styles.video}
                    >
                        <source src={videoSrc} type="video/mp4" />
                    </video>
                }
            </div>
        </>
    )
}