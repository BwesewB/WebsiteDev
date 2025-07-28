"use client";

import styles from './styles/page.module.css';
import { useRef, useLayoutEffect } from 'react';
import GridLayout, { Item as GridLayoutItem } from "@/components/atoms/gridLayout/gridLayout";
import InteractiveCanScene from "@/components/molecules/InteractiveCan/InteractiveCan";
import TextContainer from '@/components/atoms/textContainer/page';
import MediaBlock from '@/components/molecules/MediaBlock/MediaBlock';
import ProjectCard from '@/components/templates/projectCard/projectCard';
import TitleLetterUp from '@/components/animations/Text/TitleLetterUp/titleLetterUp';
import Name from '@/components/atoms/name/Name';

import LayoutHero from '@/components/templates/LayoutHero/layoutHero';
import LayoutOne from '@/components/templates/Layout-1/layoutOne';
import LayoutTwo from '@/components/templates/Layout-2/layoutTwo';
import LayoutThree from '@/components/templates/Layout-3/layoutThree';
import LayoutFour from '@/components/templates/Layout-4/layoutFour';
import LayoutFive from '@/components/templates/Layout-5/layoutFive';
import LayoutSix from '@/components/templates/Layout-6/layoutSix';
import LayoutSeven from '@/components/templates/Layout-7/layoutSeven';
import LayoutEight from '@/components/templates/Layout-8/layoutEight';
import LayoutNine from '@/components/templates/Layout-9/layoutNine';
import MediaBlockOrChild from '@/components/molecules/MediaBlockOrChild/mediaBlockOrChild';


export default function Home() {
  const nameOuterRef = useRef(null);
  const homepageContentRef = useRef(null);

  useLayoutEffect(() => {
    if (!nameOuterRef.current || !homepageContentRef.current) return;

    const setContainerHeight = () => {
      const contentHeight = homepageContentRef.current.offsetHeight;
      console.log(`[HomePage] Measured content height: ${contentHeight}px. Applying this to Name's container.`);
      nameOuterRef.current.style.height = `${contentHeight}px`;
    };
    const timeoutId = setTimeout(setContainerHeight, 200);
    window.addEventListener('resize', setContainerHeight);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', setContainerHeight);
    };
  }, []);

  return (
    <>
        <div className={styles.topContainer}>
          <div className={styles.topContainerImage}>

          </div>
        </div>
        <Name isHomePage={true} nameOuterRef={nameOuterRef} />
        <div className="container" ref={homepageContentRef}>
          <GridLayout>
            <GridLayoutItem 
              colStart={1} 
              colEnd={4} 
              rowStart={4} 
              rowEnd={5}
            >
              <TitleLetterUp className={styles.headerz}>
                About Me
              </TitleLetterUp>
            </GridLayoutItem >
            <GridLayoutItem 
              colStart={3} 
              colEnd={5} 
              rowStart={1} 
              rowEnd={4}
            >
              <MediaBlockOrChild imageSrc="/images/knivesout.jpg" maxMediaHeight="80vh"/>
            </GridLayoutItem >
            <GridLayoutItem 
              colStart={2} 
              colEnd={3} 
              rowStart={1} 
              rowEnd={2}
            >
              <TextContainer
                paragraph="I’m a 19-year-old multidisciplinary designer from Vancouver. I do marketing, websites, 3D, and everything else in digital design. On the side as a hobby, I cut lots of fish."
                width="100%"
              />
            </GridLayoutItem >
          </GridLayout>
          <GridLayout>
            <GridLayoutItem 
              colStart={1} 
              colEnd={4} 
              rowStart={4} 
              rowEnd={5}
            >
              <TitleLetterUp className={styles.headerz}>
                Selected
              </TitleLetterUp>
            </GridLayoutItem >
            <GridLayoutItem 
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
            </GridLayoutItem >
            <GridLayoutItem 
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
                height="40vw"
              >
                <InteractiveCanScene/>
              </ProjectCard>
            </GridLayoutItem >
          </GridLayout>
          
          <LayoutHero 
            children={<InteractiveCanScene/>}
            imageSrc="/images/kissyfish.jpg"
            height='75vh'
            title="Suh"
            buttons={[
                { 
                    text: "Live Site", 
                    externalLink: "https://example.com/live-demo",
                    icon: "arrow" 
                },
                { 
                    text: "GitHub", 
                    externalLink: "https://github.com/my-repo",
                    icon: "github" 
                },
                { 
                    text: "Figma File", 
                    externalLink: "https://figma.com/file/...",
                    icon: "figma" 
                },
            ]}
            subHeader="the greatest"
            paragraph="Lorem ipsum dolor sit amet consectetur. Elementum varius tristique aliquet at sed vestibulum adipiscing a. Cursus nunc tempus dictum tempus nisl varius cursus. Imperdiet imperdiet nulla mattis pellentesque imperdiet id. Nibh et ultricies faucibus gravida. Non ullamcorper diam dictumst blandit condimentum eu orci. Felis nec massa ac malesuada condimentum blandit tristique gravida. Morbi est nulla leo convallis habitasse adipiscing integer."
          />
          <LayoutOne
            header="Lorem Ipsum Dolor Siet Ameit"
            paragraph="Lorem ipsum dolor sit amet consectetur. Elementum varius tristique aliquet at sed vestibulum adipiscing a. Cursus nunc tempus dictum tempus nisl varius cursus. Imperdiet imperdiet nulla mattis pellentesque imperdiet id. Nibh et ultricies faucibus gravida. Non ullamcorper diam dictumst blandit condimentum eu orci. Felis nec massa ac malesuada condimentum blandit tristique gravida. Morbi est nulla leo convallis habitasse adipiscing integer."
            imageSrc="/images/kissyfish.jpg"
            switch={true}
            children={<InteractiveCanScene/>}
          />
          <LayoutTwo
            header="Lorem Ipsum Dolor Siet Ameit"
            paragraph="Lorem ipsum dolor sit amet consectetur. Elementum varius tristique aliquet at sed vestibulum adipiscing a. Cursus nunc tempus dictum tempus nisl varius cursus. Imperdiet imperdiet nulla mattis pellentesque imperdiet id."
            imageSrc="/images/kissyfish.jpg"
            children={<InteractiveCanScene/>}
          />
          <LayoutThree
            header="Lorem Ipsum Dolor Siet Ameit"
            paragraph="Lorem ipsum dolor sit amet consectetur. Elementum varius tristique aliquet at sed vestibulum adipiscing a. Cursus nunc tempus dictum tempus nisl varius cursus. Imperdiet imperdiet nulla mattis pellentesque imperdiet id. Nibh et ultricies faucibus gravida. Non ullamcorper diam dictumst blandit condimentum eu orci. Felis nec massa ac malesuada condimentum blandit tristique gravida. "
            imageSrc1="/images/kissyfish.jpg"
            imageSrc2="/images/kissyfish.jpg"
            childrenSlotOne={<InteractiveCanScene/>}
            childrenSlotTwo={<InteractiveCanScene/>}
          >
            <InteractiveCanScene/>
          </LayoutThree>
          <LayoutFour
            header="Lorem Ipsum Dolor Siet Ameit"
            paragraph1="Lorem ipsum dolor sit amet consectetur."
            paragraph2="Elementum varius tristique aliquet at sed vestibulum adipiscing a."
            paragraph3=" Cursus nunc tempus dictum tempus nisl varius cursus."
            imageSrc="/images/kissyfish.jpg"
            children={<InteractiveCanScene/>}
          />
          <LayoutFive
            header="Lorem Ipsum Dolor Siet Ameit"
            paragraph="Lorem ipsum dolor sit amet consectetur. Elementum varius tristique aliquet at sed vestibulum adipiscing a. Cursus nunc tempus dictum tempus nisl varius cursus. Imperdiet imperdiet nulla mattis pellentesque imperdiet id. Nibh et ultricies faucibus gravida. Non ullamcorper diam dictumst blandit condimentum eu orci. Felis nec massa ac malesuada condimentum blandit tristique gravida. Morbi est nulla leo convallis habitasse adipiscing integer."
            imageSrc="/images/kissyfish.jpg"
            children={<InteractiveCanScene/>}
          />
          <LayoutSix
            header="Lorem Ipsum Dolor Siet Ameit"
            paragraph="Lorem ipsum dolor sit amet consectetur. Elementum varius tristique aliquet at sed vestibulum adipiscing a. Cursus nunc tempus dictum tempus nisl varius cursus. Imperdiet imperdiet nulla mattis pellentesque imperdiet id. Nibh et ultricies faucibus gravida. Non ullamcorper diam dictumst blandit condimentum eu orci. Felis nec massa ac malesuada condimentum blandit tristique gravida. Morbi est nulla leo convallis habitasse adipiscing integer."
            imageSrc="/images/kissyfish.jpg"
            children={<InteractiveCanScene/>}
          />
          <LayoutSeven
            header= "Lorem Ipsum Dolor Siet Ameit"
            paragraph= "Lorem ipsum dolor sit amet consectetur. Elementum varius tristique aliquet at sed vestibulum adipiscing a. Cursus nunc tempus dictum tempus nisl varius cursus. Imperdiet imperdiet nulla mattis pellentesque imperdiet id. Nibh et ultricies faucibus gravida. Non ullamcorper diam dictumst blandit condimentum eu orci. Felis nec massa ac malesuada condimentum blandit tristique gravida. Morbi est nulla leo convallis habitasse adipiscing integer."
            mediaItems={[
                { imageSrc: "/images/kissyfish.jpg" },
                { imageSrc: "/images/kissyfish.jpg" },
                { imageSrc: "/images/kissyfish.jpg" }
            ]}
            mediaCarouselWidth="90vw"
          />
          <LayoutEight 
            header="Lorem Ipsum Dolor Siet Ameit"
            paragraph="Lorem ipsum dolor sit amet consectetur. Elementum varius tristique aliquet at sed vestibulum adipiscing a. Cursus nunc tempus dictum tempus nisl varius cursus. Imperdiet imperdiet nulla mattis pellentesque imperdiet id. Nibh et ultricies faucibus gravida. Non ullamcorper diam dictumst blandit condimentum eu orci. Felis nec massa ac malesuada condimentum blandit tristique gravida. Morbi est nulla leo convallis habitasse adipiscing integer."
            imageSrc="/images/kissyfish.jpg"
            children={<InteractiveCanScene/>}
          />
          <LayoutNine
            header="Lorem Ipsum Dolor Siet Ameit"
            paragraph="Lorem ipsum dolor sit amet consectetur. Elementum varius tristique aliquet at sed vestibulum adipiscing a. Cursus nunc tempus dictum tempus nisl varius cursus. Imperdiet imperdiet nulla mattis pellentesque imperdiet id. Nibh et ultricies faucibus gravida. Non ullamcorper diam dictumst blandit condimentum eu orci. Felis nec massa ac malesuada condimentum blandit tristique gravida. Morbi est nulla leo convallis habitasse adipiscing integer."
            imageSrc1="/images/kissyfish.jpg"
            imageSrc2="/images/kissyfish.jpg"
            childrenSlotOne={<InteractiveCanScene/>}
            childrenSlotTwo={<InteractiveCanScene/>}
          />

          {/* <div style={{height: "100vh", border: "1px solid red"}}></div> */}
        </div>
    </>
  );
}