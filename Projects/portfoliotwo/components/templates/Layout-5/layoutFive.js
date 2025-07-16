import GridLayout, { Item as GridLayoutItem } from "@/components/atoms/gridLayout/gridLayout"
import TextContainer from "@/components/atoms/textContainer/page"
import MediaBlockOrChild from "@/components/molecules/MediaBlockOrChild/mediaBlockOrChild"
import styles from './layoutFive.module.css'

export default function LayoutFive({
    imageSrc,
    videoSrc,
    mediaWidth,
    children,
    header,
    paragraph,
}) {
    return (
        <>
            <GridLayout>
                <GridLayoutItem 
                    colStart={1} 
                    colEnd={3} 
                    rowStart={1} 
                    rowEnd={5}
                >
                    <MediaBlockOrChild 
                        imageSrc={imageSrc}
                        videoSrc={videoSrc}
                        mediaWidth={mediaWidth}
                        children={children}
                    />
                </GridLayoutItem >
                <GridLayoutItem 
                    colStart={3} 
                    colEnd={5} 
                    rowStart={1} 
                    rowEnd={3}
                >
                    <div className={styles.textContainer}>
                        <TextContainer
                            header={header}
                            paragraph={paragraph}
                        />
                    </div>
                    
                </GridLayoutItem >
            </GridLayout>
        </>
    )
}