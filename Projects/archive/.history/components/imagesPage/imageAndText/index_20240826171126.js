import styles from "./imageAndText.module.css"
import Image from "next/image"

export default function imageAndText({
    imageLink,
    number,
    alt,

}){
    return(
        <>
            <div className={styles.imageContainer}>
                <Image 
                    src={imageLink}
                    fill={true}
                    alt={alt}
                    />
                <p className={styles.helvParagraph}>00.00.{number}</p>
            </div>
            
        </>
    )
}