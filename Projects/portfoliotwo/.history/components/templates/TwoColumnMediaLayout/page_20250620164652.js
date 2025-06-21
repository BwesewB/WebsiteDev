"use client";

import SectionTwo from "../SectionTwo/page"; // Renders an image or video
import UnifiedButton from "@/components/atoms/unifiedButton/page";
import StickyContainer from "@/components/atoms/stickyContainer/page";
import TextContainer from "@/components/atoms/textContainer/page";
import styles from "./TwoColumnMediaLayout.module.css"

// This is the content that appears in the "text" column.
// It can also include buttons and a single optional media item.
const TextColumnContent = ({ textBlocks, buttons, inlineMedia, textColour }) => (
    <div className={styles.textContentWrapper} style={{ color: textColour }}>
        {textBlocks.map((block, index) => (
            <TextContainer key={index} header={block.header} paragraph={block.paragraph} />
        ))}
        <div className={styles.buttonContainer}>
            {buttons.map((button, index) => (
                <UnifiedButton key={index} {...button} />
            ))}
        </div>
        {inlineMedia && (
            <div className={styles.inlineMediaWrapper}>
                <SectionTwo {...inlineMedia} />
            </div>
        )}
    </div>
);

// This is the content for the "media" column, which can have multiple items.
const MediaColumnContent = ({ mediaItems }) => (
    <div className={styles.mediaContentWrapper}>
        {mediaItems.map((media, index) => (
            <SectionTwo key={index} {...media} />
        ))}
    </div>
);

export default function TwoColumnMediaLayout({
    textBlocks = [],
    mediaItems = [],
    buttons = [],
    inlineMedia = null, // A single media item to display with the text
    textSide = 'left',  // 'left' or 'right'
    stickyText = true,
    textColour = "var(--black)",
}) {

    // Define the two main columns
    const textColumn = (
        <div className={styles.textColumn}>
            {stickyText ? (
                <StickyContainer endTrigger={`.${styles.mediaColumn}`}>
                    <TextColumnContent {...{ textBlocks, buttons, inlineMedia, textColour }} />
                </StickyContainer>
            ) : (
                <TextColumnContent {...{ textBlocks, buttons, inlineMedia, textColour }} />
            )}
        </div>
    );

    const mediaColumn = (
        <div className={styles.mediaColumn}>
            <MediaColumnContent mediaItems={mediaItems} />
        </div>
    );

    return (
        <section className={styles.container}>
            {/* Conditionally render the columns based on the textSide prop */}
            {textSide === 'left' ? (
                <>
                    {textColumn}
                    {mediaColumn}
                </>
            ) : (
                <>
                    {mediaColumn}
                    {textColumn}
                </>
            )}
        </section>
    );
}
