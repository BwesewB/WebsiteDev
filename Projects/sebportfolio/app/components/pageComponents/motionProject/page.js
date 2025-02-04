"use client"

import styles from "./motionProject.module.css";
import SectionTwo from "../../projectTemplates/SectionTwo/page";
import Link from "next/link";
import { useEffect } from "react";

export default function MotionProject({
    videoSrc = "",
    title = "",
    description = "Lorem ipsum dolor siet ameit",
    projectLink = ""
}) {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.videoContainer}>
                <Link href={projectLink} className={styles.videoLink} > {/* there was a passhref here */}
                    <div className={styles.overlay}>
                        <h5 className="h5stretched" style={{color: "var(--white)"}}>Visit Project</h5>
                    </div>
                    <SectionTwo 
                        videoSrc={videoSrc}
                    />
                </Link>
            </div>
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    );
}