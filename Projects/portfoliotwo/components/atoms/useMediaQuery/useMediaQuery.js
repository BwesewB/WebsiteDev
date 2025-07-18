// src/hooks/useMediaQuery.js
'use client';

import { useState, useEffect } from 'react';

export function useMediaQuery(query) {
    const [matches, setMatches] = useState(false);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const media = window.matchMedia(query);
            const updateMatches = () => setMatches(media.matches);
            updateMatches(); // Initial check
            media.addEventListener("change", updateMatches);
            return () => media.removeEventListener("change", updateMatches);
        }
    }, [query]);
    return matches;
}