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
            <TextContainer
                header={challengeHeader}
                paragraph={challengeParagraph}
                className={styles.headerSection}
                textColour={textColour}
            />
            <div className={styles.projectDescription} style={{ color: textColour }}>
                <p>{challengeParagraph}</p>
            </div>
        </section>
    )
}