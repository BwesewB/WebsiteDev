"use client"

import styles from "./sectionSix.module.css"
import SectionTwo from "../SectionTwo/page"
import VisitButton from "../../uiComponents/visitButton/page"
import SourceCodeButton from "../../uiComponents/sourceCodeButton/page"
import FigmaButton from "../../uiComponents/figmaButton/page"

export default function SectionSix({
    textColour = "var(--black)",
    challengeHeader = "Title",
    challengeParagraph = "Paragraph Content",
    sticky = true,

    externalLinkVisit,
    buttonContentColourVisit,
    backgroundColorVisit,

    externalLinkCode,
    buttonContentColourCode,
    backgroundColorCode,

    externalLinkFigma,
    buttonContentColourFigma,
    backgroundColorFigma,
    figma,

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
                <div className={styles.textSticky} style={{ position: sticky ? "sticky" : "relative" }}>
                    <h4>{challengeHeader}</h4>
                    <p>{challengeParagraph}</p>
                    {externalLinkVisit && (
                        <VisitButton
                            externalLink={externalLinkVisit}
                            buttonContentColour={buttonContentColourVisit}
                            backgroundColor={backgroundColorVisit}
                        />
                    )}
                    {externalLinkCode && (
                        <SourceCodeButton
                            externalLink={externalLinkCode}
                            buttonContentColour={buttonContentColourCode}
                            backgroundColor={backgroundColorCode}
                        />
                    )}
                    {externalLinkFigma && (
                        <FigmaButton
                            externalLink={externalLinkFigma}
                            buttonContentColour={buttonContentColourFigma}
                            backgroundColor={backgroundColorFigma}
                            figma={figma}
                        />
                    )}
                </div>
            </div>

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
        </section>
    )
}