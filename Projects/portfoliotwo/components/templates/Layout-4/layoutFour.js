import GridLayout, { Item as GridLayoutItem } from "@/components/atoms/gridLayout/gridLayout"
import TextContainer from "@/components/atoms/textContainer/page"
import MediaBlockOrChild from "@/components/molecules/MediaBlockOrChild/mediaBlockOrChild"

export default function LayoutFour({
    viewHeight,

    header,
    paragraph1,
    paragraph2,
    paragraph3,

    imageSrc,
    videoSrc,
    mediaWidth,
    children
}) {

    const hasBottomRowContent = paragraph2 || paragraph3;

    return (
        <>
            <GridLayout viewHeight={viewHeight}>
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
                    rowEnd={hasBottomRowContent ? 4 : 5} 
                >
                    <MediaBlockOrChild 
                        imageSrc={imageSrc}
                        videoSrc={videoSrc}
                        mediaWidth={mediaWidth}
                        children={children}
                    />
                </GridLayoutItem >
                {hasBottomRowContent && (
                    <>
                        <GridLayoutItem 
                            colStart={3} 
                            colEnd={4} 
                            rowStart={4} 
                            rowEnd={5}
                        >
                            {/* Only render the TextContainer if paragraph2 exists */}
                            {paragraph2 && <TextContainer paragraph={paragraph2} />}
                        </GridLayoutItem>

                        <GridLayoutItem 
                            colStart={4} 
                            colEnd={5} 
                            rowStart={4} 
                            rowEnd={5}
                        >
                            {/* Only render the TextContainer if paragraph3 exists */}
                            {paragraph3 && <TextContainer paragraph={paragraph3} />}
                        </GridLayoutItem>
                    </>
                )}
            </GridLayout>
        </>
    )
}