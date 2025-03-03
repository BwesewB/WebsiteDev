import styles from "./visitButton.module.css"
import Link from "next/link"
import ArrowRight from "@/public/icons/arrowRight";

export default function VisitButton({
    externalLink = "",
    backgroundColor = "var(--blue)",
    buttonContentColour = "var(--sand)",
    visit = "VISIT",
}) {
    return(
        <>
            <div className={styles.button} style={{backgroundColor: backgroundColor}}>
                <Link href={externalLink} target="_blank" rel="noopener noreferrer" className={styles.link}>
                    <p style={{color: buttonContentColour}} className={styles.pText}>{visit}</p>
                    <div className={styles.arrowDiv}><ArrowRight color={buttonContentColour}/></div>
                </Link>
            </div>
        </>
    )
}