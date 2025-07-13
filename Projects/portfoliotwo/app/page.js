"use client";

import styles from './styles/page.module.css';
import GridLayout from "@/components/atoms/gridLayout/gridLayout";
import InteractiveCanScene from "@/components/molecules/InteractiveCan/InteractiveCan";
import TextContainer from '@/components/atoms/textContainer/page';
import MediaBlock from '@/components/molecules/MediaBlock/MediaBlock';
import ProjectCard from '@/components/templates/projectCard/projectCard';
import LayoutHero from '@/components/templates/LayoutHero/layoutHero';
import LayoutOne from '@/components/templates/Layout-1/layoutOne';
import LayoutTwo from '@/components/templates/Layout-2/layoutTwo';
import LayoutThree from '@/components/templates/Layout-3/layoutThree';
import LayoutFour from '@/components/templates/Layout-4/layoutFour';
import LayoutFive from '@/components/templates/Layout-5/layoutFive';
import LayoutSix from '@/components/templates/Layout-6/layoutSix';
import LayoutSeven from '@/components/templates/Layout-7/layoutSeven';


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
            children={<InteractiveCanScene/>}
          />
          <LayoutTwo
            header="Lorem Ipsum Dolor Siet Ameit"
            paragraph1="Lorem ipsum dolor sit amet consectetur. Elementum varius tristique aliquet at sed vestibulum adipiscing a."
            paragraph2="Cursus nunc tempus dictum tempus nisl varius cursus. Imperdiet imperdiet nulla mattis pellentesque imperdiet id."
            imageSrc="/images/kissyfish.jpg"
            children={<InteractiveCanScene/>}
          />
          <LayoutThree
            header="Lorem Ipsum Dolor Siet Ameit"
            paragraph="Lorem ipsum dolor sit amet consectetur. Elementum varius tristique aliquet at sed vestibulum adipiscing a. Cursus nunc tempus dictum tempus nisl varius cursus. Imperdiet imperdiet nulla mattis pellentesque imperdiet id. Nibh et ultricies faucibus gravida. Non ullamcorper diam dictumst blandit condimentum eu orci. Felis nec massa ac malesuada condimentum blandit tristique gravida. Morbi est nulla leo convallis habitasse adipiscing integer."
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
          {/* <div style={{height: "100vh", border: "1px solid red"}}></div> */}
        </div>
    </>
  );
}