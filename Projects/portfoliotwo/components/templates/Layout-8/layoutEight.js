import GridLayout from "@/components/atoms/gridLayout/gridLayout"
import TextContainer from "@/components/atoms/textContainer/page"
import MediaBlockOrChild from "@/components/molecules/MediaBlockOrChild/mediaBlockOrChild"

export default function LayoutEight({
    header,
    paragraph,
    imageSrc,
    videoSrc,
    mediaWidth,
    children
}) {
    return (
        <>
            <GridLayout>
                <GridLayout.Item 
                    colStart={1} 
                    colEnd={2} 
                    rowStart={1} 
                    rowEnd={2} 
                >
                    <TextContainer 
                        header={header}
                    />
                </GridLayout.Item>
                <GridLayout.Item 
                    colStart={2} 
                    colEnd={3} 
                    rowStart={1} 
                    rowEnd={3} 
                >
                    <TextContainer 
                        paragraph={paragraph}
                    />
                </GridLayout.Item>
                <GridLayout.Item 
                    colStart={3} 
                    colEnd={5} 
                    rowStart={1} 
                    rowEnd={4} 
                >
                    <MediaBlockOrChild 
                        imageSrc={imageSrc}
                        videoSrc={videoSrc}
                        mediaWidth={mediaWidth}
                        children={children}
                    />
                </GridLayout.Item>
            </GridLayout>
        </>
    )
}