import GridLayout from "@/components/atoms/gridLayout/gridLayout"
import TextContainer from "@/components/atoms/textContainer/page"
import MediaBlockOrChild from "@/components/molecules/MediaBlockOrChild/mediaBlockOrChild"

export default function LayoutThree({
    header,
    paragraph,

    imageSrc1,
    videoSrc1,
    mediaSlotOne,

    imageSrc2,
    videoSrc2,
    mediaSlotTwo,


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
                        imageSrc={imageSrc1} 
                        videoSrc={videoSrc1}
                        children={mediaSlotOne}
                    />
                </GridLayout.Item>
                <GridLayout.Item 
                    colStart={3} 
                    colEnd={4} 
                    rowStart={2} 
                    rowEnd={3}
                >
                    <TextContainer 
                        header={header}
                    />
                </GridLayout.Item>
                <GridLayout.Item 
                    colStart={3} 
                    colEnd={4} 
                    rowStart={3} 
                    rowEnd={5}
                >
                    <MediaBlockOrChild 
                        imageSrc={imageSrc2} 
                        videoSrc={videoSrc2}
                        children={mediaSlotTwo}
                    />
                </GridLayout.Item>
                <GridLayout.Item 
                    colStart={4} 
                    colEnd={5} 
                    rowStart={3} 
                    rowEnd={5}
                >
                    <TextContainer 
                        paragraph={paragraph}
                    />
                </GridLayout.Item>
            </GridLayout>
        </>
    )
}