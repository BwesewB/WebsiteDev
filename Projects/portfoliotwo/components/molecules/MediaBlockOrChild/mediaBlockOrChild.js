'use client';

import React from 'react';
import MediaBlock from "../MediaBlock/MediaBlock";
import { useMediaQuery } from '@/components/atoms/useMediaQuery/useMediaQuery';
import styles from './mediaChild.module.css'

export default function MediaBlockOrChild({ 
    children, 
    height = "100%",
    maxMediaHeight,
    minMediaHeight,
    ...props 
}){
    // const isMobile = useMediaQuery('(max-width: 768px)');

    // const isFullWidthActive = fullWidth || isMobile;

    // const mediaBlockProps = {
    //     ...props,
    //     enableParallax: !isFullWidthActive && props.enableParallax,
    //     useObjectFitCover: !isFullWidthActive,
    // };

    return (
        <div 
            // className={isFullWidthActive ? styles.fullWidthWrapper : ''} 
            style={{ 
                height: height, 
                width: '100%', 
                position: 'relative',
                // border: "1px solid blue",
                display: "flex",
                justifyContent: "center",
                maxHeight: maxMediaHeight,
                minHeight: minMediaHeight,
            }}
        >
            {children ? (
                children 
            ) : (
                <MediaBlock {...props} />
            )}
        </div>
    );
}