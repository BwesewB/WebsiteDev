import { Color } from "three"
import styles from "./projectHero.module.css"
import SectionTwo from "../SectionTwo/page"

export default function ProjectHero ({
    projectName = "",
    date = "",
    imageSrc = "",
    videoSrc = "",
    initialMute,
    toolsUsed = "",
    textColour = "var(--black)"
}) {

    return(
        <>
            <div className={styles.bodyWidth}>
                <div className={styles.textContainer} style={{ color: textColour }}>
                    <h1> {projectName} </h1>
                    <div className={styles.textHeader}>
                        <p>{toolsUsed}</p>
                        <p>{date}</p>
                    </div>
                </div>
                <div 
                    className={`${styles.sectionTwoContainer} ${(imageSrc || videoSrc) ? '' : styles.hidden}`}
                >
                    {(imageSrc || videoSrc) && (
                        <SectionTwo 
                            imageSrc={imageSrc}
                            videoSrc={videoSrc}
                            initialMute={initialMute}
                        />
                    )}
                </div>
            </div>
        </>
    )
}