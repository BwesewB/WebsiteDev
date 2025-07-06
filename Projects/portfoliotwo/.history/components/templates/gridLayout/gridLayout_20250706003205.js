// components/GridLayout/GridLayout.js
'use client';

import React, { useState, useEffect, Children, cloneElement } from 'react';
import styles from './gridLayout.module.css';

// The useMediaQuery hook remains the same
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

const Item = ({ children, className = '', style }) => {
    return (
        <div className={`${styles.gridItem} ${className}`} style={style}>
            {children}
        </div>
    );
};

// --- The Main GridLayout Component ---
export default function GridLayout({ children }) {
    const isMobile = useMediaQuery('(max-width: 768px)');

    return (
        <div className={styles.gridContainer}>
            {Children.map(children, (child) => {
                // Ensure we are only trying to add props to valid React elements
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

                // Clone the child (which is a GridLayout.Item) and pass down the calculated styles.
                return cloneElement(child, { style });
            })}
        </div>
    );
}

// --- THIS IS THE KEY STEP ---
// Attach the Item component as a property of the GridLayout component.
GridLayout.Item = Item;