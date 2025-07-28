import UnifiedButton from "@/components/atoms/unifiedButton/page";
import MediaBlockOrChild from "@/components/molecules/MediaBlockOrChild/mediaBlockOrChild";
import TextContainer from "@/components/atoms/textContainer/page";
import styles from "./layoutHero.module.css"
import TitleLetterUp from "@/components/animations/Text/TitleLetterUp/titleLetterUp";

export default function LayoutHero({
    imageSrc,
    videoSrc,
    children,
    height = "min(60vw, 85vh)",
    buttons = [],
    enablePaddingTop,

    title,
    subHeader,
    paragraph,
    initialMute = false,
    fullWidth, 
}) {

    const hasButtons = buttons && buttons.length > 0;

    return(
        <>
            <section className={styles.mainContainer}>
                <div className={styles.topMediaWrapper}>
                    <MediaBlockOrChild 
                        imageSrc={imageSrc} 
                        videoSrc={videoSrc}
                        children={children}
                        initialMute={initialMute}
                        height={height}
                        fullWidth={fullWidth}
                        borderRadius = "0"
                    />
                </div>
                <div className={styles.bottomSection}>
                    <div className={styles.bottomLeft}>
                        <TitleLetterUp>
                            {title}
                        </TitleLetterUp>
                    </div>
                    <div className={styles.bottomRight}>
                        {hasButtons && (
                            <div className={styles.rightTop}>
                                <div className={styles.buttonContainer}>
                                    {buttons.map((button, index) => (
                                        <UnifiedButton key={`btn-${index}`} {...button} />
                                    ))}
                                </div>
                            </div>
                        )}
                        <div className={styles.rightBottom}>
                            {subHeader && <TextContainer paragraph={subHeader} textColour="var(--grey)" enablePaddingTop={enablePaddingTop}/>}
                            <TextContainer paragraph={paragraph} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}