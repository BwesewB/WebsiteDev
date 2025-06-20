"use client";

import { forwardRef } from 'react';
import Lottie from "lottie-react";

// This version is simplified and corrected.
// We are forwarding the parent's `ref` directly to the `div` element.
const ControllableLottie = forwardRef(function ControllableLottie({
    animationData,
    lottieRef,
    className,
    style
}, ref) {
    return (
        <div ref={ref} className={className} style={style}>
            <Lottie
                lottieRef={lottieRef}
                animationData={animationData}
                loop={true}
                autoplay={false}
                style={{ width: '100%', height: '100%', overflow: 'hidden' }}
            />
        </div>
    );
});

export default ControllableLottie;