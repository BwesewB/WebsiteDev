"use client"

import styles from "./sectionSix.module.css"
import SectionTwo from "../SectionTwo/page"
import UnifiedButton from "../../uiComponents/unifiedButton/page"

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

    initialMute,

}) {

    return (
        <section className={styles.container}>
            <div className={styles.textSection} style={{ color: textColour }}>
                <div 
                    className={styles.textSticky} 
                    style={{ 
                        position: sticky ? "sticky" : "relative", 
                        top: sticky ? "var(--sideSpacing)" : "auto" 
                    }}>
                    <h4>{challengeHeader}</h4>
                    <p>{challengeParagraph}</p>
                    {externalLinkVisit && (
                        <UnifiedButton
                            externalLink={externalLinkVisit}
                            buttonContentColour={buttonContentColourVisit}
                            backgroundColor={backgroundColorVisit}
                        />
                    )}
                    {externalLinkCode && (
                        <UnifiedButton
                            externalLink={externalLinkCode}
                            buttonContentColour={buttonContentColourCode}
                            backgroundColor={backgroundColorCode}
                        />
                    )}
                    {externalLinkFigma && (
                        <UnifiedButton
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
                    <SectionTwo imageSrc={imageOne} videoSrc={videoOne} initialMute={initialMute}/>
                )}
                {(imageTwo || videoTwo) && (
                    <SectionTwo imageSrc={imageTwo} videoSrc={videoTwo} initialMute={initialMute}/>
                )}
                {(imageThree || videoThree) && (
                    <SectionTwo imageSrc={imageThree} videoSrc={videoThree} initialMute={initialMute}/>
                )}
            </div>
        </section>
    )
}