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
            <div>
                <div>
                    <button onClick={() => handleButtonClick(1)}>Video 1</button>
                    <button onClick={() => handleButtonClick(2)}>Video 2</button>
                    <button onClick={() => handleButtonClick(3)}>Video 3</button>
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