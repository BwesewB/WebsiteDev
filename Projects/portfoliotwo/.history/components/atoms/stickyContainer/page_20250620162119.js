"use client";

import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// This component wraps any content you want to make "sticky".
// It needs a reference to the element that defines the scrolling "end" point.
export default function StickyContainer({ 
    children, 
    endTrigger, // A CSS selector for the element that marks the end of the scroll
    className 
}) {
    const containerRef = useRef(null);

    useLayoutEffect(() => {
        if (!endTrigger) {
            console.warn("StickyContainer requires an 'endTrigger' prop.");
            return;
        }

        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: containerRef.current,
                pin: true, // This is the magic! It pins the trigger element.
                start: "top var(--sideSpacing)", // Start pinning when the top hits the top of the viewport (with an offset)
                endTrigger: endTrigger, // The element that defines when to stop pinning
                end: "bottom bottom", // Stop pinning when the bottom of the endTrigger hits the bottom of the viewport
                pinSpacing: false, // Prevents GSAP from adding extra space
            });
        }, containerRef);

        return () => ctx.revert();
    }, [endTrigger]);

    return (
        <div ref={containerRef} className={className}>
            {children}
        </div>
    );
}
