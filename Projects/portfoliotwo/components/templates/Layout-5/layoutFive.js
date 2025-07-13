import GridLayout from "@/components/atoms/gridLayout/gridLayout"
import TextContainer from "@/components/atoms/textContainer/page"
import MediaBlockOrChild from "@/components/molecules/MediaBlockOrChild/mediaBlockOrChild"

export default function LayoutFive({
    imageSrc,
    videoSrc,
    mediaWidth,
    children,
    paragraph,
}) {
    return (
        <>
            <GridLayout>
                <GridLayout.Item 
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
                </GridLayout.Item>
                <GridLayout.Item 
                    colStart={4} 
                    colEnd={5} 
                    rowStart={1} 
                    rowEnd={3}
                >
                    <TextContainer
                        paragraph={paragraph}
                    />
                </GridLayout.Item>
            </GridLayout>
        </>
    )
}