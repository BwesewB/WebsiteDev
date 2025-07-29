"use client";

import Masonry from "react-masonry-css";
import styles from "./threeD.module.css";
import dynamic from 'next/dynamic';
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger';

import MediaBlockOrChild from "@/components/molecules/MediaBlockOrChild/mediaBlockOrChild";
import LayoutHero from "@/components/templates/LayoutHero/layoutHero";

gsap.registerPlugin(ScrollTrigger);

const Scene = dynamic(() => import('./torus/Scene'), {
    ssr: false, //u can add placeholder for loading 
    loading: () => <h1 style={{color:"var(--black)", position: "absolute", top: "50%", right: "50%"}}>Loading...</h1>,
    //tells next js only render on client side
})

const mediaSources = [
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

    const breakpointColumnsObj = {
        default: 4,
        768: 2,
        480: 1,
    };

    return (
        <div  className={styles.pageContainer}>
            {/* <div className={styles.torusScene}>
                <div className={styles.torusFloat}>
                    <Scene />
                </div>
            </div> */}
            <div className={styles.PageHero}>
                <MediaBlockOrChild
                    videoSrc="/media/3dWorks/MovingMechanicalSphere.mp4"
                    borderRadius="0"
                />
            </div>
            
            <div className={styles.threeDProjectDisplay}>
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className={styles.masonryGrid}
                    columnClassName={styles.masonryColumn}
                >
                    {mediaSources.map(({ src }, index) => {
                        // --- THIS IS THE NEW LOGIC ---
                        // Check if the src string ends with a video extension.
                        const isVideo = src.endsWith('.mp4') || src.endsWith('.webm') || src.endsWith('.mov');

                        return (
                            <div 
                                key={index} 
                                className={styles.imageContainer} 
                            >
                                <MediaBlockOrChild 
                                    // If it's a video, set videoSrc, otherwise set imageSrc.
                                    // Setting the other to 'undefined' is clean and explicit.
                                    videoSrc={isVideo ? src : undefined}
                                    imageSrc={!isVideo ? src : undefined}
                                    
                                    height="auto" 
                                    enableRevealAnimation={index >= 4}
                                    useObjectFitCover={false}
                                    // For videos in a gallery, it's good practice to have them muted by default.
                                    initialMute={true}
                                    borderRadius="0"
                                />
                            </div>
                        );
                    })}
                </Masonry>
            </div>
        </div>
    );
}