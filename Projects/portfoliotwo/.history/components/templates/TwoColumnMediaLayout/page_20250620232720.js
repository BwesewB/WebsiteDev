"use client";

import { useState, useEffect, useRef, useLayoutEffect } // Added useRef
from 'react';
import styles from "./TwoColumnMediaLayout.module.css";
import SectionTwo from "../SectionTwo/page";
import UnifiedButton from "@/components/atoms/unifiedButton/page";
import StickyContainer from "@/components/atoms/stickyContainer/page";
import TextContainer from "@/components/atoms/textContainer/page";
import MediaCarousel from "@/components/organisms/MediaCarousel/page";

// ... useMediaQuery and TextCentricColumnContent are the same ...
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
    textSide = 'left',
    stickyConfig = { column: 'none', endTriggerSelf: false },
    textColour = "var(--black)",
}) {
    const isMobile = useMediaQuery('(max-width: 768px)');

    // Refs for the column content that might become sticky or be an end trigger
    const leftContentRef = useRef(null);
    const rightContentRef = useRef(null);

    const [leftContentHeight, setLeftContentHeight] = useState(0);
    // const [rightContentHeight, setRightContentHeight] = useState(0); // Not strictly needed for this solution

    useLayoutEffect(() => {
        if (leftContentRef.current) {
            setLeftContentHeight(leftContentRef.current.offsetHeight);
        }
        // if (rightContentRef.current) {
        //     setRightContentHeight(rightContentRef.current.offsetHeight);
        // }
      // Rerun if content changes that might affect height
    }, [textBlocks, buttons, inlineMedia, mediaColumnItems, isMobile]);


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
                // ... (item rendering logic is the same)
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

    const leftSlotContent = textSide === 'left' ? textCentricRenderedContent : mediaCentricRenderedContent;
    const rightSlotContent = textSide === 'left' ? mediaCentricRenderedContent : textCentricRenderedContent;

    const isLeftSticky = !isMobile && stickyConfig.column === 'left' && leftSlotContent;
    const isRightSticky = !isMobile && stickyConfig.column === 'right' && rightSlotContent;

    let endTriggerForLeftSticky;
    let leftStickyRequiresHeightAdjustment = false;
    if (isLeftSticky) {
        if (stickyConfig.endTriggerSelf || !rightSlotContent) {
            endTriggerForLeftSticky = `.${styles.leftGridColumn}`;
        } else {
            endTriggerForLeftSticky = `.${styles.rightGridColumn}`;
            leftStickyRequiresHeightAdjustment = true; // Mark that right column needs to consider left's height
        }
    }

    let endTriggerForRightSticky;
    // let rightStickyRequiresHeightAdjustment = false; // Not implementing this side for now for brevity
    if (isRightSticky) {
        if (stickyConfig.endTriggerSelf || !leftSlotContent) {
            endTriggerForRightSticky = `.${styles.rightGridColumn}`;
        } else {
            endTriggerForRightSticky = `.${styles.leftGridColumn}`;
            // rightStickyRequiresHeightAdjustment = true; // Mark that left column needs to consider right's height
        }
    }

    // Mobile rendering ... (same as before)
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
    if (!hasAnyContent) return null;

    return (
        <section className={styles.container}>
            {isMobile ? (
                mobileRenderOrder
            ) : (
                <>
                    {leftSlotContent && (
                        // Assign ref to the actual content block that might be measured
                        <div className={`${styles.gridColumn} ${styles.leftGridColumn}`} ref={leftContentRef}>
                            {isLeftSticky ? (
                                <StickyContainer endTrigger={endTriggerForLeftSticky}>
                                    {leftSlotContent}
                                </StickyContainer>
                            ) : (
                                leftSlotContent
                            )}
                        </div>
                    )}
                    {rightSlotContent && (
                        <div className={`${styles.gridColumn} ${styles.rightGridColumn}`} ref={rightContentRef}>
                            {rightSlotContent}
                            {/* If left is sticky and uses right as endTrigger, add a spacer to right to account for left's height */}
                            {leftStickyRequiresHeightAdjustment && leftContentHeight > 0 && (
                                <div style={{ height: `${leftContentHeight}px`, pointerEvents: 'none', opacity: 0 }} aria-hidden="true" className="scroll-spacer-for-sticky"></div>
                            )}
                        </div>
                    )}
                </>
            )}
        </section>
    );
}