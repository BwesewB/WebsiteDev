import UnifiedButton from "@/components/atoms/unifiedButton/page";
import MediaBlockOrChild from "@/components/molecules/MediaBlockOrChild/mediaBlockOrChild";
import TextContainer from "@/components/atoms/textContainer/page";
import styles from "./layoutHero.module.css"

export default function LayoutHero({
    imageSrc,
    videoSrc,
    children,
    height = '75vh',
    buttons = [],

    title,
    subHeader,
    paragraph,
}) {
    return(
        <>
            <section className={styles.mainContainer}>
                <div className={styles.topMediaWrapper} style={{height: height}}>
                    <MediaBlockOrChild 
                        imageSrc={imageSrc} 
                        videoSrc={videoSrc}
                        children={children}
                    />
                </div>
                <div className={styles.bottomSection}>
                    <div className={styles.bottomLeft}>
                        {title && <h1>{title}</h1>}
                    </div>
                    <div className={styles.bottomRight}>
                        <div className={styles.rightTop}>
                            {buttons && buttons.length > 0 && (
                                <div className={styles.buttonContainer}>
                                    {buttons.map((button, index) => (
                                        <UnifiedButton key={`btn-${index}`} {...button} />
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className={styles.rightBottom}>
                            {subHeader && <h2>{subHeader}</h2>}
                            <TextContainer paragraph={paragraph} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}