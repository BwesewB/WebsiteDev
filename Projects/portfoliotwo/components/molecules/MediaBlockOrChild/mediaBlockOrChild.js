import MediaBlock from "../MediaBlock/MediaBlock";

export default function MediaBlockOrChild({
    imageSrc,
    videoSrc,
    mediaWidth,
    children,
}){

    const hasMediaContent = children || imageSrc || videoSrc;

    return (
        <>
            {hasMediaContent && (
                <div style={{width: "100%", height: "100%", objectFit: "cover"}}>
                    {children ? (
                        children 
                    ) : (
                        <MediaBlock
                            imageSrc={imageSrc}
                            videoSrc={videoSrc}
                            mediaWidth={mediaWidth}
                        />
                    )}
                </div>
            )}
        </>
    )
}