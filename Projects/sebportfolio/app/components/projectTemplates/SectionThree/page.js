import styles from "./sectionThree.module.css"
import ButtonRound from "../../uiComponents/buttonRound/page"

export default function SectionThree({
    textContent,
    externalLink,
    textColour,
    backgroundColor,
    challengeHeader = "",
    challengeParagraph = "",
    solutionHeader = "",
    solutionParagraph = "",
}) {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.buttonRound}>
                    <ButtonRound 
                        textContent = {textContent}
                        externalLink = {externalLink}
                        textColour = {textColour}
                        backgroundColor = {backgroundColor}
                    />
                </div>
                <div className={styles.projectDescription}>
                    <div className={styles.challenge}>
                        <h5>{challengeHeader}</h5>
                        <p>{challengeParagraph}</p>
                    </div>
                    <div className={styles.solution}>
                        <h5>{solutionHeader}</h5>
                        <p>{solutionParagraph}</p>
                    </div>
                </div>
            </div>
        </>
    )
}