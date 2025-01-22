import styles from "./heroSection.module.css"


export default function HeroSection({
    imageSrc="",
    videoSrc=""
}) {
    return(
        <>
            <div className={styles.fullWidth}>
                {
                    imageSrc && 
                    <img src={imageSrc} alt={imageSrc} className={styles.image} />
                }
                
                {
                    videoSrc && 
                    <video 
                        autoPlay 
                        loop 
                        muted 
                        preload="metadata" 
                        playsInline 
                        className={styles.video}
                    >
                        <source src={videoSrc} type="video/mp4" />
                    </video>
                }
            </div>
        </>
    )
}