"use client";

import { useRef, useLayoutEffect } from 'react';
import Lottie from "lottie-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// It's good practice to register plugins at the top level of your component
gsap.registerPlugin(ScrollTrigger);

export default function LottieScrollTrigger({ 
    animationData, 
    startTrigger = "top 80%", // When the top of the anim hits 80% down the viewport
    className = ""
}) {
    const lottieRef = useRef(null);      // Ref for the Lottie player instance
    const containerRef = useRef(null);   // Ref for the trigger container element

    useLayoutEffect(() => {
        // Get the Lottie instance from the ref
        const lottieInstance = lottieRef.current;

        // Ensure the Lottie instance is available
        if (!lottieInstance) return;

        // Stop the animation initially
        lottieInstance.stop();

        // Use GSAP Context for robust cleanup
        const ctx = gsap.context(() => {
            // Create the ScrollTrigger
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: startTrigger,
                // We use callbacks to control the Lottie animation
                onEnter: () => lottieInstance.play(),
                onLeave: () => lottieInstance.stop(), // Optional: Stop when it scrolls out of view
                onEnterBack: () => lottieInstance.play(), // Optional: Play again when scrolling back up
                onLeaveBack: () => lottieInstance.stop(), // Optional: Stop when scrolling back up
                markers: true
            });
        }, containerRef);

        // Cleanup function
        return () => ctx.revert();

    }, [animationData, startTrigger]);

    return (
        <div ref={containerRef} className={className}>
            <Lottie
                lottieRef={lottieRef}
                animationData={animationData}
                loop={true}           // Tell Lottie to loop
                autoplay={false}      // Prevent it from playing on load
            />
        </div>
    );
}