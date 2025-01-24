"use client"

import styles from './sectionTwo.module.css';

export default function SectionTwo({ 
    imageSrc, 
    videoSrc 
}) {
    return (
        <div className={styles.mediaContainer}>
            {
                imageSrc && 
                <img src={imageSrc} alt={imageSrc} className={styles.imageElement} />
            }
            
            {
                videoSrc && 
                <video 
                    src={videoSrc} 
                    type="video/mp4"
                    className={styles.videoElement}
                    autoPlay
                    loop 
                    preload="auto"
                    playsInline
                    onError={(e) => {
                        console.error('Error loading video', e);
                    }}
                />
            }
        </div>
    );
}