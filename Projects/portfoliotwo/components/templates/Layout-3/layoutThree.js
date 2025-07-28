'use client'

import GridLayout, { Item as GridLayoutItem } from "@/components/atoms/gridLayout/gridLayout";
import TextContainer from "@/components/atoms/textContainer/page";
import MediaBlockOrChild from "@/components/molecules/MediaBlockOrChild/mediaBlockOrChild";
import { useMediaQuery } from "@/components/atoms/useMediaQuery/useMediaQuery";
import React from "react";

export default function LayoutThree({
    header,
    paragraph,
    imageSrc1, videoSrc1, childrenSlotOne,
    imageSrc2, videoSrc2, childrenSlotTwo,
}) {

    const isMobile = useMediaQuery('(max-width: 768px)');

    let gridItems;

    if (isMobile) {
        gridItems = [
            <GridLayoutItem key="mobile-text" colStart={1} colEnd={2} rowStart={1} rowEnd={2}>
                <div style={{ marginBottom: 'var(--imageTextSpacing)' }}>
                    <TextContainer header={header} paragraph={paragraph} />
                </div>
            </GridLayoutItem>,

            <GridLayoutItem key="media1" colStart={1} colEnd={2} rowStart={2} rowEnd={3}>
                <MediaBlockOrChild imageSrc={imageSrc1} videoSrc={videoSrc1} children={childrenSlotOne} />
            </GridLayoutItem>,

            <GridLayoutItem key="media2" colStart={1} colEnd={2} rowStart={3} rowEnd={4}>
                <MediaBlockOrChild imageSrc={imageSrc2} videoSrc={videoSrc2} children={childrenSlotTwo} />
            </GridLayoutItem>
        ];
    } else {
        gridItems = [
            <GridLayoutItem key="media1" colStart={1} colEnd={3} rowStart={1} rowEnd={5}>
                <MediaBlockOrChild imageSrc={imageSrc1} videoSrc={videoSrc1} children={childrenSlotOne} />
            </GridLayoutItem>,

            <GridLayoutItem key="desktop-header" colStart={3} colEnd={4} rowStart={2} rowEnd={3}>
                <TextContainer header={header} />
            </GridLayoutItem>,

            <GridLayoutItem key="media2" colStart={3} colEnd={4} rowStart={3} rowEnd={5}>
                <MediaBlockOrChild imageSrc={imageSrc2} videoSrc={videoSrc2} children={childrenSlotTwo} />
            </GridLayoutItem>,

            <GridLayoutItem key="desktop-paragraph" colStart={4} colEnd={5} rowStart={3} rowEnd={5}>
                <TextContainer paragraph={paragraph} />
            </GridLayoutItem>
        ];
    }

    return (
        <>
            <GridLayout containerHeight='min(40vw, 100vh)'>
                {gridItems}
            </GridLayout>
        </>
    );
}