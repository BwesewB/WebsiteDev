import styles from "./projectHero.module.css"

export default function ProjectHero ({
    projectName = "",
    date = "",
    imageSrc = "",
    videoSrc = "",
}) {

    return(
        <>
            <div className={styles.bodyWidth}>
                <div>
                    <h1>{projectName}</h1>
                    <p>{date}</p>
                </div>

                {
                    imageSrc && 
                    <img src={imageSrc} alt={imageSrc} className={styles.image} />
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
        </>
    )
}