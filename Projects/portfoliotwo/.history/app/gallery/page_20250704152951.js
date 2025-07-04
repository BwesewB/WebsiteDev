"use client";

import Masonry from "react-masonry-css";
import styles from "./threeD.module.css";
import dynamic from 'next/dynamic';
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useState, useRef, useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

const Scene = dynamic(() => import('./torus/Scene'), {
    ssr: false, //u can add placeholder for loading 
    loading: () => <h1 style={{color:"var(--black)", position: "absolute", top: "50%", right: "50%"}}>Loading...</h1>,
    //tells next js only render on client side
})

const images = [
    { src: "/media/3dWorks/3shilo-minFlip.webp" },
    { src: "/media/3dWorks/Shilo1.webp" },
    { src: "/media/3dWorks/Shilo2.webp" },
    { src: "/media/3dWorks/Astro1.webp" },
    { src: "/media/3dWorks/Astro2.webp" },
    { src: "/media/3dWorks/City.webp" },
    { src: "/media/3dWorks/AstronautPose.webp" },
    { src: "/media/3dWorks/Concrete1.webp" },
    { src: "/media/3dWorks/Concrete2.webp" },
    { src: "/media/3dWorks/Concrete3.webp" },
    { src: "/media/3dWorks/Concrete4.webp" },
    { src: "/media/3dWorks/cube.webp" },
    { src: "/media/3dWorks/cube2.webp" },
    { src: "/media/3dWorks/earthRender.webp" },
    { src: "/media/3dWorks/GateBuilding.webp" },
    { src: "/media/3dWorks/GateBuilding2.webp" },
    { src: "/media/3dWorks/GateBuilding3.webp" },
    { src: "/media/3dWorks/GateBuilding4.webp" },
    { src: "/media/3dWorks/GateBuilding5.webp" },
    { src: "/media/3dWorks/landscapeTexture.webp" },
    { src: "/media/3dWorks/PlanetAtmosphere.webp" },
];

export default function ThreeD() {
    const imageRefs = useRef([])

    useEffect(() => {
        if (window.innerWidth <= 768) return;

        imageRefs.current.forEach((image, index) => {
            if (!image || index < 3) return;

            gsap.fromTo(
                image,
                { y: -50, opacity: 0, scale:0.6, },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.6,
                    ease: "power1.in",
                    scrollTrigger: {
                        trigger: image,
                        start: "top-=100px 90%",
                        end: "top-=100px 85%",
                        scrub: 1, 
                        once: true,
                        // markers:true,
                    }
                }
            );
        });
    }, []);

    const breakpointColumnsObj = {
        default: 3,
        768: 2,
        480: 1,
    };

    return (
        <div className={styles.threeDContainer}>
            {/* <div className={styles.torusScene}>
                <div className={styles.torusFloat}>
                    <Scene />
                </div>
            </div> */}
            <div className={styles.threeDProjectDisplay}>
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className={styles.masonryGrid}
                    columnClassName={styles.masonryColumn}
                >
                    {images.map(({ src }, index) => (
                        <div 
                            key={index} 
                            className={styles.imageContainer} 
                        >
                            <img 
                                src={src} 
                                alt={`3D Work ${index}`} 
                                ref={(el) => (imageRefs.current[index] = el)}
                            />
                        </div>
                    ))}
                </Masonry>
            </div>
        </div>
    );
}
