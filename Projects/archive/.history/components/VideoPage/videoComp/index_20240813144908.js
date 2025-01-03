import styles from "../videoComp/videoComp.module.css"
import { useState, useEffect } from 'react';
import gsap from "gsap";
import { data } from "../Data";

export default function videoComp({

}){
    // const [currentVideo, setCurrentVideo] = useState(1); // Initial video is video 1

    // const videos = {
    //     1: "https://www.example.com/video1.mp4", // Replace with your video URLs
    //     2: "https://www.example.com/video2.mp4",
    //     3: "https://www.example.com/video3.mp4",
    // };

    // const handleButtonClick = (videoNumber) => {
    //     setCurrentVideo(videoNumber);
    // };



    useEffect(() => {
        gsap.fromTo(
            "." + styles.sectionOne + " div",
            {   
                y: "1rem",
                opacity: 0
            }, 
            {
                duration: 2,
                delay: 4,
                y: "0rem",
                ease: "expo.inOut",
                stagger: 0.1,
                opacity: 1
            }
        );

        gsap.fromTo(
            "." + styles.sectionTwo + " div",
            {   
                y: "1rem",
                opacity: 0
            }, 
            {
                duration: 2,
                delay: 7,
                y: "0rem",
                ease: "expo.inOut",
                stagger: 0.1,
                opacity: 1
            }
        );
          
    }, [])

    const [selectedData, setSelectedData] = useState(1);

    const handleButtonClick = (id) => {
        const item = data.find((d) => d.id === id);
        setSelectedData(item);
    };

    return (
        <>
            <div>
                <div>
                    {selectedData && (
                        <>
                            <h1>{selectedData.title}</h1>
                            <p>{selectedData.time}</p>
                            <p>{selectedData.description}</p>
                        </>
                    )}
                </div>
            </div>


            <div className={styles.timeline}>
                <div className={styles.sectionOne}>
                    <div className={styles.videoSection}>
                        <p className={styles.label}>a1</p>
                        <button onClick={() => handleButtonClick(1)} className={styles.butting}>continuities</button>
                        <p className={styles.time}>1:44</p>
                    </div>
                    <div className={styles.videoSection}>
                        <p className={styles.label}>a2</p>
                        <button onClick={() => handleButtonClick(2)} className={styles.butting}>ハマチ</button>
                        <p className={styles.time}>2:51</p>
                    </div>
                    <div className={styles.videoSection}>
                        <p className={styles.label}>a3</p>
                        <button onClick={() => handleButtonClick(3)} className={styles.butting}>half remembered dreams</button>
                        <p className={styles.time}>3:16</p>
                    </div>
                </div>
                <div className={styles.sectionTwo}>
                    <div className={styles.videoSection}>
                        <p className={styles.label}>b1</p>
                        <button onClick={() => handleButtonClick(4)} className={styles.butting}>perpetual sound</button>
                        <p className={styles.time}>2:46</p>
                    </div>
                    <div className={styles.videoSection}>
                        <p className={styles.label}>b2</p>
                        <button onClick={() => handleButtonClick(5)} className={styles.butting}>rice cooker</button>
                        <p className={styles.time}>1:11</p>
                    </div>
                    <div className={styles.videoSection}>
                        <p className={styles.label}>b3</p>
                        <button onClick={() => handleButtonClick(6)} className={styles.butting}>conclusion</button>
                        <p className={styles.time}>1:08</p>
                    </div>
                </div>
            </div>
        </>
    );
}