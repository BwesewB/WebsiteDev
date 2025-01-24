import styles from "./buttonRound.module.css"
import Link from "next/link"

export default function ButtonRound({
    textContent = "VISIT",
    externalLink = "",
    backgroundColor = "var(--blue)",
    buttonTextColour = "var(--white)"
}) {
    return(
        <>
            <div className={styles.button} style={{backgroundColor: backgroundColor}}>
                <Link href={externalLink} target="_blank" rel="noopener noreferrer">
                    <p style={{color: buttonTextColour}}>{textContent}</p>
                </Link>
            </div>
        </>
    )
}