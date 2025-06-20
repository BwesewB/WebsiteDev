"use client";

import { useRef, useLayoutEffect } from 'react';
import Lottie from "lottie-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LottieScrollTrigger({
    animationData,
    src, // <-- ADD THIS NEW PROP
    startTrigger = "top 80%",
    style = {},
    className = ""
}) {
    const lottieRef = useRef(null);
    const containerRef = useRef(null);

    useLayoutEffect(() => {
        const lottieInstance = lottieRef.current;
        if (!lottieInstance) return;

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
        
        return () => ctx.revert();
    }, [animationData, src, startTrigger]); // <-- ADD src TO DEPENDENCY ARRAY

    return (
        <div ref={containerRef} className={className} style={style}>
            <Lottie
                lottieRef={lottieRef}
                // Conditionally use animationData OR the new 'path' prop for URLs
                animationData={animationData ? animationData : null}
                path={src ? src : null} // <-- ADD THIS NEW PROP
                loop={true}
                autoplay={false}
                style={{ width: '100%', height: '100%', overflow: 'hidden' }}
            />
        </div>
    );
}