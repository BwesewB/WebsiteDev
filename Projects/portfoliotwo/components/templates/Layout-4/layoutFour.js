'use client'

import GridLayout, { Item as GridLayoutItem } from "@/components/atoms/gridLayout/gridLayout";
import TextContainer from "@/components/atoms/textContainer/page";
import MediaBlockOrChild from "@/components/molecules/MediaBlockOrChild/mediaBlockOrChild";
import { useMediaQuery } from "@/components/atoms/useMediaQuery/useMediaQuery";
import React from "react";

export default function LayoutFour({
    viewHeight,
    header,
    paragraph1,
    paragraph2, // This is the key conditional prop
    imageSrc,
    videoSrc,
    mediaWidth,
    children
}) {

    const isMobile = useMediaQuery('(max-width: 768px)');

    // This variable will hold our final array of grid items.
    let gridItems;

    if (isMobile) {
        // --- MOBILE RENDER ---
        const mobileItems = [];

        // 1. Always add the first text block (header + p1).
        mobileItems.push(
            <GridLayoutItem key="mobile-text1" colStart={1} colEnd={2} rowStart={1} rowEnd={2}>
                <TextContainer header={header} paragraph={paragraph1} />
            </GridLayoutItem>
        );

        // 2. Conditionally add the second paragraph block if it exists.
        // This is the one that gets the large margin.
        if (paragraph2) {
            mobileItems.push(
                <GridLayoutItem key="mobile-text2" colStart={1} colEnd={2} rowStart={2} rowEnd={3}>
                    <div style={{ marginBottom: 'var(--imageTextSpacing)' }}>
                        <TextContainer paragraph={paragraph2} />
                    </div>
                </GridLayoutItem>
            );
        }

        // 3. Add the media block. Its row position depends on whether paragraph2 exists.
        const mediaRowStart = paragraph2 ? 3 : 2;
        mobileItems.push(
            <GridLayoutItem key="media" colStart={1} colEnd={2} rowStart={mediaRowStart} rowEnd={mediaRowStart + 1}>
                <MediaBlockOrChild
                    imageSrc={imageSrc} videoSrc={videoSrc}
                    mediaWidth={mediaWidth} children={children}
                />
            </GridLayoutItem>
        );

        gridItems = mobileItems;

    } else {
        // --- DESKTOP RENDER ---
        const desktopItems = [];

        // 1. Always add the main text block.
        desktopItems.push(
            <GridLayoutItem key="desktop-text1" colStart={1} colEnd={2} rowStart={1} rowEnd={3}>
                <TextContainer header={header} paragraph={paragraph1} />
            </GridLayoutItem>
        );

        // 2. Define media props based on whether paragraph2 exists.
        const mediaItemProps = {
            colStart: 2,
            colEnd: 5,
            rowStart: 1,
            rowEnd: paragraph2 ? 4 : 5, // This is the key conditional logic
        };
        desktopItems.push(
            <GridLayoutItem key="media" {...mediaItemProps}>
                <MediaBlockOrChild
                    imageSrc={imageSrc} videoSrc={videoSrc}
                    mediaWidth={mediaWidth} children={children}
                />
            </GridLayoutItem>
        );

        // 3. Conditionally add the bottom text block if it exists.
        if (paragraph2) {
            desktopItems.push(
                <GridLayoutItem key="desktop-text2" colStart={3} colEnd={5} rowStart={4} rowEnd={5}>
                    <div style={{ marginTop: 'var(--imageTextSpacing)' }}>
                        <div style={{
                            columnCount: 2,
                            columnGap: 'var(--masterSpacing)',
                        }}>
                            <TextContainer paragraph={paragraph2} />
                        </div>
                    </div>
                </GridLayoutItem>
            );
        }

        gridItems = desktopItems;
    }

    return (
        <>
            <GridLayout>
                {gridItems}
            </GridLayout>
        </>
    );
}