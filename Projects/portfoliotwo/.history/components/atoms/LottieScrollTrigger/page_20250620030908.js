"use client";

import { useRef, useEffect } from 'react'; // Switch to useEffect for this pattern
import Lottie from "lottie-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LottieScrollTrigger({
    animationData,
    src,
    startTrigger = "top 80%",
    style = {},
    className = ""
}) {
    const lottieRef = useRef(null);
    const containerRef = useRef(null);
    // Use a ref to store the GSAP context for cleanup
    const gsapContext = useRef(null);

    // This useEffect is only for cleanup when the component unmounts
    useEffect(() => {
        return () => {
            // Revert the GSAP context if it exists
            gsapContext.current?.revert();
        }
    }, []);

    const setupGsapAnimation = () => {
        const lottieInstance = lottieRef.current;
        if (!lottieInstance) return;

        lottieInstance.stop();

        // Create the GSAP context and store it in the ref
        gsapContext.current = gsap.context(() => {
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
    };

    return (
        <div ref={containerRef} className={className} style={style}>
            <Lottie
                lottieRef={lottieRef}
                animationData={animationData || null}
                path={src || null}
                loop={true}
                autoplay={false}
                style={{ width: '100%', height: '100%', overflow: 'hidden' }}
                // THIS IS THE KEY: Run our GSAP setup only when Lottie is ready
                onDOMLoaded={setupGsapAnimation}
            />
        </div>
    );
}