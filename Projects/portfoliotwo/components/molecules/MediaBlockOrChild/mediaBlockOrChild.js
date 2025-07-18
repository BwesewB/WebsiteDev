'use client';

import React from 'react';
import MediaBlock from "../MediaBlock/MediaBlock";
import { useMediaQuery } from '@/components/atoms/useMediaQuery/useMediaQuery';
import styles from './mediaChild.module.css'

export default function MediaBlockOrChild({ 
    children, 
    // fullWidth = true,
    height = "100%",
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
                position: 'relative', // Important for child positioning
                // border: "1px solid blue",
                display: "flex",
                justifyContent: "center"
            }}
        >
            {children ? (
                // If children exist, render them.
                // They will now be inside the consistently styled div.
                children 
            ) : (
                // Otherwise, render the MediaBlock with the calculated props.
                <MediaBlock {...props} />
            )}
        </div>
    );
}