import styles from "./motionProject.module.css";
import Link from "next/link";

export default function MotionProject({
    videoSrc = "",
    title = "",
    description = "Lorem ipsum dolor siet ameit",
    projectLink = ""
}) {
    return (
        <div className={styles.container}>
            <div className={styles.videoContainer}>
                <Link href={projectLink} className={styles.videoLink}>
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
            <h1>{title}</h1>
            <p>{description}</p>
        </div>
    );
}