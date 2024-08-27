import styles from "./imageAndText.module.css"
import Image from "next/image"

export default function imageAndText({
    imageLink,
    width = '',
    height = '',
    top = '',
    left = '',
    alt,
    number,
}){
    return(
        <>
            <div
                className={styles.entireContainer} 
                style={{ paddingTop: top, paddingLeft: left, alignItems: flex-end}}>
                <div 
                    className={styles.imageContainer} 
                    style={{ width: width, height: height}}>
                    <Image 
                        src={imageLink}
                        layout="fill"
                        alt={alt}
                    />
                </div>
                <p className={styles.helvParagraph}>00.00.{number}</p>
        </div>

        </>
    )
}