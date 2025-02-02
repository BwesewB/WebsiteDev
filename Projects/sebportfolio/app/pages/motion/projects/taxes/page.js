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
                    videoSrc="/media/taxes/GOTTEM.mp4"
                    toolsUsed="After Effects"
                    textColour="var(--black)"
                />
                <SectionFour 
                    sectionHeader="Taxation Frustration"
                    sectionParagraph="Turning 18 introduced the unexpected challenge of taxes—an experience both frustrating and complex. To capture this, a lighthearted and comedic video was crafted to poke fun at the struggles of navigating taxes as a young adult with a light and colorful theme. The creative direction shifted from using complex graphics to incorporating video clips, with graphic elements setting up what would unfold in the video. This decision allowed for smoother storytelling and dynamic pacing, providing a fresh and engaging way to turn a stressful situation into something relatable and entertaining."
                    endTrigger="bottom bottom"
                />
            </div>
        </>
    )
}