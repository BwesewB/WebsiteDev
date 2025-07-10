"use client"

import styles from './works.module.css';
import { cardData } from './data';
import ProjectCard from '@/components/templates/projectCard/projectCard';
import React from 'react';

export default function WorksPage() {
  return (
    <>
      <div className={styles.headerContainer}>
        <h1 className={styles.headerBig}>Works</h1>
      </div>
      <div className={styles.gridContainer}>
        {cardData.map((project) => {
          const isVideo = project.src && project.src.endsWith('.mp4');

        const categoriesElements = project.categories && project.categories.length > 0
          ? [...project.categories] // 1. Create a shallow copy to avoid mutating the original data
              .sort() // 2. Sort the copy alphabetically (case-sensitive by default)
              .map((cat, index, arr) => ( // 3. Map over the newly sorted array
                <React.Fragment key={cat}>
                  <span className={styles.categoryTag}>{cat}</span>
                  {/* Use the mapped array's length for the check */}
                  {index < arr.length - 1 && <span className={styles.separator}>•</span>}
                </React.Fragment>
              ))
          : null;

          return (
            <ProjectCard
              key={project.projectLink}
              link={project.projectLink}
              header={project.title}
              paragraph={categoriesElements} 
              scale={project.scale} 
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