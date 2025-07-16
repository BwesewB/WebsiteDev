'use client';

import React, { useState, useEffect, Children, cloneElement } from 'react';
import styles from './gridLayout.module.css';

const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(false);
    useEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches) setMatches(media.matches);
        const listener = () => setMatches(media.matches);
        window.addEventListener('resize', listener);
        return () => window.removeEventListener('resize', listener);
    }, [matches, query]);
    return matches;
};

export const Item = ({ children, className = '', style }) => {
    return (
        <div className={`${styles.gridItem} ${className}`} style={style}>
            {children}
        </div>
    );
};

export default function GridLayout({ children }) {
    const isMobile = useMediaQuery('(max-width: 768px)');

    return (
        <section className={styles.gridContainer}>
            {Children.map(children, (child) => {
                if (!React.isValidElement(child)) {
                    return child;
                }

                const {
                    colStart, colEnd, rowStart, rowEnd,
                    mobileColStart, mobileColEnd, mobileRowStart, mobileRowEnd,
                } = child.props;

                const style = {
                    gridColumnStart: isMobile ? mobileColStart : colStart,
                    gridColumnEnd: isMobile ? mobileColEnd : colEnd,
                    gridRowStart: isMobile ? mobileRowStart : rowStart,
                    gridRowEnd: isMobile ? mobileRowEnd : rowEnd,
                };

                return cloneElement(child, { style });
            })}
        </section>
    );
}