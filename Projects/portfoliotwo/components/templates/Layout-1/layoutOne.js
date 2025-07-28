import GridLayout, { Item as GridLayoutItem } from "@/components/atoms/gridLayout/gridLayout"
import TextContainer from "@/components/atoms/textContainer/page"
import MediaBlockOrChild from "@/components/molecules/MediaBlockOrChild/mediaBlockOrChild"

export default function LayoutOne({
    viewHeight,
    header,
    paragraph,
    imageSrc,
    videoSrc,
    height,
    mediaHeight,
    scale,
    children,
    switchLayout: switchLayout = true, 
    initialMute,
}) {

    const mediaItemProps = switchLayout
    ? { colStart: 1, colEnd: 5, rowStart: 2, rowEnd: 5 } // Layout when switch is TRUE
    : { colStart: 1, colEnd: 5, rowStart: 1, rowEnd: 4 }; // Default layout

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

    return (
        <>
            <GridLayout viewHeight={viewHeight}>
                <GridLayoutItem {...mediaItemProps} >
                    <MediaBlockOrChild 
                        imageSrc={imageSrc}
                        videoSrc={videoSrc}
                        mediaHeight={mediaHeight}
                        children={children}
                        scale={scale}
                        height={height}
                        initialMute={initialMute}
                    />
                </GridLayoutItem>

                <GridLayoutItem {...headerItemProps}>
                    <div style={textWrapperStyle}>
                        <TextContainer header={header} />
                    </div>
                </GridLayoutItem>
                
                <GridLayoutItem {...paragraphItemProps}>
                    <div style={textWrapperStyle}>
                        <TextContainer paragraph={paragraph} />
                    </div>
                </GridLayoutItem>
            </GridLayout>
        </>
    )
}