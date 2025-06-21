"use client"

import styles from "./sectionSix.module.css"
import SectionTwo from "../SectionTwo/page"
import UnifiedButton from "@/components/atoms/unifiedButton/page"
import StickyContainer from "@/components/atoms/stickyContainer/page"

export default function SectionSix({
    textColour = "var(--black)",
    challengeHeader = "Title",
    challengeParagraph = "Paragraph Content",
    sticky = true,

    buttons = [],

    imageOne,
    imageTwo,
    imageThree,
    videoOne,
    videoTwo,
    videoThree,

    initialMute,

}) {

    const textContent = (
        <div className={styles.textSticky} 
            style={{ 
                position: sticky ? "sticky" : "relative", 
                top: sticky ? "var(--sideSpacing)" : "auto",
                color: textColour
            }}>
            <h4>{challengeHeader}</h4>
            <p>{challengeParagraph}</p>
            {buttons
                .filter((button) => button.externalLink)
                .map((button, index) => (
                    <UnifiedButton
                        key={index}
                        text={button.text}
                        icon={button.icon}
                        externalLink={button.externalLink}
                        buttonContentColour={button.buttonContentColour}
                        backgroundColor={button.backgroundColor}
                    />
            ))}
        </div>
    );

    return (
        <section className={styles.container}>
            <div className={styles.textSection}>
                {sticky ? (
                    <StickyContainer endTrigger={`.${styles.mediaContainer}`}>
                        {textContent}
                    </StickyContainer>
                ) : (
                    textContent
                )}
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