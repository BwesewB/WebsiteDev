import UnifiedButton from "@/components/atoms/unifiedButton/page";
import MediaBlockOrChild from "@/components/molecules/MediaBlockOrChild/mediaBlockOrChild";
import TextContainer from "@/components/atoms/textContainer/page";
import styles from "./layoutHero.module.css"
import TitleLetterUp from "@/components/animations/Text/TitleLetterUp/titleLetterUp";

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

    const hasButtons = buttons && buttons.length > 0;

    return(
        <>
            <section className={styles.mainContainer}>
                <div className={styles.topMediaWrapper} style={{height: height}}>
                    <MediaBlockOrChild 
                        imageSrc={imageSrc} 
                        videoSrc={videoSrc}
                        children={children}
                        enableParallax={true}
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
                            {subHeader && <TextContainer paragraph={subHeader} textColour="var(--grey)" enablePaddingTop={true}/>}
                            <TextContainer paragraph={paragraph} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}