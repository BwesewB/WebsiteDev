"use client";

import { forwardRef } from 'react'; // 1. Import forwardRef
import Lottie from "lottie-react";

// 2. Wrap the entire component definition in forwardRef
const ControllableLottie = forwardRef(function ControllableLottie(props, ref) {
    // The `ref` from the parent is now the second argument
    const {
        animationData,
        lottieRef,
        style = {},
        className = ""
    } = props;

    return (
        // 3. Attach the forwarded ref to the root div element
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