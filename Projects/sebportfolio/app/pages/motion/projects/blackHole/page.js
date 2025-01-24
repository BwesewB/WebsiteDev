import styles from "./blackHole.module.css";
import ProjectHero from "@/app/components/projectTemplates/projectHero/page.js";

export default function blackHole() {
    return (
        <div className={styles.container}>
            <ProjectHero 
                projectName="Black Hole"
                date="2023-2024"
                videoSrc="/videos/blackHole/Revised Final.mp4"
            />
        </div>
    );
}