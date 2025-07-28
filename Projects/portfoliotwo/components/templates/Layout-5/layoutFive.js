'use client'

import GridLayout, { Item as GridLayoutItem } from "@/components/atoms/gridLayout/gridLayout";
import TextContainer from "@/components/atoms/textContainer/page";
import MediaBlockOrChild from "@/components/molecules/MediaBlockOrChild/mediaBlockOrChild";
import { useMediaQuery } from "@/components/atoms/useMediaQuery/useMediaQuery";
import React from "react";
import styles from './layoutFive.module.css';

export default function LayoutFive({
    imageSrc,
    videoSrc,
    mediaWidth,
    children,
    header,
    paragraph,
}) {


    const isMobile = useMediaQuery('(max-width: 768px)');

    const mediaItemProps = isMobile
        ? { colStart: 1, colEnd: 2, rowStart: 2, rowEnd: 3 } 
        : { colStart: 1, colEnd: 3, rowStart: 1, rowEnd: 5 };

    const textItemProps = isMobile
        ? { colStart: 1, colEnd: 2, rowStart: 1, rowEnd: 2 }
        : { colStart: 3, colEnd: 5, rowStart: 1, rowEnd: 3 };

    return (
        <>
           <GridLayout>
                <GridLayoutItem key="text" {...textItemProps}>
                    {isMobile ? (
                        <div style={{ marginBottom: 'var(--imageTextSpacing)' }}>
                            <TextContainer header={header} paragraph={paragraph} />
                        </div>
                    ) : (
                        <div className={styles.textContainer}>
                            <TextContainer header={header} paragraph={paragraph} />
                        </div>
                    )}
                </GridLayoutItem >
                <GridLayoutItem key="media" {...mediaItemProps} >
                    <MediaBlockOrChild
                        imageSrc={imageSrc}
                        videoSrc={videoSrc}
                        mediaWidth={mediaWidth}
                        children={children}
                    />
                </GridLayoutItem >
            </GridLayout>
        </>
    )
}