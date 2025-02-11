"use client"

import styles from "./decked.module.css"
import ProjectHero from "../../../../components/projectTemplates/projectHero/page"
import SectionOne from "../../../../components/projectTemplates/SectionOne/page"
import SectionSix from "@/app/components/projectTemplates/SectionSix/page"
import ViewCanvas from "./cans/page"
import SectionTwo from "../../../../components/projectTemplates/SectionTwo/page"

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
            <SectionSix 
                challengeHeader = "Labels"
                challengeParagraph = 'The labels were thoughtfully crafted for fishermen, incorporating subtle yet meaningful design elements reinforcing the theme. Each label includes step-by-step instructions for crafting a hook from the cans pin and features a fishy "DO NOT FEED THE FISH" graphic. To accommodate distribution in Canada, both French and English were integrated for accessibility.'

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
            <div className={styles.sectionTwoSideBySide}>
                <SectionTwo 
                    imageSrc="/media/cans/3cans1.png"
                />
                <SectionTwo 
                    imageSrc="/media/cans/3cans2.png"
                />
            </div>
        </div>
    )
}