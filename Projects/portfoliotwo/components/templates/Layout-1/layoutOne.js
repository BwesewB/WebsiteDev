'use client'

import GridLayout, { Item as GridLayoutItem } from "@/components/atoms/gridLayout/gridLayout"
import TextContainer from "@/components/atoms/textContainer/page"
import MediaBlockOrChild from "@/components/molecules/MediaBlockOrChild/mediaBlockOrChild"
import { useMediaQuery } from "@/components/atoms/useMediaQuery/useMediaQuery";
import React from "react";

export default function LayoutOne({
    viewHeight,
    header,
    paragraph,
    imageSrc,
    videoSrc,
    height,
    mediaHeight,
    scale,
    children,
    switchLayout = true,
    initialMute,
}) {

    const isMobile = useMediaQuery('(max-width: 768px)');

    const mediaItemProps = isMobile
        ? { colStart: 1, colEnd: 2, rowStart: 2, rowEnd: 3 }
        : switchLayout
            ? { colStart: 1, colEnd: 5, rowStart: 2, rowEnd: 5 } 
            : { colStart: 1, colEnd: 5, rowStart: 1, rowEnd: 4 };

    let textElements;

    if (isMobile) {
        textElements = (
            <GridLayoutItem colStart={1} colEnd={2} rowStart={1} rowEnd={2}>
                <div style={{ marginBottom: 'var(--imageTextSpacing)' }}>
                    <TextContainer header={header} paragraph={paragraph} />
                </div>
            </GridLayoutItem>
        );
    } else {
        const headerItemProps = switchLayout
            ? { colStart: 1, colEnd: 3, rowStart: 1, rowEnd: 2 }
            : { colStart: 1, colEnd: 3, rowStart: 4, rowEnd: 5 };

        const paragraphItemProps = switchLayout
            ? { colStart: 3, colEnd: 5, rowStart: 1, rowEnd: 2 }
            : { colStart: 3, colEnd: 5, rowStart: 4, rowEnd: 5 };

        const textWrapperStyle = switchLayout
            ? { marginBottom: 'var(--imageTextSpacing)' }
            : { marginTop: 'var(--imageTextSpacing)' };

        textElements = [
            <GridLayoutItem key="header" {...headerItemProps}>
                <div style={textWrapperStyle}>
                    <TextContainer header={header} />
                </div>
            </GridLayoutItem>,
            <GridLayoutItem key="paragraph" {...paragraphItemProps}>
                <div style={textWrapperStyle}>
                    <TextContainer paragraph={paragraph} />
                </div>
            </GridLayoutItem>
        ];
    }

    return (
        <>
            <GridLayout viewHeight={viewHeight}>
                {textElements}

                <GridLayoutItem {...mediaItemProps}>
                    <MediaBlockOrChild
                        imageSrc={imageSrc}
                        videoSrc={videoSrc}
                        mediaHeight={mediaHeight}
                        children={children}
                        scale={scale}
                        height={height}
                        initialMute={initialMute}
                    />
                </GridLayoutItem>
            </GridLayout>
        </>
    );
}
