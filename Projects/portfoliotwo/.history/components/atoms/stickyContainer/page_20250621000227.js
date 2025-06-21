"use client";

import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function StickyContainer({
    children,
    endTrigger, // The CSS selector for the end trigger element
    scope,      // THE FIX: A ref to the parent container to search within
    className
}) {
    const containerRef = useRef(null);

    useLayoutEffect(() => {
        let ctx; 
        const timeout = setTimeout(() => {
            // Ensure the scope and selector are provided
            if (!scope || !scope.current || !endTrigger) {
                console.warn("StickyContainer requires a 'scope' ref and an 'endTrigger' prop.");
                return;
            }

            const triggerElement = containerRef.current;
            // THE FIX: We now search for the end trigger *within the provided scope*, not the whole document.
            const endTriggerElement = scope.current.querySelector(endTrigger);
            
            if (!triggerElement || !endTriggerElement) {
                console.warn(`StickyContainer: Trigger or endTrigger element ("${endTrigger}") not found within the provided scope.`);
                return;
            }

            ctx = gsap.context(() => {
                ScrollTrigger.create({
                    trigger: triggerElement,
                    pin: true,
                    start: "top var(--sideSpacing)",
                    endTrigger: endTriggerElement,
                    end: () => {
                        const triggerHeight = triggerElement.offsetHeight;
                        const endTriggerHeight = endTriggerElement.offsetHeight;
                        
                        if (triggerHeight > endTriggerHeight) {
                            return `bottom bottom-=${triggerHeight - endTriggerHeight}`;
                        }
                        return `+=${endTriggerHeight - triggerHeight}`;
                    },
                    pinSpacing: true, 
                    markers: true,
                });
            }, containerRef);

        }, 200);

        return () => {
            clearTimeout(timeout);
            if (ctx) {
                ctx.revert();
            }
        };
    }, [endTrigger, scope]); // Add `scope` to the dependency array

    return (
        <div ref={containerRef} className={className}>
            {children}
        </div>
    );
}
