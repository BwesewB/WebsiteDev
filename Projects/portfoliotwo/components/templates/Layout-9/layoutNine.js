import GridLayout, { Item as GridLayoutItem } from "@/components/atoms/gridLayout/gridLayout"
import TextContainer from "@/components/atoms/textContainer/page"
import MediaBlockOrChild from "@/components/molecules/MediaBlockOrChild/mediaBlockOrChild"

export default function LayoutNine({
    header,
    paragraph,
    mediaHeight,
    scale,
    switchLayout: switchLayout = true, 

    imageSrc1,
    videoSrc1,
    childrenSlotOne,

    imageSrc2,
    videoSrc2,
    childrenSlotTwo,


}) {

    const mediaItem1Props = switchLayout
        ? { colStart: 1, colEnd: 3, rowStart: 2, rowEnd: 5 } 
        : { colStart: 1, colEnd: 3, rowStart: 1, rowEnd: 4 }; 

    const mediaItem2Props = switchLayout
        ? { colStart: 3, colEnd: 5, rowStart: 2, rowEnd: 5 } 
        : { colStart: 3, colEnd: 5, rowStart: 1, rowEnd: 4 }; 

    // Props for the header text
    const headerItemProps = switchLayout
        ? { colStart: 1, colEnd: 3, rowStart: 1, rowEnd: 2 } // Layout when switch is TRUE
        : { colStart: 1, colEnd: 3, rowStart: 4, rowEnd: 5 }; // Default layout

    // Props for the paragraph text
    const paragraphItemProps = switchLayout
        ? { colStart: 3, colEnd: 5, rowStart: 1, rowEnd: 2 } // Layout when switch is TRUE
        : { colStart: 3, colEnd: 5, rowStart: 4, rowEnd: 5 };

    const textWrapperStyle = switchLayout
        ? { marginBottom: 'var(--imageTextSpacing)' } // If true, create an object with marginBottom
        : { marginTop: 'var(--imageTextSpacing)' };

    // const gridRowSetup = switchLayout
    //     ? "1fr auto auto auto"
    //     : "auto auto auto 1fr";

    return (
        <>
            <GridLayout  > {/*viewHeight={viewHeight} rowLayout={gridRowSetup}*/}
                <GridLayoutItem {...mediaItem1Props}>
                    <MediaBlockOrChild 
                        imageSrc={imageSrc1} 
                        videoSrc={videoSrc1}
                        children={childrenSlotOne}
                        mediaHeight={mediaHeight}
                        scale={scale}
                    />
                </GridLayoutItem >
                <GridLayoutItem {...headerItemProps}>
                    <div style={textWrapperStyle}>
                        <TextContainer header={header} />
                    </div>
                </GridLayoutItem >
                <GridLayoutItem {...mediaItem2Props}>
                    <MediaBlockOrChild 
                        imageSrc={imageSrc2} 
                        videoSrc={videoSrc2}
                        children={childrenSlotTwo}
                        mediaHeight={mediaHeight}
                        scale={scale}
                    />
                </GridLayoutItem >
                <GridLayoutItem {...paragraphItemProps}>
                    <div style={textWrapperStyle}>
                        <TextContainer paragraph={paragraph} />
                    </div>
                </GridLayoutItem >
            </GridLayout>
        </>
    )
}