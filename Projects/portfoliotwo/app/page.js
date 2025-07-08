"use client";

import styles from './styles/page.module.css';
import GridLayout from "@/components/atoms/gridLayout/gridLayout";
import InteractiveCanScene from "@/components/molecules/InteractiveCan/InteractiveCan";
import TextContainer from '@/components/atoms/textContainer/page';
import DynamicHover from '@/components/molecules/DynamicHover/DynamicHover';
import MediaBlock from '@/components/molecules/MediaBlock/MediaBlock';
import Link from 'next/link';

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
              <DynamicHover>
                <MediaBlock imageSrc=""/>
                {/* <img src="/media/flare/flarePersona1.webp"/> */}
              </DynamicHover>
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
              <div className={styles.imageHeaderContainer}>
                <DynamicHover
                  link="/works/blackHole"
                  className={styles.mediaWrapper} 
                >
                  <MediaBlock videoSrc="/media/blackHole/Clip1.mp4"/>
                </DynamicHover>
                  <TextContainer
                    header="Black Hole" 
                  />
              </div>
            </GridLayout.Item>
            <GridLayout.Item 
              colStart={4} 
              colEnd={5} 
              rowStart={1} 
              rowEnd={4}
            >
              <div className={styles.imageHeaderContainer}>
                <DynamicHover
                  scale={1}
                  movementFactor={0}
                  link="/works/deckedBeer"
                  className={styles.mediaWrapper} 
                >
                  {/* <InteractiveCanScene/> */}
                </DynamicHover>
                  <TextContainer
                    header="Decked Beer" 
                  />
              </div>
            </GridLayout.Item>
          </GridLayout>
        </div>
    </>
  );
}