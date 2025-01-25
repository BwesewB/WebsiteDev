import ProjectHero from "../../../../components/projectTemplates/projectHero/page"
import SectionFour from "../../../../components/projectTemplates/SectionFour/page"
import styles from "./taxes.module.css"

export default function Taxes ({

}) {
    return (
        <>
            <div className={styles.container}>
                <ProjectHero 
                    projectName="TAXES!"
                    date="2023-2024"
                    videoSrc="/videos/taxes/GOTTEM.mp4"
                    toolsUsed="After Effects"
                    textColour="var(--black)"
                />
                <SectionFour 
                    sectionHeader="hihi"
                    sectionParagraph="lorem ipusm msmssmssm"
                />
            </div>
        </>
    )
}