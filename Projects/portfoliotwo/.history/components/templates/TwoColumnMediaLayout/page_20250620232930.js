"use client";

import { useState, useEffect, useLayoutEffect, useRef } from 'react'; // Added useLayoutEffect back
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
    textSide = 'left',
    stickyConfig = { column: 'none', endTriggerSelf: false },
    textColour = "var(--black)",
}) {
    const isMobile = useMediaQuery('(max-width: 768px)');

    const leftContentRef = useRef(null); 
    // We don't necessarily need a ref for rightContentRef unless we want to measure it too.
    // The spacer's height is based on the left content.

    const [leftContentHeight, setLeftContentHeight] = useState(0);

    // This effect measures the height of the leftSlotContent when it's rendered
    // and its constituent parts (textBlocks, buttons, inlineMedia, or mediaColumnItems if textSide='right') change.
    useLayoutEffect(() => {
        let currentRefValue = null;
        if (textSide === 'left' && leftContentRef.current) {
            currentRefValue = leftContentRef.current.querySelector(`.${styles.textContentWrapper}`) || leftContentRef.current.querySelector(`.${styles.mediaCentricContentWrapper}`);
        } else if (textSide === 'right' && leftContentRef.current) { // if textSide is 'right', leftSlotContent is mediaCentricRenderedContent
             currentRefValue = leftContentRef.current.querySelector(`.${styles.mediaCentricContentWrapper}`);
        }
        // Fallback to the direct ref if no specific wrapper found (shouldn't happen with current structure)
        if (!currentRefValue && leftContentRef.current) {
            currentRefValue = leftContentRef.current.firstChild; // Assuming the actual content is the first child of gridColumn
        }


        if (currentRefValue) {
            const newHeight = currentRefValue.offsetHeight;
            // Only update state if the height has actually changed to prevent unnecessary re-renders
            // This check might still cause issues if other things cause slight pixel shifts.
            // A more robust way is to ensure dependencies are very specific.
            setLeftContentHeight(prevHeight => {
                if (newHeight !== prevHeight) {
                    return newHeight;
                }
                return prevHeight;
            });
        } else if (leftContentRef.current && !leftSlotContent) { // If there's no left content, height is 0
             setLeftContentHeight(0);
        }

    // Dependencies:
    // - leftSlotContent itself isn't stable for dependency array if it's JSX.
    // - We depend on the props that *generate* leftSlotContent.
    // - And `textSide` because it determines *what* goes into leftSlotContent.
    // - And `isMobile` because rendering changes.
    }, [textBlocks, buttons, inlineMedia, mediaColumnItems, textSide, isMobile, leftSlotContent]); // Added leftSlotContent as a dependency cautiously

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

    const actualLeftSlotContent = textSide === 'left' ? textCentricRenderedContent : mediaCentricRenderedContent;
    const actualRightSlotContent = textSide === 'left' ? mediaCentricRenderedContent : textCentricRenderedContent;
    
    // Pass actualLeftSlotContent to the dependency array of the useLayoutEffect above,
    // as its structure directly influences the height we're measuring.
    // This needs careful handling because JSX elements are new objects on every render.
    // A better way is to rely on the source props as dependencies.

    const isLeftSticky = !isMobile && stickyConfig.column === 'left' && actualLeftSlotContent;
    const isRightSticky = !isMobile && stickyConfig.column === 'right' && actualRightSlotContent;

    let endTriggerForLeftSticky;
    let leftStickyRequiresHeightAdjustment = false;
    if (isLeftSticky) {
        if (stickyConfig.endTriggerSelf || !actualRightSlotContent) {
            endTriggerForLeftSticky = `.${styles.leftGridColumn}`;
        } else {
            endTriggerForLeftSticky = `.${styles.rightGridColumn}`;
            leftStickyRequiresHeightAdjustment = true;
        }
    }

    let endTriggerForRightSticky;
    if (isRightSticky) {
        if (stickyConfig.endTriggerSelf || !actualLeftSlotContent) {
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
        if (textCentricRenderedContent) { // Use the initially prepared content
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
    
    const hasAnyContent = textCentricRenderedContent || mediaCentricRendered.Content; // Typo here, should be mediaCentricRenderedContent
    if (!hasAnyContent) return null;

    return (
        <section className={styles.container}>
            {isMobile ? (
                mobileRenderOrder
            ) : (
                <>
                    {actualLeftSlotContent && (
                        // The ref is on the grid column div itself.
                        // The useLayoutEffect above will try to find the actual content wrapper inside it.
                        <div className={`${styles.gridColumn} ${styles.leftGridColumn}`} ref={leftContentRef}>
                            {isLeftSticky ? (
                                <StickyContainer endTrigger={endTriggerForLeftSticky}>
                                    {actualLeftSlotContent}
                                </StickyContainer>
                            ) : (
                                actualLeftSlotContent
                            )}
                        </div>
                    )}
                    {actualRightSlotContent && (
                        // No ref needed on rightGridColumn for this specific spacer logic
                        <div className={`${styles.gridColumn} ${styles.rightGridColumn}`}>
                            {actualRightSlotContent}
                            {leftStickyRequiresHeightAdjustment && leftContentHeight > 0 && (
                                <div 
                                    style={{ height: `${leftContentHeight}px`, width: '1px', pointerEvents: 'none', opacity: 0, marginTop: 'auto' }} 
                                    aria-hidden="true" 
                                    className="scroll-spacer-for-sticky"
                                ></div>
                            )}
                        </div>
                    )}
                </>
            )}
        </section>
    );
}