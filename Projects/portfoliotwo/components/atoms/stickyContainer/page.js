"use client";

import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function StickyContainer({
    children,
    endTriggerRef, 
    className
}) {
    const containerRef = useRef(null);

    useLayoutEffect(() => {
        let ctx; 
        const timeout = setTimeout(() => {
            const triggerElement = containerRef.current;
            const endTriggerElement = endTriggerRef ? endTriggerRef.current : null;
            
            if (!triggerElement || !endTriggerElement) {
                console.warn(`StickyContainer: A trigger or endTrigger element ref is missing.`);
                return;
            }

            ctx = gsap.context(() => {
                ScrollTrigger.create({
                    trigger: triggerElement,
                    pin: true,
                    start: "top top",
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