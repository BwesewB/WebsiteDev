"use client";

import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import styles from "./TwoColumnMediaLayout.module.css";
import SectionTwo from "../SectionTwo/page"; // Assuming SectionTwo handles individual image/video
import UnifiedButton from "@/components/atoms/unifiedButton/page";
import StickyContainer from "@/components/atoms/stickyContainer/page";
import TextContainer from "@/components/atoms/textContainer/page";
import MediaCarousel from "@/components/organisms/MediaCarousel/page"; // For mobile media
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

// Custom Hook to check for media queries
const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(false);
    useEffect(() => {
        if (typeof window !== 'undefined') { // Ensure window is defined (for SSR/Next.js)
            const media = window.matchMedia(query);
            if (media.matches !== matches) {
                setMatches(media.matches);
            }
            const listener = () => setMatches(media.matches);
            window.addEventListener("resize", listener);
            return () => window.removeEventListener("resize", listener);
        }
    }, [matches, query]);
    return matches;
};

// Sub-component for rendering content in the "text-centric" column (handles text, buttons, inline media, and animation)
const TextCentricColumnContent = ({
    textBlocks,
    buttons,
    inlineMedia,
    textColour,
    animateText = false,
    textAnimationStartTrigger = "top 85%",
}) => {
    const textElementsRef = useRef(null);

    useLayoutEffect(() => {
        if (!animateText || !textElementsRef.current || !textBlocks || textBlocks.length === 0) return;

        const ctx = gsap.context(() => {
            // Target h4 and p elements within the textElementsRef for animation
            const elementsToAnimate = Array.from(textElementsRef.current.querySelectorAll("h4, p"));
            if (elementsToAnimate.length === 0) return;

            const split = new SplitText(elementsToAnimate, {
                type: "lines, words",
                linesClass: styles.splitLine // Ensure .splitLine CSS class is defined
            });

            gsap.from(split.words, {
                yPercent: 100,
                duration: 0.6,
                ease: "power4.out",
                stagger: 0.02,
                scrollTrigger: {
                    trigger: textElementsRef.current,
                    start: textAnimationStartTrigger,
                    toggleActions: "play none none none",
                }
            });
        }, textElementsRef);

        return () => ctx.revert();
    }, [animateText, textBlocks, textAnimationStartTrigger]); // Rerun if these change

    return (
        <div className={styles.textContentWrapper} style={{ color: textColour }} ref={textElementsRef}>
            {textBlocks.map((block, index) => (
                <TextContainer key={`text-${index}`} header={block.header} paragraph={block.paragraph} />
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
    // Content for the "Text Column" (rendered by TextCentricColumnContent)
    textBlocks = [],
    buttons = [],      // Buttons associated with textBlocks
    inlineMedia = null, // Single media item associated with textBlocks

    // Content for the "Media Column"
    // Can be:
    // 1. Standard media item for SectionTwo: { imageSrc, videoSrc, initialMute, ... }
    // 2. Buttons list: { type: 'buttons', items: [{...buttonProps}] }
    // 3. Text list (can also be animated): { type: 'text', items: [{header, paragraph}], animate?: boolean, animationTrigger?: string }
    mediaColumnItems = [],

    textSide = 'left', // Which side TextCentricColumnContent is on ('left' or 'right')
    
    // stickyConfig: { column: 'text' | 'media' | 'none', endTriggerSelf?: boolean }
    // 'text': TextCentricColumnContent side is sticky.
    // 'media': MediaColumnItems side is sticky.
    // 'none': No stickiness.
    // 'endTriggerSelf': if true, sticky column ends based on its own height, else based on other column's height.
    stickyConfig = { column: 'none', endTriggerSelf: false }, 
                                                           
    animateTextInTextColumn = false, // Controls animation for textBlocks in TextCentricColumnContent
    textAnimationStartTrigger = "top 85%", // GSAP trigger for text animation
    textColour = "var(--black)", // Default text colour for text content
}) {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const textColumnDivRef = useRef(null); 
    const mediaColumnDivRef = useRef(null);

    // Prepare content for the TextCentricColumn (the one that can have main text, buttons, inlineMedia)
    const textCentricContent = (
        <TextCentricColumnContent
            textBlocks={textBlocks}
            buttons={buttons}
            inlineMedia={inlineMedia}
            textColour={textColour}
            animateText={animateTextInTextColumn}
            textAnimationStartTrigger={textAnimationStartTrigger}
        />
    );

    // Prepare content for the MediaColumn (can be media, or now also buttons or text)
    const mediaCentricContent = mediaColumnItems && mediaColumnItems.length > 0 ? (
        <>
            {mediaColumnItems.map((item, index) => {
                if (item.type === 'buttons') {
                    return (
                        <div key={`mc-buttons-${index}`} className={`${styles.buttonContainer} ${styles.mediaColumnButtonContainer}`}>
                            {item.items.map((button, btnIdx) => <UnifiedButton key={`mc-btn-${btnIdx}`} {...button} />)}
                        </div>
                    );
                } else if (item.type === 'text') {
                    // Re-use TextCentricColumnContent for text in media column if animation/structure is desired
                    return (
                        <TextCentricColumnContent
                            key={`mc-text-${index}`}
                            textBlocks={item.items}
                            textColour={textColour} // Assuming same text colour, or could be passed in item
                            animateText={item.animate || false}
                            textAnimationStartTrigger={item.animationTrigger || "top 85%"}
                        />
                    );
                }
                // Default: item is a standard media object for SectionTwo
                return <SectionTwo key={`mc-media-${index}`} {...item} />;
            })}
        </>
    ) : null;

    // Determine which content and stickiness applies to left/right columns
    const leftColumnContent = textSide === 'left' ? textCentricContent : mediaCentricContent;
    const rightColumnContent = textSide === 'left' ? mediaCentricContent : textCentricContent;
    
    const isLeftSticky = stickyConfig.column === (textSide === 'left' ? 'text' : 'media');
    const isRightSticky = stickyConfig.column === (textSide === 'right' ? 'text' : 'media');

    // Define end triggers for sticky behavior
    const leftEndTrigger = stickyConfig.endTriggerSelf ? `.${styles.leftColumn}` : (mediaColumnItems.length > 0 || textBlocks.length > 0 || buttons.length > 0 || inlineMedia ? `.${styles.rightColumn}` : undefined);
    const rightEndTrigger = stickyConfig.endTriggerSelf ? `.${styles.rightColumn}` : (mediaColumnItems.length > 0 || textBlocks.length > 0 || buttons.length > 0 || inlineMedia ? `.${styles.leftColumn}` : undefined);


    const actualLeftColumn = (
        <div className={`${styles.column} ${styles.leftColumn}`} ref={textSide === 'left' ? textColumnDivRef : mediaColumnDivRef}>
            {!isMobile && isLeftSticky && leftColumnContent ? (
                <StickyContainer endTrigger={rightColumnContent ? rightEndTrigger : undefined}>
                    {leftColumnContent}
                </StickyContainer>
            ) : (
                leftColumnContent
            )}
        </div>
    );

    const actualRightColumn = (
        <div className={`${styles.column} ${styles.rightColumn}`} ref={textSide === 'right' ? textColumnDivRef : mediaColumnDivRef}>
            {!isMobile && isRightSticky && rightColumnContent ? (
                <StickyContainer endTrigger={leftColumnContent ? leftEndTrigger : undefined}>
                    {rightColumnContent}
                </StickyContainer>
            ) : (
                rightColumnContent
            )}
        </div>
    );

    // Mobile layout: Carousel for actual media, then stack other content
    const carouselAbleMediaItems = mediaColumnItems.filter(item => !item.type && (item.imageSrc || item.videoSrc));
    const otherMediaColumnContentParts = mediaColumnItems.filter(item => item.type === 'buttons' || item.type === 'text');

    const mobileRenderOrder = [];
    if (carouselAbleMediaItems.length > 0) {
        mobileRenderOrder.push(<MediaCarousel key="carousel" mediaItems={carouselAbleMediaItems} />);
    }
    // Content from TextCentricColumn (main text, its buttons, its inlineMedia)
    if (textBlocks.length > 0 || buttons.length > 0 || inlineMedia) {
        mobileRenderOrder.push(<div key="text-centric-mobile">{textCentricContent}</div>);
    }
    // Any 'buttons' or 'text' types from mediaColumnItems
    if (otherMediaColumnContentParts.length > 0) {
        mobileRenderOrder.push(
            <div key="other-media-mobile">
            {otherMediaColumnContentParts.map((item, index) => {
                 if (item.type === 'buttons') {
                    return ( <div key={`mc-buttons-mob-${index}`} className={`${styles.buttonContainer} ${styles.mediaColumnButtonContainer}`}>
                            {item.items.map((button, btnIdx) => <UnifiedButton key={btnIdx} {...button} />)}
                        </div> );
                } else if (item.type === 'text') {
                    return ( <TextCentricColumnContent key={`mc-text-mob-${index}`} textBlocks={item.items} textColour={textColour}
                            animateText={item.animate || false} textAnimationStartTrigger={item.animationTrigger || "top 85%"} /> );
                }
                return null;
            })}
            </div>
        );
    }
    
    // Ensure at least one column has content before rendering section
    const hasContent = (textBlocks.length > 0 || buttons.length > 0 || inlineMedia !== null || mediaColumnItems.length > 0);
    if (!hasContent) {
        return null; // Or some placeholder if preferred
    }

    return (
        <section className={styles.container}>
            {isMobile ? (
                <> {mobileRenderOrder} </>
            ) : (
                <>
                    {actualLeftColumn}
                    {actualRightColumn}
                </>
            )}
        </section>
    );
}