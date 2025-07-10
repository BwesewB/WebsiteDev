"use client"

import styles from './works.module.css';
import { cardData } from './data';
import ProjectCard from '@/components/templates/projectCard/projectCard';

export default function WorksPage() {
  return (
    <>
      <div className={styles.headerContainer}>
        <h1 className={styles.headerBig}>Works</h1>
      </div>
      <div className={styles.gridContainer}>
        {cardData.map((project) => {
          const isVideo = project.src && project.src.endsWith('.mp4');
          return (
            <ProjectCard
              key={project.projectLink}
              link={project.projectLink}
              header={project.title}
              scale={project.scale ?? 1.03} 
              movementFactor={project.movementFactor ?? 15}
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