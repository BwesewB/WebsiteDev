import styles from "./buttonRound.module.css"
import Link from "next/link"

export default function ButtonRound({
    textContent = "",
    externalLink = "",
    backgroundColor = "var(--blue)",
    textColour = "var(--white)"
}) {
    return(
        <>
            <div className={styles.button} style={{backgroundColor: backgroundColor}}>
                <Link href={externalLink}>
                    <p style={{color: textColour}}>{textContent}</p>
                </Link>
            </div>
        </>
    )
}