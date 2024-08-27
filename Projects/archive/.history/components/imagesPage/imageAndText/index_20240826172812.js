import styles from "./imageAndText.module.css"
import Image from "next/image"

export default function imageAndText({
    imageLink,
    // width='20vw',
    // height='20vh',
    alt,
    number,
}){
    return(
        <>
            <div 
                className={styles.imageContainer} 
                style={{ width: {width}, height: {height}, }}>
                <Image 
                    src={imageLink}
                    fill={true}
                    alt={alt}
                    />
                {/* <p className={styles.helvParagraph}>00.00.{number}</p> */}
            </div>
            
        </>
    )
}