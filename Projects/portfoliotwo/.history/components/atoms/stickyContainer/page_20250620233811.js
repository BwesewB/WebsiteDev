"use client";

import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function StickyContainer({
    children,
    endTrigger,
    className
}) {
    const containerRef = useRef(null);

    useLayoutEffect(() => {
        let ctx; 
        const timeout = setTimeout(() => {
            if (!endTrigger) {
                console.warn("StickyContainer requires an 'endTrigger' prop.");
                return;
            }

            const triggerElement = containerRef.current;
            const endTriggerElement = document.querySelector(endTrigger);
            
            if (!triggerElement || !endTriggerElement) {
                console.warn(`StickyContainer: Trigger or endTrigger element ("${endTrigger}") not found.`);
                return;
            }

            ctx = gsap.context(() => {
                ScrollTrigger.create({
                    trigger: triggerElement,
                    pin: true,
                    start: "top var(--sideSpacing)",
                    endTrigger: endTriggerElement,
                    
                    // THE FIX #1: A simpler, more direct calculation for the end point.
                    // This pins the element for a distance equal to the height difference
                    // between the scrolling content and the sticky element.
                    end: () => `+=${endTriggerElement.offsetHeight - triggerElement.offsetHeight}`,

                    // THE FIX #2: Remove pinSpacing: false.
                    // Let GSAP handle the spacing automatically, which is crucial for stability
                    // inside ScrollSmoother.
                    pinSpacing: true,
                    
                    markers: true, // Keep this for now to confirm it works
                });
            }, containerRef);

        }, 200);

        return () => {
            clearTimeout(timeout);
            if (ctx) {
                ctx.revert();
            }
        };

    }, [endTrigger]);

    return (
        <div ref={containerRef} className={className}>
            {children}
        </div>
    );
}