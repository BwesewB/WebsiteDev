import { Color } from "three"
import styles from "./projectHero.module.css"
import SectionTwo from "../SectionTwo/page"

export default function ProjectHero ({
    projectName = "",
    projectRole,
    date = "",
    imageSrc = "",
    videoSrc = "",
    mediaWidth = "100%",
    initialMute,
    toolsUsed = "",
    textColour = "var(--black)"
}) {

    return(
        <section className={styles.bodyWidth}>
            <div className={styles.textContainer} style={{ color: textColour }}>
                <h1>{projectName}</h1>
                { projectRole && <h5 className={styles.projectRole}>Role: {projectRole}</h5> }
                <div className={styles.textHeader}>
                    <p>{toolsUsed}</p>
                    <p>{date}</p>
                </div>
            </div>
            <div className={styles.mediaContainer}>
                <div 
                    className={`${styles.sectionTwoContainer} ${(imageSrc || videoSrc) ? '' : styles.hidden}`}
                    style={{width: mediaWidth}}
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
        </section>
    )
}