import { Color } from "three"
import styles from "./projectHero.module.css"
import SectionTwo from "../SectionTwo/page"

export default function ProjectHero ({
    projectName = "",
    date = "",
    imageSrc = "",
    videoSrc = "",
    toolsUsed = "",
    textColour = "var(--black)"
}) {

    return(
        <>
            <div className={styles.bodyWidth}>
                <div 
                    className={styles.textContainer}
                >
                    <h1 style={{ color: textColour }}> {projectName} </h1>
                    <div className={styles.textHeader}>
                        <p style={{ color: textColour }}>{toolsUsed}</p>
                        <p style={{ color: textColour }}>{date}</p>
                    </div>
                </div>

                <SectionTwo 
                    imageSrc={imageSrc}
                    videoSrc={videoSrc}
                />
            </div>
        </>
    )
}