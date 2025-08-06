"use client";

import Masonry from "react-masonry-css";
import styles from "./threeD.module.css";
import dynamic from 'next/dynamic';
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger';

import MediaBlockOrChild from "@/components/molecules/MediaBlockOrChild/mediaBlockOrChild";

import shiloMinFlip from "/public/media/3dWorks/3shilo-minFlip.webp";
import shilo1 from "/public/media/3dWorks/Shilo1.webp";
import shilo2 from "/public/media/3dWorks/Shilo2.webp";
import astro1 from "/public/media/3dWorks/Astro1.webp";
import astro2 from "/public/media/3dWorks/Astro2.webp";
import city from "/public/media/3dWorks/City.webp";
import astronautPose from "/public/media/3dWorks/AstronautPose.webp";
import concrete1 from "/public/media/3dWorks/Concrete1.webp";
import concrete2 from "/public/media/3dWorks/Concrete2.webp";
import concrete3 from "/public/media/3dWorks/Concrete3.webp";
import concrete4 from "/public/media/3dWorks/Concrete4.webp";
import cube1 from "/public/media/3dWorks/cube.webp";
import cube2 from "/public/media/3dWorks/cube2.webp";
import earthRender from "/public/media/3dWorks/earthRender.webp";
import gateBuilding1 from "/public/media/3dWorks/GateBuilding.webp";
import gateBuilding2 from "/public/media/3dWorks/GateBuilding2.webp";
import gateBuilding3 from "/public/media/3dWorks/GateBuilding3.webp";
import gateBuilding4 from "/public/media/3dWorks/GateBuilding4.webp";
import gateBuilding5 from "/public/media/3dWorks/GateBuilding5.webp";
import landscapeTexture from "/public/media/3dWorks/landscapeTexture.webp";
import planetAtmosphere from "/public/media/3dWorks/PlanetAtmosphere.webp";

gsap.registerPlugin(ScrollTrigger);

const Scene = dynamic(() => import('./torus/Scene'), {
    ssr: false, //u can add placeholder for loading 
    loading: () => <h1 style={{color:"var(--black)", position: "absolute", top: "50%", right: "50%"}}>Loading...</h1>,
    //tells next js only render on client side
})

const mediaSources = [
    { src: shiloMinFlip },
    { src: shilo1 },
    { src: shilo2 },
    { src: astro1 },
    { src: astro2 },
    { src: city },
    { src: astronautPose },
    { src: concrete1 },
    { src: concrete2 },
    { src: concrete3 },
    { src: concrete4 },
    { src: cube1 },
    { src: cube2 },
    { src: earthRender },
    { src: gateBuilding1 },
    { src: gateBuilding2 },
    { src: gateBuilding3 },
    { src: gateBuilding4 },
    { src: gateBuilding5 },
    { src: landscapeTexture },
    { src: planetAtmosphere },
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
                    {/* The mapping logic is simplified because we know all sources are images */}
                    {mediaSources.map(({ src: imageObject }, index) => (
                        <div 
                            key={index} 
                            className={styles.imageContainer} 
                        >
                            <MediaBlockOrChild 
                                // Pass the entire imported image object to the imageSrc prop
                                imageSrc={imageObject}
                                height="auto" 
                                enableRevealAnimation={index >= 4}
                                useObjectFitCover={false}
                                initialMute={true}
                                borderRadius="0"
                            />
                        </div>
                    ))}
                </Masonry>
            </div>
        </div>
    );
}