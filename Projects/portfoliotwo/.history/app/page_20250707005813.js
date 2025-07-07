"use client";

import styles from './styles/page.module.css';
import GridLayout from "@/components/atoms/gridLayout/gridLayout";
import InteractiveCanScene from "@/components/molecules/InteractiveCan/InteractiveCan";
import TextContainer from '@/components/atoms/textContainer/page';
import DynamicHover from '@/components/molecules/DynamicHover/DynamicHover';

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
              <DynamicHover>
                <img src="/media/cans/3cans1.png"/>
              </DynamicHover>
            </GridLayout.Item>
            <GridLayout.Item 
              colStart={2} 
              colEnd={3} 
              rowStart={3} 
              rowEnd={4}
            >
              h1
            </GridLayout.Item>
            <GridLayout.Item 
              colStart={4} 
              colEnd={5} 
              rowStart={1} 
              rowEnd={4}
            >
    <DynamicHover
      className={styles.canvasContainer}
      // Pass the functions to be called by DynamicHover
      onMouseEnter={() => hoverStartFunc.current && hoverStartFunc.current()}
      onMouseLeave={() => hoverEndFunc.current && hoverEndFunc.current()}
    >
      <InteractiveCanScene 
        // These refs allow the scene to "register" its functions with the parent
        onHoverStart={hoverStartFunc}
        onHoverEnd={hoverEndFunc}
      />
    </DynamicHover>
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