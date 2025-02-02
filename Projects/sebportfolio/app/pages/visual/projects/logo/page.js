import styles from "./logo.module.css"
import SectionFive from "../../../../components/projectTemplates/SectionFive/page"
import ProjectHero from "../../../../components/projectTemplates/projectHero/page"
import SectionOne from "../../../../components/projectTemplates/SectionOne/page"

export default function LogoPage({}) {
    return(
        <div className={styles.container}>
            <ProjectHero 
                projectName="Fugu"
                date="2024"
                videoSrc="/media/"
                toolsUsed="Adobe Illustrator"
                textColour="var(--black)"
            />
            <SectionOne 
                paragraphTitleText="Black hole is an interactive project that merges custom-designed After Effects assets with a 12-page interactive coded experience."
                textColour="var(--black)"
            />
            <SectionFive 
                textColour="var(--black)"
                challengeHeader="The Logo"
                challengeParagraph="The logo depicts a fugu, or pufferfish, chosen for its connection to craft and precision. Drawing inspiration from a passion for Japanese fish cutting, the design reflects the same focus and care required to handle this delicacy, representing a thoughtful and careful approach to creating work with attention to detail."
            />
        </div>
    )
}