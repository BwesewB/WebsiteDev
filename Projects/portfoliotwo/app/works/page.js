"use client"

import styles from './works.module.css';
import { cardData } from './data';
import ProjectCard from '@/components/templates/projectCard/projectCard';
import React from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export default function WorksPage() {

  const headerRef = useRef(null);

  useGSAP(() => {
      const header = headerRef.current;
      if (!header) return;

      // Let SplitText handle all the complex splitting logic
      let split = new SplitText(header, { type: 'chars' });
      
      gsap.set(header, { visibility: 'visible' });

      gsap.from(split.chars, { // Animate the characters it created
        yPercent: 100,
        opacity: 0,
        stagger: 0.05,
        duration: 0.8,
        ease: 'power3.out',
      });
      
  }, []);

  return (
    <>
      <div className={styles.headerContainer}>
        <h1 className={styles.headerBig} ref={headerRef}>Works</h1>
      </div>
      <div className={styles.gridContainer}>
        {cardData.map((project) => {
          const isVideo = project.src && project.src.endsWith('.mp4');

          return (
            <ProjectCard
              key={project.projectLink}
              link={project.projectLink}
              header={project.title}
              categories={project.categories}
              scale={project.scale} 
              startingScale={project.startingScale} 
              movementFactor={project.movementFactor}
              videoSrc={isVideo ? project.src : null}
              imageSrc={!isVideo ? project.src : null}
            >
              {project.customComponent}
            </ProjectCard>
          );
        })}
      </div>
    </>
  );
}