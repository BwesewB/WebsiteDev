import GridLayout from "@/components/atoms/gridLayout/gridLayout"
import TextContainer from "@/components/atoms/textContainer/page"
import MediaBlockOrChild from "@/components/molecules/MediaBlockOrChild/mediaBlockOrChild"
import LargeTextSection from "../LargeTextSection/largeTextSection"

export default function LayoutSix({
    sectionText,
    header,
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
                    colEnd={3} 
                    rowStart={1} 
                    rowEnd={3}
                >
                    <LargeTextSection 
                        paragraphTitleText={sectionText}
                    />
                </GridLayout.Item>
                <GridLayout.Item 
                    colStart={1} 
                    colEnd={3} 
                    rowStart={4} 
                    rowEnd={5}
                >
                    <TextContainer
                        header={header}
                    />
                </GridLayout.Item>
                <GridLayout.Item 
                    colStart={3} 
                    colEnd={5} 
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
            </GridLayout>
        </>
    )
}