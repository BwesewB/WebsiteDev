import GridLayout, { Item as GridLayoutItem } from "@/components/atoms/gridLayout/gridLayout"
import TextContainer from "@/components/atoms/textContainer/page"
import MediaBlockOrChild from "@/components/molecules/MediaBlockOrChild/mediaBlockOrChild"

export default function LayoutNine({
    header,
    paragraph,
    scale,
    useObjectFitCover,
    switch: switchLayout = true, 

    imageSrc1,
    videoSrc1,
    childrenSlotOne,

    imageSrc2,
    videoSrc2,
    childrenSlotTwo,


}) {
    return (
        <>
            <GridLayout>
                <GridLayoutItem 
                    colStart={1} 
                    colEnd={3} 
                    rowStart={1} 
                    rowEnd={4}
                >
                    <MediaBlockOrChild 
                        imageSrc={imageSrc1} 
                        videoSrc={videoSrc1}
                        children={childrenSlotOne}
                        scale={scale}
                        useObjectFitCover={useObjectFitCover}
                    />
                </GridLayoutItem >
                <GridLayoutItem 
                    colStart={1} 
                    colEnd={3} 
                    rowStart={4} 
                    rowEnd={5}
                >
                    <TextContainer 
                        header={header}
                    />
                </GridLayoutItem >
                <GridLayoutItem 
                    colStart={3} 
                    colEnd={5} 
                    rowStart={1} 
                    rowEnd={4}
                >
                    <MediaBlockOrChild 
                        imageSrc={imageSrc2} 
                        videoSrc={videoSrc2}
                        children={childrenSlotTwo}
                        scale={scale}
                        useObjectFitCover={useObjectFitCover}
                    />
                </GridLayoutItem >
                <GridLayoutItem 
                    colStart={3} 
                    colEnd={5} 
                    rowStart={4} 
                    rowEnd={5}
                >
                    <TextContainer 
                        paragraph={paragraph}
                    />
                </GridLayoutItem >
            </GridLayout>
        </>
    )
}