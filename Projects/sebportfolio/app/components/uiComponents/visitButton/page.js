import styles from "./visitButton.module.css"
import Link from "next/link"
import ArrowRight from "@/public/icons/arrowRight";

export default function VisitButton({
    textContent = "VISIT",
    externalLink = "",
    backgroundColor = "var(--blue)",
    buttonTextColour = "var(--white)"
}) {
    return(
        <>
            <div className={styles.button} style={{backgroundColor: backgroundColor}}>
                <Link href={externalLink} target="_blank" rel="noopener noreferrer" className={styles.link}>
                    <p style={{color: buttonTextColour}} className={styles.pText}>{textContent}</p>
                    <div className={styles.arrowDiv}><ArrowRight /></div>
                </Link>
            </div>
        </>
    )
}