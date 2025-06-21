"use client";

import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function StickyContainer({
    children,
    // THE FIX #1: We now accept a direct ref object, not a string selector
    endTriggerRef, 
    className
}) {
    const containerRef = useRef(null);

    useLayoutEffect(() => {
        let ctx; 
        // We use a timeout to ensure all child elements (like images) have rendered
        // and have their final dimensions, which is crucial for the height calculation.
        const timeout = setTimeout(() => {
            const triggerElement = containerRef.current;
            // THE FIX #2: We get the element directly from the ref's .current property
            const endTriggerElement = endTriggerRef ? endTriggerRef.current : null;
            
            if (!triggerElement || !endTriggerElement) {
                // This check is now much more reliable
                console.warn(`StickyContainer: A trigger or endTrigger element ref is missing.`);
                return;
            }

            ctx = gsap.context(() => {
                ScrollTrigger.create({
                    trigger: triggerElement,
                    pin: true,
                    start: "top var(--sideSpacing)",
                    endTrigger: endTriggerElement,
                    // The robust calculation that handles all height scenarios
                    end: () => {
                        const triggerHeight = triggerElement.offsetHeight;
                        const endTriggerHeight = endTriggerElement.offsetHeight;
                        
                        if (triggerHeight > endTriggerHeight) {
                            return `bottom bottom-=${triggerHeight - endTriggerHeight}`;
                        }
                        return `+=${endTriggerHeight - triggerHeight}`;
                    },
                    pinSpacing: true, 
                    // markers: true, 
                });
            }, containerRef);

        }, 200);

        return () => {
            clearTimeout(timeout);
            if (ctx) ctx.revert();
        };

    }, [endTriggerRef]);

    return (
        <div ref={containerRef} className={className}>
            {children}
        </div>
    );
}