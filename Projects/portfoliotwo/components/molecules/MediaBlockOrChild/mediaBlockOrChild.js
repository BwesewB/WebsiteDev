'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MediaBlock from "../MediaBlock/MediaBlock";

gsap.registerPlugin(ScrollTrigger);

export default function MediaBlockOrChild({
    imageSrc,
    videoSrc,
    mediaWidth,
    children,
    enableParallax
}){

    const hasMediaContent = children || imageSrc || videoSrc;

    return (
        <>
            {hasMediaContent && (
                <div style={{width: "100%", height: "100%", objectFit: "cover"}}>
                    {children ? (
                        children 
                    ) : (
                        <MediaBlock
                            imageSrc={imageSrc}
                            videoSrc={videoSrc}
                            mediaWidth={mediaWidth}
                            enableParallax={enableParallax}
                        />
                    )}
                </div>
            )}
        </>
    )
}