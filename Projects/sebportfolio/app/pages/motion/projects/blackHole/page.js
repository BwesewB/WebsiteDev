import SectionOne from "../../../../components/projectTemplates/SectionOne/page";
import SectionTwo from "../../../../components/projectTemplates/SectionTwo/page";
import styles from "./blackHole.module.css";
import ProjectHero from "@/app/components/projectTemplates/projectHero/page.js";

export default function blackHole() {
    return (
        <div className={styles.container}>
            <ProjectHero 
                projectName="Black Hole"
                date="2023-2024"
                videoSrc="/videos/blackHole/Revised Final.mp4"
                toolsUsed="After Effects, Illustrator, GSAP, Next.js "
                textColour="var(--white)"
            />
            <SectionOne 
                paragraphTitleText="Black hole is an interactive project that merges custom-designed After Effects assets with a 12-page interactive coded experience."
                textColour="var(--white)"
            />
            <SectionTwo 
                videoSrc="/videos/blackHole/Clip12andReverse.mp4"
            />
        </div>
    );
}