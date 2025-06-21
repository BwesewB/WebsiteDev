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
        // This variable will hold the GSAP context
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

            // Assign the context here
            ctx = gsap.context(() => {
                ScrollTrigger.create({
                    trigger: triggerElement,
                    pin: true,
                    start: "top var(--sideSpacing)",
                    endTrigger: endTriggerElement,
                    
                    // This calculation is the key to making it un-stick at the right time
                    end: () => `bottom bottom-=${triggerElement.offsetHeight - endTriggerElement.offsetHeight > 0 ? 0 : triggerElement.offsetHeight}`,
                    
                    pinSpacing: false,
                    markers: true,
                });
            }, containerRef);

        }, 200);

        // THE FIX: The cleanup function now correctly references the `ctx` variable from the outer scope.
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