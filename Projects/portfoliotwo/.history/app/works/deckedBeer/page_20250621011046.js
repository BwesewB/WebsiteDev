"use client"

import styles from "./decked.module.css"
import ProjectHero from "@/components/templates/projectHero/page"
import SectionOne from "@/components/templates/SectionOne/page"
import SectionTwo from "@/components/templates/SectionTwo/page"
import SectionFive from "@/components/organisms/SectionFive/page"
import SectionSix from "@/components/templates/SectionSix/page"
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
            <SectionOne 
                paragraphTitleText="Decked is a premium lager crafted for fishermen, delivering a refined and refreshing taste."
            />
            <section className="sectionContainer">
                <SectionFive 
                    challengeHeader = "Graphics"
                    challengeParagraph = 'The labels were thoughtfully crafted for fishermen, incorporating subtle yet meaningful design elements reinforcing the theme. Each label includes step-by-step instructions for crafting a hook from the cans pin and features a fishy "DO NOT FEED THE FISH" graphic. To accommodate distribution in Canada, both French and English were integrated for accessibility.'
                />
                <SectionEight
                    imageOne="/media/cans/noFeedFish.svg"
                    imageTwo="/media/cans/hookInstructions.svg"
                    scale="50%"
                />
            </section>
            <SectionSix 
                challengeHeader = "Labels"
                challengeParagraph = "Decked Lager is a premium brew designed with fishermen in mind, featuring three distinct label variations—Seaweed, Crab, and Fish. Each design draws from maritime elements, reinforcing the brand’s connection to the fishing community. With a focus on quality and craftsmanship, Decked delivers a refined lager experience while embracing the culture of those who spend their days on the water."

                imageOne = "/media/cans/labels/Fish@2x.png"
                imageTwo = "/media/cans/labels/Crab@2x.png"
                imageThree = "/media/cans/labels/Seaweed@2x.png"
            />
            <SectionTwo 
                videoSrc="/media/cans/fishCanVideo.mp4"
            />
            <SectionOne 
                paragraphTitleText="Blender was used to bring Decked to life, creating realistic product visuals that showcased the custom label designs and branding."
            />
            <SectionEight
                imageOne="/media/cans/3cans1.png"
                imageTwo="/media/cans/3cans2.png"
            />
        </div>
    )
}