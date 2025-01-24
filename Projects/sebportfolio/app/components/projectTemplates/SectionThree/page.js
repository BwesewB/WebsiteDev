import styles from "./sectionThree.module.css"
import ButtonRound from "../../uiComponents/buttonRound/page"

export default function SectionThree({
    textContent,
    externalLink,
    buttonTextColour,
    backgroundColor,

    textColour = "var(--white)",
    challengeHeader = "",
    challengeParagraph = "",
    solutionHeader = "",
    solutionParagraph = "",
}) {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.buttonRound}>
                    <div className={styles.buttonSticky}>
                        <ButtonRound 
                            textContent = {textContent}
                            externalLink = {externalLink}
                            buttonTextColour = {buttonTextColour}
                            backgroundColor = {backgroundColor}
                        />
                    </div>

                </div>
                <div className={styles.projectDescription} style={{ color: textColour }}>
                    <div className={styles.textContainer}>
                        <h4>{challengeHeader}</h4>
                        <p>{challengeParagraph}</p>
                    </div>
                    <div className={styles.textContainer}>
                        <h4>{solutionHeader}</h4>
                        <p>{solutionParagraph}</p>
                    </div>
                </div>
            </div>
        </>
    )
}