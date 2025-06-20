"use client"

import styles from "./sectionFive.module.css"
import TextContainer from "@/components/molecules/textContainer/page"

export default function SectionFive({
    textColour = "var(--black)",
    challengeHeader = "Title",
    challengeParagraph = "Paragraph Content",
}) {

    return (
        <section className={styles.container}>
            <div className={styles.headerSection} style={{ color: textColour }}>
                <h4>{challengeHeader}</h4>
            </div>
            <div className={styles.projectDescription} style={{ color: textColour }}>
                <p>{challengeParagraph}</p>
            </div>
        </section>
    )
}