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
                    // This function now handles BOTH height scenarios correctly.
                    end: () => {
                        const triggerHeight = triggerElement.offsetHeight;
                        const endTriggerHeight = endTriggerElement.offsetHeight;
                        
                        // If the sticky element is TALLER than the scrolling content,
                        // we un-pin it when the bottom of the CONTENT column leaves.
                        if (triggerHeight > endTriggerHeight) {
                            return `bottom bottom-=${triggerHeight - endTriggerHeight}`;
                        }
                        
                        // Otherwise (the content is taller), we pin for the difference in height,
                        // which makes their bottoms align perfectly.
                        return `+=${endTriggerHeight - triggerHeight}`;
                    },

                    pinSpacing: true, 
                    markers: true, // You can uncomment this to confirm it's working
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