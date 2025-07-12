"use client";

import styles from './styles/page.module.css';
import GridLayout from "@/components/atoms/gridLayout/gridLayout";
import InteractiveCanScene from "@/components/molecules/InteractiveCan/InteractiveCan";
import TextContainer from '@/components/atoms/textContainer/page';
import DynamicHover from '@/components/molecules/DynamicHover/DynamicHover';
import MediaBlock from '@/components/molecules/MediaBlock/MediaBlock';
import ProjectCard from '@/components/templates/projectCard/projectCard';
import LayoutOne from '@/components/templates/Layout-1/layoutOne';
import LayoutTwo from '@/components/templates/Layout-2/layoutTwo';
import LayoutThree from '@/components/templates/Layout-3/layoutThree';
import LayoutFour from '@/components/templates/Layout-4/layoutFour';
import LayoutFive from '@/components/templates/Layout-5/layoutFive';
import LayoutSix from '@/components/templates/Layout-6/layoutSix';
import LayoutSeven from '@/components/templates/Layout-7/layoutSeven';
import LayoutEight from '@/components/templates/Layout-8/layoutEight';

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
              <h2 className={styles.headerz}>ABOUT ME</h2>
            </GridLayout.Item>
            <GridLayout.Item 
              colStart={3} 
              colEnd={4} 
              rowStart={1} 
              rowEnd={4}
            >
              <MediaBlock imageSrc="/images/knivesout.jpg"/>
            </GridLayout.Item>
            <GridLayout.Item 
              colStart={2} 
              colEnd={3} 
              rowStart={1} 
              rowEnd={2}
            >
              <TextContainer
                paragraph="I’m a 19-year-old multidisciplinary designer from Vancouver. I do marketing, websites, 3D, and everything else in digital design. On the side as a hobby, I cut lots of fish."
                width="100%"
              />
            </GridLayout.Item>
          </GridLayout>
          <GridLayout>
            <GridLayout.Item 
              colStart={1} 
              colEnd={2} 
              rowStart={4} 
              rowEnd={5}
            >
              <h2>selected</h2>
            </GridLayout.Item>
            <GridLayout.Item 
              colStart={2} 
              colEnd={4} 
              rowStart={1} 
              rowEnd={3}
            >
              <ProjectCard
                link="/works/blackHole"
                header="Black Hole"
                videoSrc="/media/blackHole/Clip1.mp4"
              />
            </GridLayout.Item>
            <GridLayout.Item 
              colStart={4} 
              colEnd={5} 
              rowStart={1} 
              rowEnd={4}
            >
              <ProjectCard
                scale={1}
                startingScale={1}
                movementFactor={0}
                link="/works/deckedBeer"
                header="Decked Beer"
              >
                <InteractiveCanScene/>
              </ProjectCard>
            </GridLayout.Item>
          </GridLayout>
          <LayoutOne>
            {/* <InteractiveCanScene/> */}
          </LayoutOne>
          <LayoutTwo/>
          <LayoutThree/>
          <LayoutFour/>
          <LayoutFive/>
          <LayoutSix/>
          <LayoutSeven/>
          <LayoutEight/>
        </div>
    </>
  );
}