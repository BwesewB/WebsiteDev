"use client"

import styles from "./motionProject.module.css";
import Link from "next/link";

export default function MotionProject({
    videoSrc = "",
    title = "",
    description = "Lorem ipsum dolor siet ameit",
    projectLink = ""
}) {

    const handleClick = () => {
        window.scrollTo(0, 0);
    };

    return (
        <div className={styles.container}>
            <div className={styles.videoContainer}>
                <Link href={projectLink} className={styles.videoLink} passHref onClick={handleClick}>
                    <div className={styles.overlay}>
                        <h5 className={styles.overlayText}>Visit Project</h5>
                    </div>
                    <video 
                        src={videoSrc} 
                        className={styles.videoElement}
                        autoPlay
                        loop 
                        muted 
                        preload="auto"
                        playsInline
                    />
                </Link>
            </div>
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    );
}