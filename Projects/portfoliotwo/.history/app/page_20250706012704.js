"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";
import styles from './styles/page.module.css';
import GridLayout from "@/components/atoms/gridLayout/gridLayout";
import { Canvas } from '@react-three/fiber';
import { InteractiveCan } from "@/components/molecules/InteractiveCan/InteractiveCan";


export default function Home() {

  return (
    <>
        <div className={styles.topContainer}>
          <div className={styles.topContainerImage}>

          </div>
        </div>
        <div className="container">
          <GridLayout>
            <GridLayout.Item 
              colStart={1} 
              colEnd={2} 
              rowStart={4} 
              rowEnd={5}
            >
              <h5 className={styles.headerFive}>ABOUT ME</h5>
            </GridLayout.Item>
            <GridLayout.Item 
              colStart={2} 
              colEnd={3} 
              rowStart={1} 
              rowEnd={3}
            >

            </GridLayout.Item>
            <GridLayout.Item 
              colStart={2} 
              colEnd={3} 
              rowStart={3} 
              rowEnd={4}
            >

            </GridLayout.Item>
            <GridLayout.Item 
              colStart={3} 
              colEnd={5} 
              rowStart={1} 
              rowEnd={4}
            >

            </GridLayout.Item>
          </GridLayout>
          <GridLayout>
            <GridLayout.Item 
              colStart={1} 
              colEnd={2} 
              rowStart={4} 
              rowEnd={5}
            >
              <h5 className={styles.headerFive}>selected</h5>
            </GridLayout.Item>
            <GridLayout.Item 
              colStart={2} 
              colEnd={4} 
              rowStart={1} 
              rowEnd={3}
            >

            </GridLayout.Item>
            <GridLayout.Item 
              colStart={2} 
              colEnd={3} 
              rowStart={3} 
              rowEnd={4}
            >

            </GridLayout.Item>
            <GridLayout.Item 
              colStart={4} 
              colEnd={5} 
              rowStart={1} 
              rowEnd={4}
            >
              <div className={styles.canStyle}>
                <Canvas className={styles.canvas}>
                  {/* Add some lighting to make the can look good */}
                  <ambientLight intensity={0.8} />
                  <directionalLight position={[10, 10, 5]} intensity={1.5} />
                  
                  {/* 
                    Place the InteractiveCan component inside the Canvas.
                    The `useFrame` hook inside the component will automatically
                    get the pointer data from this parent Canvas.
                  */}
                  <InteractiveCan flavor="fish" />
                </Canvas>
              </div>
            </GridLayout.Item>
            <GridLayout.Item 
              colStart={4} 
              colEnd={5} 
              rowStart={4} 
              rowEnd={5}
            >

            </GridLayout.Item>
          </GridLayout>
        </div>

        {/* <div className={styles.sectionContent}>
          <div className={styles.containerContent1}>
            <div>
              <h5 className={styles.headerFive}>ABOUT ME</h5>
              <div className={styles.headingContent}>
                <h3><span className={styles.blueText}>I’m a reflective and driven designer</span> who understands how <span className={styles.blueText}>creative and technical elements</span> come together to <span className={styles.blueText}>drive success</span> in projects and teams. </h3>
              </div>
            </div>
            <h5 className={styles.headerFive}>MY PROJECTS</h5>
          </div>
          
          <div className={styles.containerContent3}>
            <h5 className={styles.headerFive}>Featured</h5>
            <div className={styles.headingContent}>          
              <ProjectLayout
                videoSrc = "/media/cans/fishCanVideo.mp4"
                h4Title = "Decked Beer"
                description = "3D model integration"
                projectLink = "/pages/visual/projects/deckedBeer/"

                videoSrcTwo = "/media/blackHole/Clip1.mp4"
                h4TitleTwo = "Black Hole"
                descriptionTwo = "Motion Graphic and a coded web experience"
                projectLinkTwo = "/pages/motion/projects/blackHole/"
              />
            </div>
          </div>
        </div> */}
    </>
  );
}