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
                    
                    // THE DEFINITIVE FIX:
                    // This tells GSAP to end the pin when the bottom of the scrolling column (endTrigger)
                    // reaches a point that is the height of the sticky element from the bottom of the viewport.
                    // This guarantees their bottoms will align perfectly before unpinning.
                    end: () => `bottom bottom-=${triggerElement.offsetHeight}`,
                    
                    // Let GSAP handle the spacing automatically for stability.
                    pinSpacing: true, 
                    
                    // markers: true, // You can uncomment this to see the final correct triggers
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