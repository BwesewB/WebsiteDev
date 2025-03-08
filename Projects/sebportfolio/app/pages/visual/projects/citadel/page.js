"use client"

import styles from "./gate.module.css"
import ProjectHero from "../../../../components/projectTemplates/projectHero/page"
import SectionOne from "../../../../components/projectTemplates/SectionOne/page"
import SectionSix from "@/app/components/projectTemplates/SectionSix/page"
import SectionTwo from "../../../../components/projectTemplates/SectionTwo/page"
import SectionEight from "@/app/components/projectTemplates/SectionEight/page"
import SectionFive from "@/app/components/projectTemplates/SectionFive/page"

export default function Citadel({}) {
    return (
        <div className="container">
            <ProjectHero 
                projectName="Citadel"
                date="2022-2025"
                toolsUsed="Shapr3D / Blender / Adobe Photoshop / Adobe After Effects"
                imageSrc="/media/citadel/gate.webp"
            />
            <SectionOne 
                paragraphTitleText="A surreal architectural landscape inspired by Zdzisław Beksiński's 1983 painting in Shapr3D and blender"
            />
            <section className="sectionContainer">
                <SectionFive 
                    challengeHeader = "Model"
                    challengeParagraph = 'Using Shapr3D, the building was created by starting with a large plane, from which various shapes were subtracted to form intricate holes. This plane was then duplicated, and volumes were added to build the final structure, giving depth and complexity to the architecture. This method allowed for the creation of a surreal, imposing design that aligns with the intended atmosphere of the piece.'
                />
                <SectionEight
                    imageOne="/media/citadel/Shapr3DModel1.webp"
                    imageTwo="/media/citadel/Shapr3DModel2.webp"
                />
            </section>
            <SectionSix 
                challengeHeader = "Import to Blender"
                challengeParagraph = ""
                sticky = {false}

                imageOne = "/media/cans/labels/Fish@2x.png"
            />
            <SectionSix 
                challengeHeader = "Labels"
                challengeParagraph = "Decked Lager is a premium brew designed with fishermen in mind, featuring three distinct label variations—Seaweed, Crab, and Fish. Each design draws from maritime elements, reinforcing the brand’s connection to the fishing community. With a focus on quality and craftsmanship, Decked delivers a refined lager experience while embracing the culture of those who spend their days on the water."

                imageOne = "/media/cans/labels/Fish@2x.png"
                imageTwo = "/media/cans/labels/Crab@2x.png"
                imageThree = "/media/cans/labels/Seaweed@2x.png"
            />
            <SectionTwo 
                videoSrc=""
            />
            <SectionOne 
                paragraphTitleText=""
            />
        </div>
    )
}