"use client"

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./projectLayout.module.css";
import MotionProject from "../motionProject/page";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectLayout({
    videoSrc,
    imageSrc,
    title,
    description,
    projectLink,
    h4Title,

    videoSrcTwo,
    imageSrcTwo,
    titleTwo,
    descriptionTwo,
    projectLinkTwo,
    h4TitleTwo,
}){
    const gridRef = useRef(null);

    useEffect(() => {
      const grid = gridRef.current;
  
      const animation = gsap.fromTo(
        grid,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: grid,
            start: "top 95%",
            // toggleActions: "play none none reverse",
            once: true,
            markers:true
          },
        }
      );
  
      return () => {
        animation.kill();
      };
    }, []);

    return(
        <div className="container">
            <div ref={gridRef} className={styles.gridContainer}>
                {(title || h4Title) && (
                <MotionProject
                    videoSrc={videoSrc}
                    imageSrc={imageSrc}
                    title={title}
                    description={description}
                    projectLink={projectLink}
                    h4Title={h4Title}
                />
                )}
                {(titleTwo || h4TitleTwo) && (
                <MotionProject
                    videoSrc={videoSrcTwo}
                    imageSrc={imageSrcTwo}
                    title={titleTwo}
                    description={descriptionTwo}
                    projectLink={projectLinkTwo}
                    h4Title={h4TitleTwo}
                />
                )}
            </div>
        </div>
    )
}