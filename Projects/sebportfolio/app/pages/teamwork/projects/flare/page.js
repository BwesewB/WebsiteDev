import styles from "./flare.module.css"
import ProjectHero from "@/app/components/projectTemplates/projectHero/page"
import SectionOne from "@/app/components/projectTemplates/SectionOne/page"
import SectionTwo from "@/app/components/projectTemplates/SectionTwo/page"
import SectionThree from "@/app/components/projectTemplates/SectionThree/page"
import SectionFour from "@/app/components/projectTemplates/SectionFour/page"
import SectionFive from "@/app/components/projectTemplates/SectionFive/page"

export default function Flare({}) {
    return (
        <div className={styles.container}>
            <ProjectHero 
                projectName="Flare"
                date="2024"
                imageSrc="/media/flare/MockupPhoneFlareCropped.png"
                toolsUsed="Adobe Illustrator / Adobe InDesign / After Effects / Figma / React.js"
                textColour="var(--black)"
                mediaWidth="80%"
            />
            <SectionOne 
                paragraphTitleText="Your BC wildfire safety app with weather updates, fire alerts, and related news all into one intuitive app."
            />
            <SectionFive />
        </div>
    )
}