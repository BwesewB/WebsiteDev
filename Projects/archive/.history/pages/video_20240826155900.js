import styles from "@/styles/video.module.css";
import HeadData from "@/components/HeadData";
import Header from "@/components/Header";
import VideoComp from "@/components/VideoPage/videoComp";
import { useEffect } from "react";
import gsap from "gsap";
import { data } from "@/components/VideoPage/Data";
import { useState } from "react";

export default function video({}){

    const [selectedData, setSelectedData] = useState(data[0]);

    const handleButtonClick = (id) => {
        const item = data.find((d) => d.id === id);
        setSelectedData(item);
    };

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
    }, [])

    return(
        <>
            <HeadData title="video" description="Videos by Colin Chan"/>
            <main className={`${styles.main}`}>
                <div style={{ backgroundColor: 'var(--black)', minHeight: '100vh' }}>
                    <Header 
                        lineHoriz = {0.5}
                        headerNamesDelay = {0.7}
                        headerButtonDelay = {0.9}
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
                                    autoPlay 
                                    loop 
                                    width="600"
                                    >
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