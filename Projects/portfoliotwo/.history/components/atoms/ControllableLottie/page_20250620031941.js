"use client";

import Lottie from "lottie-react";

// This is a simple, reusable component that just displays a Lottie animation.
// It accepts a 'lottieRef' so its parent can control it.
export default function ControllableLottie({
    animationData,
    lottieRef,
    style = {},
    className = ""
}) {
    return (
        <div className={className} style={style}>
            <Lottie
                lottieRef={lottieRef}
                animationData={animationData}
                loop={true}
                autoplay={false}
                style={{ width: '100%', height: '100%', overflow: 'hidden' }}
            />
        </div>
    );
}