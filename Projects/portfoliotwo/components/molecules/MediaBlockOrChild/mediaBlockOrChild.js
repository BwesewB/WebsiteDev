'use client';

import React from 'react';
import MediaBlock from "../MediaBlock/MediaBlock";
import { useMediaQuery } from '@/components/atoms/useMediaQuery/useMediaQuery';
import styles from './mediaChild.module.css'

export default function MediaBlockOrChild({ 
    children, 
    fullWidth = true,
    height = "auto",
    ...props 
}){
    const isMobile = useMediaQuery('(max-width: 768px)');

    const isFullWidthActive = fullWidth || isMobile;

    // const mediaBlockProps = {
    //     ...props,
    //     enableParallax: !isFullWidthActive && props.enableParallax,
    //     useObjectFitCover: !isFullWidthActive,
    // };

    if (children) {

        return (
            <div className={isFullWidthActive ? styles.fullWidthWrapper : ''} style={{height: height}}>
                {children}
            </div>
        );
    }

    return (
        <div className={isFullWidthActive ? styles.fullWidthWrapper : ''} style={{height: height}}>
            <MediaBlock {...props} />
        </div>
    );
}