import SectionTwo from "../SectionTwo/page";
import styles from "./SectionEight.module.css";

export default function SectionEight({ 
    sectionHeading,
    color = "var(--black)",
    imageOne, 
    videoOne, 
    imageTwo, 
    videoTwo, 
    imageThree, 
    videoThree, 
    imageFour, 
    videoFour,
    scale = "100%"
}) {

    const mediaItems = [
        { image: imageOne, video: videoOne },
        { image: imageTwo, video: videoTwo },
        { image: imageThree, video: videoThree },
        { image: imageFour, video: videoFour }
    ].filter(item => item.image || item.video); // Only keep the ones that exist

    return (
        <section className={styles.sectionEightWrap}>
            <h4 style={{color: color}}>{sectionHeading}</h4>
            <div className={`${styles.mediaContainer} ${styles[`layout-${mediaItems.length}`]}`}>
                    {mediaItems.map((item, index) => (
                        <SectionTwo key={index} imageSrc={item.image} videoSrc={item.video} mediaWidth={scale}/>
                    ))}
            </div>
        </section>
    );
}
