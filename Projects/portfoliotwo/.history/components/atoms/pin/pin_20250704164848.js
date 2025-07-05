// components/Pin.js
"use client";

import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React from "react";

gsap.registerPlugin(ScrollTrigger);

// This component's only job is to "pin" its direct child.
export default function Pin({ children }) {
    const pinRef = useRef(null);

    useLayoutEffect(() => {
        // Grab the actual DOM element from the ref
        const elementToPin = pinRef.current;
        if (!elementToPin) return;

        // Use a parent element as the trigger to control the duration of the pin
        const triggerElement = elementToPin.parentElement;

        const st = ScrollTrigger.create({
            trigger: triggerElement,
            pin: elementToPin,
            // When the top of the element to pin hits the top of the screen
            start: "top top",
            // Unpin when the bottom of the PARENT container hits the bottom of the screen
            end: "bottom bottom",
            pinSpacing: false, // Don't add extra space
            // markers: true, // Uncomment this line to see the triggers!
        });

        // Cleanup when the component unmounts
        return () => {
            st.kill();
        };

    }, []);

    // We use React.cloneElement to attach our ref to the child you pass in.
    // This is a clean way to avoid asking for refs as props.
    return React.cloneElement(children, { ref: pinRef });
}