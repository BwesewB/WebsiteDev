import styles from "../videoComp/videoComp.module.css"
import { useState } from 'react';

export default function videoComp({}){
    const [currentVideo, setCurrentVideo] = useState(1); // Initial video is video 1

    const videos = {
        1: "https://www.example.com/video1.mp4", // Replace with your video URLs
        2: "https://www.example.com/video2.mp4",
        3: "https://www.example.com/video3.mp4",
    };

    const handleButtonClick = (videoNumber) => {
        setCurrentVideo(videoNumber);
    };

    return (
        <>
            <div className={styles.timeline}>
                <div className={styles.sectionOne}>
                    <div className={styles.videoSection}>
                        <p className={styles.label}>a1</p>
                        <button onClick={() => handleButtonClick(1)} className={styles.butting}>continuities</button>
                        <p className={styles.time}>1:44</p>
                    </div>
                </div>
                <div className={styles.sectionTwo}>
                    
                </div>
            </div>

            {/* <div>
                <video key={currentVideo} width="600" controls autoPlay>
                    <source src={videos[currentVideo]} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div> */}
        </>
    );
}