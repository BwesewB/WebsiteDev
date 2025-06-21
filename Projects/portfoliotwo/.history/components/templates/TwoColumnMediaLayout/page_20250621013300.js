"use client";

import { useState, useEffect, useRef } from 'react';
import styles from "./TwoColumnMediaLayout.module.css";
import SectionTwo from "../SectionTwo/page";
import UnifiedButton from "@/components/atoms/unifiedButton/page";
import StickyContainer from "@/components/atoms/stickyContainer/page";
import TextContainer from "@/components/atoms/textContainer/page";
import MediaCarousel from "@/components/organisms/MediaCarousel/page";

const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(false);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const media = window.matchMedia(query);
            const updateMatches = () => setMatches(media.matches);
            updateMatches();
            media.addEventListener("change", updateMatches);
            return () => media.removeEventListener("change", updateMatches);
        }
    }, [query]);
    return matches;
};

const TextCentricColumnContent = ({ textBlocks, buttons, inlineMedia, textColour }) => {
    return (
        <div className={styles.textContentWrapper} style={{ color: textColour }}>
            {textBlocks.map((block, index) => (
                <TextContainer
                    key={`text-${index}`}
                    header={block.header}
                    paragraph={block.paragraph}
                />
            ))}
            {buttons && buttons.length > 0 && (
                <div className={styles.buttonContainer}>
                    {buttons.map((button, index) => <UnifiedButton key={`btn-${index}`} {...button} />)}
                </div>
            )}
            {inlineMedia && <div className={styles.inlineMediaWrapper}><SectionTwo {...inlineMedia} /></div>}
        </div>
    );
};

export default function TwoColumnMediaLayout({
    textBlocks = [],
    buttons = [],
    inlineMedia = null,
    mediaColumnItems = [],
    textSide = 'left', // Which side 'textBlocks' content appears on: 'left' or 'right'
    
    // stickyConfig: { column: 'left' | 'right' | 'none', endTriggerSelf?: boolean }
    // 'left': The physical left column will be sticky.
    // 'right': The physical right column will be sticky.
    // 'none': No stickiness.
    // 'endTriggerSelf': if true, sticky column ends based on its own height, else based on other column's height.
    stickyConfig = { column: 'none', endTriggerSelf: false }, 
                                                           
    textColour = "var(--black)",
}) {
    const isMobile = useMediaQuery('(max-width: 768px)');

    const leftColumnRef = useRef(null);
    const rightColumnRef = useRef(null);

    const isSimpleHeaderParaStack = 
    // Only apply on mobile
    isMobile &&
    // Check that the main text content is just a single header
    textBlocks.length === 1 && 
    textBlocks[0].header && 
    !textBlocks[0].paragraph &&
    // Check that the media column is just a single paragraph
    mediaColumnItems.length === 1 &&
    mediaColumnItems[0].type === 'text' &&
    mediaColumnItems[0].items.length === 1 &&
    mediaColumnItems[0].items[0].paragraph &&
    !mediaColumnItems[0].items[0].header &&
    // And there are no extra buttons or media
    buttons.length === 0 &&
    !inlineMedia;
    
    const containerClasses = `${styles.container} ${isSimpleHeaderParaStack ? styles.tightGapMobile : ''}`;

    const textCentricRenderedContent = (textBlocks.length > 0 || buttons.length > 0 || inlineMedia) ? (
        <TextCentricColumnContent
            textBlocks={textBlocks}
            buttons={buttons}
            inlineMedia={inlineMedia}
            textColour={textColour}
        />
    ) : null;

    const mediaCentricRenderedContent = mediaColumnItems && mediaColumnItems.length > 0 ? (
        <div className={styles.mediaCentricContentWrapper}>
            {mediaColumnItems.map((item, index) => {
                if (item.type === 'buttons') {
                    return (
                        <div key={`mc-buttons-${index}`} className={`${styles.buttonContainer} ${styles.mediaColumnButtonContainer}`}>
                            {item.items.map((button, btnIdx) => <UnifiedButton key={`mc-btn-${btnIdx}`} {...button} />)}
                        </div>
                    );
                } else if (item.type === 'text') {
                    return (
                        <TextCentricColumnContent
                            key={`mc-text-${index}`}
                            textBlocks={item.items}
                            textColour={item.textColour || textColour}
                        />
                    );
                }
                return <SectionTwo key={`mc-media-${index}`} {...item} />;
            })}
        </div>
    ) : null;

    // Determine which content goes to which physical side
    const leftSlotContent = textSide === 'left' ? textCentricRenderedContent : mediaCentricRenderedContent;
    const rightSlotContent = textSide === 'left' ? mediaCentricRenderedContent : textCentricRenderedContent;
    
    // Determine stickiness based on the physical column specified in stickyConfig
    const isLeftSticky = !isMobile && stickyConfig.column === 'left' && leftSlotContent;
    const isRightSticky = !isMobile && stickyConfig.column === 'right' && rightSlotContent;

    let endTriggerForLeftSticky;
    if (isLeftSticky) {
        // If left is sticky, it ends when the right column (if it exists) ends, or itself if endTriggerSelf is true or no right content
        if (stickyConfig.endTriggerSelf || !rightSlotContent) {
            endTriggerForLeftSticky = `.${styles.leftGridColumn}`;
        } else {
            endTriggerForLeftSticky = `.${styles.rightGridColumn}`;
        }
    }

    let endTriggerForRightSticky;
    if (isRightSticky) {
        // If right is sticky, it ends when the left column (if it exists) ends, or itself if endTriggerSelf is true or no left content
        if (stickyConfig.endTriggerSelf || !leftSlotContent) {
            endTriggerForRightSticky = `.${styles.rightGridColumn}`;
        } else {
            endTriggerForRightSticky = `.${styles.leftGridColumn}`;
        }
    }

    const mobileRenderOrder = [];
    if (isMobile) {
        const carouselAbleMediaItems = mediaColumnItems.filter(item => !item.type && (item.imageSrc || item.videoSrc));
        if (carouselAbleMediaItems.length > 0) {
            mobileRenderOrder.push(<MediaCarousel key="mobile-carousel" mediaItems={carouselAbleMediaItems} />);
        }
        if (textCentricRenderedContent) {
            mobileRenderOrder.push(<div key="mobile-text-centric" className={styles.mobileTextCentricWrapper}>{textCentricRenderedContent}</div>);
        }
        const otherMediaColumnParts = mediaColumnItems.filter(item => item.type === 'buttons' || item.type === 'text');
        if (otherMediaColumnParts.length > 0) {
            mobileRenderOrder.push(
                <div key="mobile-other-media" className={`${styles.mobileOtherMediaWrapper} ${styles.mediaCentricContentWrapper}`}>
                    {otherMediaColumnParts.map((item, index) => {
                         if (item.type === 'buttons') {
                            return ( <div key={`mc-mob-buttons-${index}`} className={`${styles.buttonContainer} ${styles.mediaColumnButtonContainer}`}>
                                    {item.items.map((button, btnIdx) => <UnifiedButton key={btnIdx} {...button} />)}
                                </div> );
                        } else if (item.type === 'text') {
                            return ( <TextCentricColumnContent key={`mc-mob-text-${index}`} textBlocks={item.items} textColour={item.textColour || textColour} /> );
                        }
                        return null;
                    })}
                </div>
            );
        }
    }
    
    const hasAnyContent = textCentricRenderedContent || mediaCentricRenderedContent;
    if (!hasAnyContent) {
        return null; 
    }

    return (
        <section className={containerClasses}>
            {isMobile ? (
                mobileRenderOrder
            ) : (
                <>
                    {leftSlotContent && (
                        <div className={`${styles.gridColumn} ${styles.leftGridColumn}`} ref={leftColumnRef}>
                            {isLeftSticky ? (
                                <StickyContainer endTriggerRef={rightColumnRef}>
                                    {leftSlotContent}
                                </StickyContainer>
                            ) : (
                                leftSlotContent
                            )}
                        </div>
                    )}
                    {rightSlotContent && (
                        <div className={`${styles.gridColumn} ${styles.rightGridColumn}`} ref={rightColumnRef}>
                            {isRightSticky ? (
                                <StickyContainer endTriggerRef={leftColumnRef}>
                                    {rightSlotContent}
                                </StickyContainer>
                            ) : (
                                rightSlotContent
                            )}
                        </div>
                    )}
                </>
            )}
        </section>
    );
}