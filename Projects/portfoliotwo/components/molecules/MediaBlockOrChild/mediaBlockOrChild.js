'use client';

import MediaBlock from "../MediaBlock/MediaBlock";

export default function MediaBlockOrChild({ children, ...props }){
    if (children) {
        return children;
    }
    return (
        <MediaBlock {...props} />
    );
}