"use client";

import { useState, useEffect, useLayoutEffect } from 'react';
import styles from "./TwoColumnMediaLayout.module.css";
import SectionTwo from "../SectionTwo/page"; // Handles individual image/video
import UnifiedButton from "@/components/atoms/unifiedButton/page";
import StickyContainer from "@/components/atoms/stickyContainer/page";
import TextContainer from "@/components/atoms/textContainer/page"; // Already has animation
import MediaCarousel from "@/components/organisms/MediaCarousel/page"; // For mobile media
// GSAP and ScrollTrigger are used by StickyContainer and TextContainer, not directly here for animation

// Custom Hook to check for media queries
const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(false);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const media = window.matchMedia(query);
            const updateMatches = () => setMatches(media.matches);
            updateMatches(); // Initial check
            media.addEventListener("change", updateMatches);
            return () => media.removeEventListener("change", updateMatches);
        }
    }, [query]);
    return matches;
};

// Sub-component for rendering content in the "text-centric" parts (handles text, buttons, inline media)
// Animation is now handled by TextContainer itself.
const TextCentricColumnContent = ({ textBlocks, buttons, inlineMedia, textColour }) => {
    // textColour is applied to the wrapper, TextContainer will inherit if its own textColour prop is not set
    return (
        <div className={styles.textContentWrapper} style={{ color: textColour }}>
            {textBlocks.map((block, index) => (
                <TextContainer
                    key={`text-${index}`}
                    header={block.header}
                    paragraph={block.paragraph}
                    // TextContainer has its own startTrigger prop, let it manage it or pass per-block if needed
                    // textColour={textColour} // TextContainer inherits from wrapper unless specified
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
    // Content primarily for the "text" side
    textBlocks = [],
    buttons = [],      // Buttons associated with textBlocks
    inlineMedia = null, // Single media item associated with textBlocks

    // Content primarily for the "media" side
    // Can be:
    // 1. Standard media item(s) for SectionTwo: { imageSrc, videoSrc, initialMute, ... }
    // 2. Buttons list: { type: 'buttons', items: [{...buttonProps}] }
    // 3. Text list: { type: 'text', items: [{header, paragraph}] } (will use TextContainer, so animated)
    mediaColumnItems = [],

    textSide = 'left', // Which side the main 'textBlocks' content appears on ('left' or 'right')
    
    stickyConfig = { column: 'none', endTriggerSelf: false }, 
                                                           
    textColour = "var(--black)", // Default text colour for text content
}) {
    const isMobile = useMediaQuery('(max-width: 768px)');

    // 1. Prepare the content for the "text-centric" block
    const textCentricRenderedContent = (textBlocks.length > 0 || buttons.length > 0 || inlineMedia) ? (
        <TextCentricColumnContent
            textBlocks={textBlocks}
            buttons={buttons}
            inlineMedia={inlineMedia}
            textColour={textColour}
        />
    ) : null;

    // 2. Prepare the content for the "media-centric" block
    const mediaCentricRenderedContent = mediaColumnItems && mediaColumnItems.length > 0 ? (
        <div className={styles.mediaCentricContentWrapper}> {/* Wrapper for potential gap styling */}
            {mediaColumnItems.map((item, index) => {
                if (item.type === 'buttons') {
                    return (
                        <div key={`mc-buttons-${index}`} className={`${styles.buttonContainer} ${styles.mediaColumnButtonContainer}`}>
                            {item.items.map((button, btnIdx) => <UnifiedButton key={`mc-btn-${btnIdx}`} {...button} />)}
                        </div>
                    );
                } else if (item.type === 'text') {
                    // Using TextCentricColumnContent ensures TextContainers are used, thus animated
                    return (
                        <TextCentricColumnContent
                            key={`mc-text-${index}`}
                            textBlocks={item.items} // items should be an array of {header, paragraph}
                            textColour={item.textColour || textColour} // Allow override or use main
                        />
                    );
                }
                // Default: item is a standard media object for SectionTwo
                return <SectionTwo key={`mc-media-${index}`} {...item} />;
            })}
        </div>
    ) : null;

    // 3. Determine which content goes to which side for desktop
    const leftSlotContent = textSide === 'left' ? textCentricRenderedContent : mediaCentricRenderedContent;
    const rightSlotContent = textSide === 'left' ? mediaCentricRenderedContent : textCentricRenderedContent;
    
    const isLeftSticky = !isMobile && stickyConfig.column === (textSide === 'left' ? 'text' : 'media') && leftSlotContent;
    const isRightSticky = !isMobile && stickyConfig.column === (textSide === 'right' ? 'text' : 'media') && rightSlotContent;

    let endTriggerForLeftSticky;
    if (isLeftSticky) {
        if (stickyConfig.endTriggerSelf) endTriggerForLeftSticky = `.${styles.leftGridColumn}`;
        else if (rightSlotContent) endTriggerForLeftSticky = `.${styles.rightGridColumn}`;
    }

    let endTriggerForRightSticky;
    if (isRightSticky) {
        if (stickyConfig.endTriggerSelf) endTriggerForRightSticky = `.${styles.rightGridColumn}`;
        else if (leftSlotContent) endTriggerForRightSticky = `.${styles.leftGridColumn}`;
    }

    // Mobile rendering order
    const mobileRenderOrder = [];
    if (isMobile) {
        // Media carousel from mediaColumnItems (if any actual media)
        const carouselAbleMediaItems = mediaColumnItems.filter(item => !item.type && (item.imageSrc || item.videoSrc));
        if (carouselAbleMediaItems.length > 0) {
            mobileRenderOrder.push(<MediaCarousel key="mobile-carousel" mediaItems={carouselAbleMediaItems} />);
        }

        // Main text-centric content (textBlocks, its buttons, its inlineMedia)
        if (textCentricRenderedContent) {
            mobileRenderOrder.push(
                <div key="mobile-text-centric" className={styles.mobileTextCentricWrapper}>
                    {textCentricRenderedContent}
                </div>
            );
        }
        
        // Other content from mediaColumnItems (e.g. 'buttons' or 'text' types)
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
        <section className={styles.container}>
            {isMobile ? (
                mobileRenderOrder
            ) : (
                <>
                    {/* Left Grid Column (Desktop) */}
                    {leftSlotContent && (
                        <div className={`${styles.gridColumn} ${styles.leftGridColumn}`}>
                            {isLeftSticky ? (
                                <StickyContainer endTrigger={endTriggerForLeftSticky}>
                                    {leftSlotContent}
                                </StickyContainer>
                            ) : (
                                leftSlotContent
                            )}
                        </div>
                    )}

                    {/* Right Grid Column (Desktop) */}
                    {rightSlotContent && (
                        <div className={`${styles.gridColumn} ${styles.rightGridColumn}`}>
                            {isRightSticky ? (
                                <StickyContainer endTrigger={endTriggerForRightSticky}>
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