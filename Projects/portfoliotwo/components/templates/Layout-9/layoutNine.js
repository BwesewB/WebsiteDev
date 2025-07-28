'use client'

import GridLayout, { Item as GridLayoutItem } from "@/components/atoms/gridLayout/gridLayout"
import TextContainer from "@/components/atoms/textContainer/page"
import MediaBlockOrChild from "@/components/molecules/MediaBlockOrChild/mediaBlockOrChild"
import { useMediaQuery } from "@/components/atoms/useMediaQuery/useMediaQuery";
import React from "react";

export default function LayoutNine({
    header,
    paragraph,
    mediaHeight,
    scale,
    switchLayout: switchLayout = true, 

    imageSrc1,
    videoSrc1,
    childrenSlotOne,

    imageSrc2,
    videoSrc2,
    childrenSlotTwo,


}) {

    const isMobile = useMediaQuery('(max-width: 768px)');

    const mediaItem1Props = isMobile
        ? { colStart: 1, colEnd: 2, rowStart: 2, rowEnd: 3 } // On mobile, text takes up the first row
        : switchLayout
            ? { colStart: 1, colEnd: 3, rowStart: 2, rowEnd: 5 }
            : { colStart: 1, colEnd: 3, rowStart: 1, rowEnd: 4 };

    const mediaItem2Props = isMobile
        ? { colStart: 1, colEnd: 2, rowStart: 3, rowEnd: 4 }
        : switchLayout
            ? { colStart: 3, colEnd: 5, rowStart: 2, rowEnd: 5 }
            : { colStart: 3, colEnd: 5, rowStart: 1, rowEnd: 4 };

    let textElements; // Declare a variable to hold our JSX

    if (isMobile) {
        // On mobile, assign a SINGLE JSX element to the variable
        textElements = (
            <GridLayoutItem colStart={1} colEnd={2} rowStart={1} rowEnd={2}>
                <div style={{ marginBottom: 'var(--imageTextSpacing)' }}>
                    <TextContainer header={header} paragraph={paragraph} />
                </div>
            </GridLayoutItem>
        );
    } else {
        // On desktop, assign an ARRAY of JSX elements to the variable
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
            // Add a unique 'key' prop, which is required when creating arrays in React
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
            <GridLayout>
                {textElements}
                <GridLayoutItem {...mediaItem1Props}>
                    <MediaBlockOrChild
                        imageSrc={imageSrc1} videoSrc={videoSrc1} children={childrenSlotOne}
                        mediaHeight={mediaHeight} scale={scale}
                    />
                </GridLayoutItem>
                <GridLayoutItem {...mediaItem2Props}>
                    <MediaBlockOrChild
                        imageSrc={imageSrc2} videoSrc={videoSrc2} children={childrenSlotTwo}
                        mediaHeight={mediaHeight} scale={scale}
                    />
                </GridLayoutItem>
            </GridLayout>
        </>
    )
}