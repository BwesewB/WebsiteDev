"use client"

import styles from './works.module.css';
import { cardData } from './data';
import ProjectCard from '@/components/templates/projectCard/projectCard';
import React from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import TitleLetterUp from '@/components/animations/Text/TitleLetterUp/titleLetterUp';

export default function WorksPage() {

  return (
    <>
      <div className={styles.headerContainer}>
        <TitleLetterUp className={styles.headerBig}>
          Works
        </TitleLetterUp>
      </div>
      <div className={styles.gridContainer}>
        {cardData.map((project) => {
          const isVideo = typeof project.src === 'string';
          const isImage = typeof project.src === 'object' && project.src !== null;

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
                imageSrc={isImage ? project.src : null}
              >
                {project.customComponent}
              </ProjectCard>
          );
        })}
      </div>
      <div className={styles.spacer}></div>
    </>
  );
}