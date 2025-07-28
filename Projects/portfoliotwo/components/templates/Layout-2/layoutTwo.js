'use client'

import GridLayout, { Item as GridLayoutItem } from "@/components/atoms/gridLayout/gridLayout";
import TextContainer from "@/components/atoms/textContainer/page";
import MediaBlockOrChild from "@/components/molecules/MediaBlockOrChild/mediaBlockOrChild";
import { useMediaQuery } from "@/components/atoms/useMediaQuery/useMediaQuery";
import React from "react";

export default function LayoutTwo({
    header,
    paragraph,
    imageSrc,
    videoSrc,
    mediaWidth,
    children
}) {

    const isMobile = useMediaQuery('(max-width: 768px)');

    const mediaItemProps = isMobile
        ? { colStart: 1, colEnd: 2, rowStart: 2, rowEnd: 3 }
        : { colStart: 3, colEnd: 5, rowStart: 1, rowEnd: 4 };

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
        textElements = [
            <GridLayoutItem key="header" colStart={1} colEnd={3} rowStart={4} rowEnd={5}>
                <div style={{ marginTop: 'var(--imageTextSpacing)' }}>
                    <TextContainer header={header} />
                </div>
            </GridLayoutItem>,

            <GridLayoutItem key="paragraph" colStart={3} colEnd={5} rowStart={4} rowEnd={5}>
                <div style={{ marginTop: 'var(--imageTextSpacing)' }}>
                    <div style={{
                        columnCount: 2,
                        columnGap: 'var(--masterSpacing)',
                    }}>
                        <TextContainer paragraph={paragraph} />
                    </div>
                </div>
            </GridLayoutItem>
        ];
    }

    return (
        <>
            <GridLayout>
                {textElements}
                <GridLayoutItem {...mediaItemProps}>
                    <MediaBlockOrChild
                        imageSrc={imageSrc}
                        videoSrc={videoSrc}
                        mediaWidth={mediaWidth}
                        children={children}
                    />
                </GridLayoutItem>
            </GridLayout>
        </>
    );
}