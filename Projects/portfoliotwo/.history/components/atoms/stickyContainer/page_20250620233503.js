"use client";

import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function StickyContainer({ 
    children, 
    endTrigger, // A CSS selector for the element that marks the end of the scroll
    className 
}) {
    const containerRef = useRef(null);

    useLayoutEffect(() => {
        // A short delay to ensure all content, especially images, has loaded and rendered
        const timeout = setTimeout(() => {
            if (!endTrigger) {
                console.warn("StickyContainer requires an 'endTrigger' prop.");
                return;
            }

            const ctx = gsap.context(() => {
                const triggerElement = containerRef.current;
                const endTriggerElement = document.querySelector(endTrigger);
                
                if (!triggerElement || !endTriggerElement) {
                    console.warn("StickyContainer: Trigger or endTrigger element not found.");
                    return;
                }

                ScrollTrigger.create({
                    trigger: triggerElement,
                    pin: true,
                    start: "top var(--sideSpacing)", // Your original start value
                    endTrigger: endTriggerElement,

                    // THE DEFINITIVE FIX:
                    // This dynamically calculates the end point. It ensures the element
                    // un-pins exactly when its bottom aligns with the endTrigger's bottom.
                    end: () => `bottom bottom-=${triggerElement.offsetHeight - endTriggerElement.offsetHeight > 0 ? 0 : triggerElement.offsetHeight}`,
                    
                    pinSpacing: false,
                    markers: true,
                });
            }, containerRef);
            
            timeout.ctx = ctx;

        }, 200); // 200ms delay for rendering

        return () => {
            clearTimeout(timeout);
            if (timeout.ctx) {
                timeout.ctx.revert();
            }
        };

    }, [endTrigger]);

    return (
        <div ref={containerRef} className={className}>
            {children}
        </div>
    );
}