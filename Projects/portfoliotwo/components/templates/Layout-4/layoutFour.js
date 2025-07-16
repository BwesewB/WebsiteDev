import GridLayout, { Item as GridLayoutItem } from "@/components/atoms/gridLayout/gridLayout"
import TextContainer from "@/components/atoms/textContainer/page"
import MediaBlockOrChild from "@/components/molecules/MediaBlockOrChild/mediaBlockOrChild"

export default function LayoutFour({
    header,
    paragraph1,
    paragraph2,
    paragraph3,

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
                    colEnd={2} 
                    rowStart={1} 
                    rowEnd={3}
                >
                    <TextContainer
                        header={header}
                        paragraph={paragraph1}
                    />
                </GridLayoutItem >
                <GridLayoutItem 
                    colStart={2} 
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
                </GridLayoutItem >
                <GridLayoutItem 
                    colStart={3} 
                    colEnd={4} 
                    rowStart={4} 
                    rowEnd={5}
                >
                    <TextContainer 
                        paragraph={paragraph2}
                    />
                </GridLayoutItem >
                <GridLayoutItem 
                    colStart={4} 
                    colEnd={5} 
                    rowStart={4} 
                    rowEnd={5}
                >
                    <TextContainer 
                        paragraph={paragraph3}
                    />
                </GridLayoutItem >
            </GridLayout>
        </>
    )
}