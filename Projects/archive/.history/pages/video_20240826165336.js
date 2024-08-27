import styles from "@/styles/video.module.css";
import HeadData from "@/components/HeadData";
import Header from "@/components/Header";
import VideoComp from "@/components/VideoPage/videoComp";
import { useEffect } from "react";
import gsap from "gsap";
import { data } from "@/components/VideoPage/Data";
import { useState } from "react";
import { useRef } from "react";

export default function video({}){
    const videoRef = useRef(null);

    const [selectedData, setSelectedData] = useState(data[0]);

    const handleButtonClick = (id) => {
        const item = data.find((d) => d.id === id);
        setSelectedData(item);
    };

    useEffect(() => {
        const tl = gsap.timeline();
        tl.fromTo(
            videoRef.current, 
            {
                opacity:0,
            },
            {
                duration: 2, // Duration of the fade-in effect
                opacity: 1,  // Final opacity
                delay: 2,    // Delay before starting the fade-in and video playback
            });
    }, [selectedData]);

    useEffect(() => {
        gsap.fromTo(
            "." + styles.twennyfour + " h6", //NOTE: THE SPACE NEEDS TO BE THERE. By adding " h6" to the selector, it selects all <h6> elements that are direct children of any element with the class twennyfour. 
            {   
                x: (index) => `${index * -4}rem`, // Start each h6 from its own position
                opacity: 0
            }, 
            {
                duration: 2,
                delay: 1,
                x: "0rem", // Move all h6 elements to the same final position
                ease: "expo.inOut",
                stagger: 0.5, // Stagger each h6 animation by 0.5 seconds
                opacity: 1
            }
        );
        gsap.fromTo(
            "." + styles.changingArea,
            { opacity:0, x: "2rem" }, // Start with bars at the bottom
            { 
                duration: 1.5, 
                opacity:1,
                delay:4.5,
                x: 0, 
                ease: "power1.inOut" 
            }
        );
    }, []);

    return(
        <>
            <HeadData title="video" description="Videos by Colin Chan"/>
            <main className={`${styles.main}`}>
                <div style={{ backgroundColor: 'var(--black)', height: '100vh', }}>
                    <Header 
                        lineHoriz = {7.5}
                        headerNamesDelay = {7.7}
                        headerButtonDelay = {7.9}
                        primaryColor="var(--white)"
                    />

                    <div className={styles.bodey}>
                        <div className={styles.leftSection}>
                            <div className={styles.changingArea}>
                                <h5 className={styles.videoTitle}>{selectedData.title}</h5>
                                <p className={styles.japTitle}>{selectedData.japTitle}</p>
                            </div> 
                            <div className={styles.vidArea}>
                                <video
                                    ref={videoRef}
                                    key={selectedData.id}       
                                    autoPlay 
                                    loop
                                    className={styles.videoSource}>
                                    <source src={selectedData.video} type="video/mp4"/>
                                    Your browser does not support the video tag.
                                </video>
                            </div>



                            <div className={styles.twennyfour}>
                                <h6>twenty-four</h6>
                                <h6>truths</h6>
                                <h6>per</h6>
                                <h6>second</h6>
                            </div>

                        </div>
                        <div className={styles.rightSection}>
                            <VideoComp handleButtonClick={handleButtonClick}/>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}