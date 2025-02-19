"use client";

import Masonry from "react-masonry-css";
import Image from "next/image";
import styles from "./threeD.module.css";
import dynamic from 'next/dynamic';

const Scene = dynamic(() => import('./torus/Scene'), {
    ssr: false, //u can add placeholder for loading 
    loading: () => <h1 style={{color:"var(--white)", position: "absolute", top: "50%", right: "50%"}}>Loading...</h1>,
    //tells next js only render on client side
})

const images = [
    { src: "/media/3dWorks/3shilo-minFlip.png" },
    { src: "/media/3dWorks/Shilo1.png" },
    { src: "/media/3dWorks/Shilo2.png" },
    { src: "/media/3dWorks/Astro1.png" },
    { src: "/media/3dWorks/Astro2.png" },
    { src: "/media/3dWorks/City.png" },
    { src: "/media/3dWorks/Concrete1.png" },
    { src: "/media/3dWorks/Concrete2.png" },
    { src: "/media/3dWorks/Concrete3.png" },
    { src: "/media/3dWorks/Concrete4.png" },
    { src: "/media/3dWorks/cube.png" },
    { src: "/media/3dWorks/cube2.png" },
    { src: "/media/3dWorks/earthRender.png" },
    { src: "/media/3dWorks/GateBuilding.jpg" },
    { src: "/media/3dWorks/GateBuilding2.jpg" },
    { src: "/media/3dWorks/GateBuilding3.jpg" },
    { src: "/media/3dWorks/GateBuilding4.png" },
    { src: "/media/3dWorks/GateBuilding5.png" },
    { src: "/media/3dWorks/GateBuilding6.png" },
    { src: "/media/3dWorks/landscape texture.png" },
    { src: "/media/3dWorks/Planet Atmosphere.png" },
];

export default function ThreeD() {
    const breakpointColumnsObj = {
        default: 3,
        768: 2,
        480: 1,
    };

    return (
        <div className={styles.threeDContainer}>
            <div className={styles.torusScene}>
                <div className={styles.torusFloat}>
                    <Scene />
                </div>
            </div>
            <div className={styles.threeDProjectDisplay}>
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className={styles.masonryGrid}
                    columnClassName={styles.masonryColumn}
                >
                    {images.map(({ src }, index) => (
                        <div key={index} className={styles.imageContainer}>
                            <img src={src} alt={`3D Work ${index}`} />
                        </div>
                    ))}
                </Masonry>
            </div>
        </div>
    );
}
