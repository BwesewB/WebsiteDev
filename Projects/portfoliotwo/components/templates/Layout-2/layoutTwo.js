import GridLayout, { Item as GridLayoutItem } from "@/components/atoms/gridLayout/gridLayout"
import TextContainer from "@/components/atoms/textContainer/page"
import MediaBlockOrChild from "@/components/molecules/MediaBlockOrChild/mediaBlockOrChild"

export default function LayoutTwo({
    header,
    paragraph1,
    paragraph2,
    imageSrc,
    videoSrc,
    mediaWidth,
    children
}) {
    return (
        <>
            <GridLayout>
                <GridLayoutItem 
                    colStart={1} 
                    colEnd={3} 
                    rowStart={4} 
                    rowEnd={5}
                >
                    <TextContainer 
                        header={header}
                        enablePaddingTop={true}
                    />
                </GridLayoutItem>
                <GridLayoutItem 
                    colStart={3} 
                    colEnd={4} 
                    rowStart={4} 
                    rowEnd={5}
                >
                    <TextContainer 
                        paragraph={paragraph1}
                        enablePaddingTop={true}
                    />
                </GridLayoutItem>
                <GridLayoutItem 
                    colStart={4} 
                    colEnd={5} 
                    rowStart={4} 
                    rowEnd={5}
                >
                    <TextContainer 
                        paragraph={paragraph2}
                    />
                </GridLayoutItem>
                <GridLayoutItem 
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
                </GridLayoutItem>
            </GridLayout>
        </>
    )
}