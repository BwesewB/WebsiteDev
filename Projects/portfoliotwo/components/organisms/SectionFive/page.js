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
                className={styles.headerSection}
                textColour={textColour}
            />
            <TextContainer
                paragraph={challengeParagraph}
                className={styles.projectDescription}
                textColour={textColour}
            />
        </section>
    )
}