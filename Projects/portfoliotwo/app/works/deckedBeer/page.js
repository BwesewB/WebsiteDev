"use client"

import styles from "./decked.module.css"
import ProjectHero from "@/components/templates/projectHero/page"
import LargeTextSection from "@/components/templates/LargeTextSection/largeTextSection"
import SectionTwo from "@/components/templates/SectionTwo/page"
import SectionEight from "@/components/templates/SectionEight/page"
import TwoColumnMediaLayout from "@/components/templates/TwoColumnMediaLayout/page"
import ViewCanvas from "./cans/page"

export default function DeckedBeer({}) {
    return (
        <div className="container">
            <div className={styles.canvasArea}>
                <ProjectHero 
                    projectName="Decked Beer"
                    date="2024"
                    toolsUsed="Adobe Illustrator / Adobe Photoshop / Blender / Three.js"
                />
                <ViewCanvas />
            </div>
            <LargeTextSection 
                paragraphTitleText="Decked is a premium lager crafted for fishermen, delivering a refined and refreshing taste."
            />
            <section className="sectionContainer">
                <TwoColumnMediaLayout
                    textSide="left"
                    textBlocks={[ // This content goes to the LEFT column
                        { 
                            header: "Graphics", 
                        }
                    ]}

                    mediaColumnItems={[
                        {
                            type: 'text',
                            items: [
                                {
                                    paragraph: 'The labels were thoughtfully crafted for fishermen, incorporating subtle yet meaningful design elements reinforcing the theme. Each label includes step-by-step instructions for crafting a hook from the cans pin and features a fishy "DO NOT FEED THE FISH" graphic. To accommodate distribution in Canada, both French and English were integrated for accessibility.'
                                }
                            ]
                        },
                    ]}
                />
                <SectionEight
                    imageOne="/media/cans/noFeedFish.svg"
                    imageTwo="/media/cans/hookInstructions.svg"
                    scale="50%"
                />
            </section>
            <TwoColumnMediaLayout
                textSide="left"

                textBlocks={[ 
                    { 
                        header: "Labels", 
                        paragraph: "Decked Lager is a premium brew designed with fishermen in mind, featuring three distinct label variations—Seaweed, Crab, and Fish. Each design draws from maritime elements, reinforcing the brand’s connection to the fishing community. With a focus on quality and craftsmanship, Decked delivers a refined lager experience while embracing the culture of those who spend their days on the water." 
                    }
                ]}

                mediaColumnItems={[
                    { imageSrc: "/media/cans/labels/Fish@2x.png" },
                    { imageSrc: "/media/cans/labels/Crab@2x.png" },
                    { imageSrc: "/media/cans/labels/Seaweed@2x.png" }
                ]}

                stickyConfig={{ column: 'left'}}
                
                textColour="var(--black)"
            />
            <SectionTwo 
                videoSrc="/media/cans/fishCanVideo.mp4"
            />
            <LargeTextSection 
                paragraphTitleText="Blender was used to bring Decked to life, creating realistic product visuals that showcased the custom label designs and branding."
            />
            <SectionEight
                imageOne="/media/cans/3cans1.png"
                imageTwo="/media/cans/3cans2.png"
            />
        </div>
    )
}