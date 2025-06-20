import styles from "./sectionSeven.module.css"

export default function SectionSeven({
    textColour = "var(--black)",
    challengeHeader = "Title",
    challengeParagraph = "Paragraph Content",
    solutionHeader = "",
    solutionParagraph = "",

}) {

    return (
        <section className={styles.container}>
            <div className={styles.leftSection} style={{ color: textColour }}>
                <h4>{challengeHeader}</h4>
                <p>{challengeParagraph}</p>
            </div>
            <div className={styles.rightSection} style={{ color: textColour }}>            
                <h4>{solutionHeader}</h4>
                <p>{solutionParagraph}</p>
            </div>
        </section>
    )
}