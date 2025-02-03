"use client"

import styles from "./sectionSix.module.css"
import SectionTwo from "../SectionTwo/page"

export default function SectionSix({
    textColour = "var(--black)",
    challengeHeader = "Title",
    challengeParagraph = "Paragraph Content",

    imageOne,
    imageTwo,
    imageThree,
    videoOne,
    videoTwo,
    videoThree,

}) {

    return (
        <section className={styles.container}>
            <div className={styles.textSection} style={{ color: textColour }}>
                <div className={styles.textSticky}>
                    <h4>{challengeHeader}</h4>
                    <p>{challengeParagraph}</p>
                </div>
            </div>
            <div className={styles.projectImages} style={{ color: textColour }}>
                <div className={styles.mediaContainer}>              
                    {(imageOne || videoOne) && (
                        <SectionTwo imageSrc={imageOne} videoSrc={videoOne} />
                    )}
                    {(imageTwo || videoTwo) && (
                        <SectionTwo imageSrc={imageTwo} videoSrc={videoTwo} />
                    )}
                    {(imageThree || videoThree) && (
                        <SectionTwo imageSrc={imageThree} videoSrc={videoThree} />
                    )}
                </div>
            </div>
        </section>
    )
}