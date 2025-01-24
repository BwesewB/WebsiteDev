import styles from './SectionTwo.module.css';

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
                    className={styles.videoElement}
                    autoPlay
                    loop 
                    preload="auto"
                    playsInline
                />
            }
        </div>
    );
}