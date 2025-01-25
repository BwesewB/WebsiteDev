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
                    sectionHeader="Taxation Frustration"
                    sectionParagraph="Turning 18 came with an unexpected challenge—taxes! Faced with my first-ever tax bill, I quickly realized just how complicated and frustrating the process could be. I set out to create a lighthearted and comedic video that poked fun at the struggles of navigating taxes as a young adult. This project not only allowed me to develop my motion graphics skills but also gave me a creative outlet to turn a stressful situation into something fun for everyone to have a laugh at."
                    endTrigger="bottom bottom"
                />
            </div>
        </>
    )
}