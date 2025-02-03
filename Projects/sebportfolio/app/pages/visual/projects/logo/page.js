import styles from "./logo.module.css"
import SectionFive from "../../../../components/projectTemplates/SectionFive/page"
import ProjectHero from "../../../../components/projectTemplates/projectHero/page"
import SectionOne from "../../../../components/projectTemplates/SectionOne/page"
import SectionTwo from "../../../../components/projectTemplates/SectionTwo/page"

export default function LogoPage({}) {
    return(
        <div className={styles.container}>
            <ProjectHero 
                projectName="Fugu"
                date="2024"
                imageSrc="/media/logo/LogoBlue.png"
                mediaWidth="30%"
                toolsUsed="Adobe Illustrator"
            />
            <SectionOne 
                paragraphTitleText="Preparing fugu requires precision and mastery, with chefs undergoing years of specialized training to safely practice this art"
            />
            <div className={styles.fullWidth}>
                <div style={{width:"60%"}}>
                    <SectionTwo
                        imageSrc="/media/logo/LogoDiameter.png"
                    />
                </div>
            </div>
            <SectionFive 
                challengeHeader="The Logo"
                challengeParagraph="The logo depicts a fugu, or pufferfish, chosen for its connection to craft and precision. Drawing inspiration from a passion for Japanese fish cutting, the design reflects the same focus and care required to handle this delicacy, representing a thoughtful and careful approach to creating work with attention to detail."
            />
            <div className={styles.fullWidth}>
                <div style={{width:"50%"}}>
                    <SectionTwo
                        imageSrc="/media/logo/LogoMeasurement.png"
                    />
                </div>
            </div>
            <SectionTwo
                imageSrc="/media/logo/LogoCreation.png"
            />
        </div>
    )
}