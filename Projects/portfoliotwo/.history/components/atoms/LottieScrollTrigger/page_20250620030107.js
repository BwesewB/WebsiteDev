"use client";

import { useRef, useLayoutEffect } from 'react';
import Lottie from "lottie-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LottieScrollTrigger({ 
    animationData, 
    startTrigger = "top 80%",
    className = ""
}) {
    const lottieRef = useRef(null);
    const containerRef = useRef(null);

    useLayoutEffect(() => {
        const lottieInstance = lottieRef.current;
        if (!lottieInstance) return;

        // THE FIX: Use a small timeout to delay the ScrollTrigger creation.
        // This gives ScrollSmoother in your main layout time to initialize first.
        const timeout = setTimeout(() => {
            lottieInstance.stop();

            const ctx = gsap.context(() => {
                ScrollTrigger.create({
                    trigger: containerRef.current,
                    start: startTrigger,
                    onEnter: () => lottieInstance.play(),
                    onLeave: () => lottieInstance.stop(),
                    onEnterBack: () => lottieInstance.play(),
                    onLeaveBack: () => lottieInstance.stop(),
                    markers: true
                });
            }, containerRef);
            
            // We'll store the context in the timeout so we can clean it up.
            timeout.ctx = ctx;

        }, 100); // 100ms is a safe delay

        // Cleanup function
        return () => {
            clearTimeout(timeout);
            // If the context was created, revert it.
            if (timeout.ctx) {
                timeout.ctx.revert();
            }
        };

    }, [animationData, startTrigger]);

    return (
        <div 
            ref={containerRef} 
            className={className} 
            style={{ width: '100%', height: '100%' }}
        >
            <Lottie
                lottieRef={lottieRef}
                animationData={animationData}
                loop={true}
                autoplay={false}
                style={{ width: '100%', height: '100%' }}
            />
        </div>
    );
}