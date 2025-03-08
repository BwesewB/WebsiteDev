"use client"

import styles from "./gate.module.css"
import ProjectHero from "../../../../components/projectTemplates/projectHero/page"
import SectionOne from "../../../../components/projectTemplates/SectionOne/page"
import SectionSix from "@/app/components/projectTemplates/SectionSix/page"
import SectionTwo from "../../../../components/projectTemplates/SectionTwo/page"
import SectionEight from "@/app/components/projectTemplates/SectionEight/page"
import SectionFive from "@/app/components/projectTemplates/SectionFive/page"

export default function DeckedBeer({}) {
    return (
        <div className="container">
            <ProjectHero 
                projectName="Gate"
                date="2022-2025"
                toolsUsed="Shapr3D / Blender / Adobe Photoshop / Adobe After Effects"
                imageSrc="/media/gate/gate.webp"
            />
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
        </div>
    )
}