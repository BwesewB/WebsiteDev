"use client";

import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother'; // Import if not already global

// Ensure ScrollSmoother is registered if not done globally
// gsap.registerPlugin(ScrollTrigger, ScrollSmoother); // Already done in ClientWrap

export default function StickyContainer({ 
    children, 
    endTrigger, // A CSS selector for the element that marks the end of the scroll
    className 
}) {
    const containerRef = useRef(null);

    useLayoutEffect(() => {
        if (!containerRef.current) return;
        if (!endTrigger) {
            console.warn("StickyContainer: 'endTrigger' prop is required.");
            return;
        }

        // Get the ScrollSmoother instance. This assumes it's initialized by the time this runs.
        // It's generally better if ScrollSmoother is initialized before its child components' effects.
        const smoother = ScrollSmoother.get(); 

        const timerId = setTimeout(() => {
            const endTriggerElement = document.querySelector(endTrigger);
            if (!endTriggerElement) {
                console.warn(`StickyContainer: endTrigger element ("${endTrigger}") not found.`);
                return;
            }
            
            const pinnedEl = containerRef.current;

            const ctx = gsap.context(() => {
                ScrollTrigger.create({
                    trigger: pinnedEl,
                    pin: true,
                    // scroller: smoother ? smoother.wrapper : window, // Explicitly set scroller if smoother exists
                                                                  // Or often smoother.content
                                                                  // However, with normalizeScroll:true, GSAP often handles this.
                                                                  // If issues persist, try uncommenting and testing with smoother.wrapper or smoother.content
                    pinType: smoother ? "transform" : "fixed", // Use transform with ScrollSmoother
                    start: "top var(--sideSpacing)",
                    endTrigger: endTriggerElement,
                    end: () => {
                        // We need to get the "actual" heights as perceived by the layout
                        // getBoundingClientRect can be more reliable with transforms involved
                        const pinnedRect = pinnedEl.getBoundingClientRect();
                        const endTriggerRect = endTriggerElement.getBoundingClientRect();

                        // Calculate heights. Using scrollHeight or offsetHeight might also work,
                        // but getBoundingClientRect().height can be safer with transforms.
                        const pinnedHeight = pinnedRect.height;
                        const endTriggerHeight = endTriggerRect.height;
                        
                        // If the smoother is active, its effects might alter perceived scroll distances.
                        // The core logic remains: scroll for the difference in heights.
                        // Ensure a non-negative value for the scroll distance.
                        const scrollDistance = Math.max(0, endTriggerHeight - pinnedHeight);
                        
                        // console.log(`Pinned Height: ${pinnedHeight}, EndTrigger Height: ${endTriggerHeight}, Scroll Distance: ${scrollDistance}`);
                        return `+=${scrollDistance}`;
                    },
                    pinSpacing: false,
                    invalidateOnRefresh: true,
                    refreshPriority: -1, // Give ScrollSmoother a higher refresh priority
                    markers: true, 
                });
            }, pinnedEl); // Scope context to the pinned element

        }, 0); 

        return () => {
            clearTimeout(timerId);
            // Context will revert
        };
    }, [endTrigger, children]); 

    return (
        <div ref={containerRef} className={className}>
            {children}
        </div>
    );
}