import styles from "./heroSection.module.css"


export default function HeroSection({
    imageSrc="",
    videoSrc=""
}) {
    return(
        <>
            <div className={styles.fullWidth}>
                <img src={imageSrc} className={styles.image}/>
                <video autoPlay loop muted preload="auto" playsInline>
                    <source src={videoSrc} type="video/mp4"/>
                </video>
            </div>
        </>
    )
}