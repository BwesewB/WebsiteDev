"use client"

import * as THREE from 'three';
import { gsap } from "gsap";
import styles from './visual.module.css';
import { useEffect } from 'react';
import Lenis from "@studio-freight/lenis"
import ScrollTrigger from 'gsap/ScrollTrigger';
import projectsData from "./projectsData.js"
import HeroSection from "@/app/components/pageComponents/heroSection/page";
import { useState } from 'react';

export default function Visual() {

    // const [projectText, setProjectText] = useState(projectsCopy && projectsCopy.length > 0 ? projectsCopy[0][0] : "");
    // useEffect(() => {
    //     gsap.registerPlugin(ScrollTrigger);

    //     const lenis = new Lenis()
    //     lenis.on('scroll', ScrollTrigger.update);

    //     gsap.ticker.add((time) => {
    //         lenis.raf(time * 16.67);
    //     });
        
    //     gsap.ticker.lagSmoothing(0);
    //     //this is key to updating elements on scroll with lenis and gsap working together to track scroll position by listening to lenis scroll events

    //     const projectContainer = document.querySelector(`.${styles.projectContainer}`);
    //     const projects = document.querySelectorAll(`.${styles.projectName}`);
    //     const indicator = document.querySelector(`.${styles.indicator}`);
    //     const currentCount = document.querySelector(`.${styles.currentCount} p`);
    //     const projectImage = document.querySelector(`.${styles.projectImage}`);
    //     const projectCopy = document.querySelector(`.${styles.projectCopy} p`);
    //     const projectContainerHeight = 38;
    //     const imgHeight = 250;

    //     // const measureContainer = document.createElement('div');
    //     // measureContainer.style.position = 'absolute';

    //     // document.body.appendChild(measureContainer);

    //     // const projectWidth = Array.from(projects).map((project) => { 
    //     //     const paragraph = project.querySelector(`.${styles.projectCopy} p`);
    //     //     if (paragraph) {
    //     //         measureContainer.textContent = paragraph.textContent;
    //     //         return measureContainer.offsetWidth + 8;
    //     //     }
    //     //     return 0; // Return 0 if no <p> element is found
    //     // });

    //     // document.body.removeChild(measureContainer);

    //     // gsap.set(indicator, { 
    //     //     width: projectWidth[0],
    //     //     xPercent: -50,
    //     //     left: '50%' 
    //     // });

        
    //     // let currentIndex = 0;

    //     // projectCopy.textContent = projectsCopy[0][0];

    //     // const animateTextChange = async (index) => {
    //     //     await gsap.to(projectCopy, {
    //     //         opacity: 0,
    //     //         y: -20,
    //     //         duration: 0.5,
    //     //         stagger: 0.03,
    //     //         ease: "power3.inOut"
    //     //     });

    //     //     setProjectText(projectsCopy[index][0]);

    //     //     gsap.to(projectCopy, {
    //     //         opacity: 1,
    //     //         y: 0,
    //     //         duration: 0.5,
    //     //         stagger: 0.03,
    //     //         ease: "power3.inOut"
    //     //     });
    //     // };

    //     const scrollPerProject = window.innerHeight;

    //     ScrollTrigger.create({
    //         trigger: projectContainer,
    //         start: 'top top',
    //         end: `${projectContainerHeight}px`,
    //         pin: true,
    //         scrub: true,
    //         anticipatePin: 1,
    //         onUpdate: async (self) => {
    //             const progress = self.progress;
    //             gsap.set(`.${styles.progress}`, { scaleY: progress });

    //             const scrollPosition = Math.max(0, self.scroll() - window.innerHeight);
    //             const activeIndex = Math.floor(scrollPosition / scrollPerProject);

    //             if (
    //                 activeIndex >= 0 &&
    //                 activeIndex < projects.length - 1 &&
    //                 currentIndex !== activeIndex
    //             ) {
    //                 currentIndex = activeIndex;

    //                 projects.forEach((project) => project.classList.remove(styles.active));
    //                 projects[activeIndex].classList.add(styles.active);

    //                 await Promise.all([
    //                     gsap.to(indicator, {
    //                         y: activeIndex * projectHeight,
    //                         width: projectWidth[activeIndex],
    //                         duration: 0.5, 
    //                         ease: "power3.inOut",
    //                         overwrite: "true"
    //                     })
    //                 ])

    //                 // animateTextChange(activeIndex);
    //             }
    //         }
    //     });

    //     return () => {
    //         gsap.ticker.remove(lenis.raf);
    //         lenis.destroy();
    //     };
    // }, [projectsCopy]);

    const [projectText, setProjectText] = useState(projectsData[0].description);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        
        const projectContainer = document.querySelector(`.${styles.projectContainer}`);
        const projects = document.querySelectorAll(`.${styles.projectName}`);
        const indicator = document.querySelector(`.${styles.indicator}`);
        // const currentCount = document.querySelector(`.${styles.currentCount} p`);
        // const projectImage = document.querySelector(`.${styles.projectImage}`);
        // const projectCopy = document.querySelector(`.${styles.projectCopy} p`);
        // const projectContainerHeight = 38;
        // const imgHeight = 250;

        // ScrollTrigger.create({
        //     trigger: projectContainer,
        //     pin: true,
        //     start: 'top top', // when the top of the trigger hits the top of the viewport
        //     end: '+=100px', // end after scrolling 500px beyond the start
        //     scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
        // });
    }, []);

    return (
        <>
            <div className={styles.heroSection}>
                <HeroSection imageSrc="/images/cans/Fish1.png" />
            </div>
            <div className={styles.visualContainer}>
                <div className={styles.projectContainer}>
                    <div className={styles.col}>
                        <div className={styles.projects}>
                            <div className={styles.indicator}></div>
                            {projectsData.map((project, index) => (
                                <div key={index} className={`${styles.projectName} ${index === 0 ? styles.active : ''}`}>
                                <h3>{project.name}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={styles.col}>
                        <div className={styles.projectImageWrapper}>
                            <div className={styles.projectImage}>
                                {projectsData.map((project, index) => (
                                <div key={index} className={styles.img}>
                                    <img className={styles.imgTag} src={project.imageSrc} alt={project.name} />
                                </div>
                                ))}
                            </div>
                        </div>
                        <div className={styles.projectCopy}>
                            <p>{projectText}</p>
                        </div>
                    </div>
                    <div className={styles.progressBar}>
                        <div className={styles.progress}></div>
                    </div>
                </div>
            </div>
        </>
    );
}

