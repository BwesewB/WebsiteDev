import GridLayout, { Item as GridLayoutItem } from "@/components/atoms/gridLayout/gridLayout"
import TextContainer from "@/components/atoms/textContainer/page"
import MediaBlockOrChild from "@/components/molecules/MediaBlockOrChild/mediaBlockOrChild"

export default function LayoutOne({
    header,
    paragraph,
    imageSrc,
    videoSrc,
    mediaWidth,
    children,
    switchLayout: switchLayout = true, 
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

    const enablePaddingTop = !switchLayout ? true : false;

    return (
        <>
            <GridLayout>
                <GridLayoutItem {...mediaItemProps}>
                    <MediaBlockOrChild 
                        imageSrc={imageSrc}
                        videoSrc={videoSrc}
                        mediaWidth={mediaWidth}
                        children={children}
                    />
                </GridLayoutItem>

                <GridLayoutItem {...headerItemProps}>
                    <TextContainer 
                        header={header}
                        enablePaddingTop={enablePaddingTop}
                    />
                </GridLayoutItem>
                
                <GridLayoutItem {...paragraphItemProps}>
                    <TextContainer 
                        paragraph={paragraph}
                        enablePaddingTop={enablePaddingTop}
                    />
                </GridLayoutItem>
            </GridLayout>
        </>
    )
}