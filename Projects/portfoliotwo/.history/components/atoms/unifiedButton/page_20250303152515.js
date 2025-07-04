import styles from "./unifiedButton.module.css"
import Link from "next/link"
import FigmaLogo from "@/public/icons/FigmaLogo";

export default function SourceCodeButton({
    externalLink = "",
    backgroundColor = "var(--blue)",
    buttonContentColour = "var(--sand)",
    figma = "FIGMA"
}) {
    return(
        <>
            <div className={styles.button} style={{backgroundColor: backgroundColor}}>
                <Link href={externalLink} target="_blank" rel="noopener noreferrer" className={styles.link}>
                    <p style={{color: buttonContentColour}} className={styles.pText}>{figma}</p>
                    <div className={styles.arrowDiv}><FigmaLogo color={buttonContentColour}/></div>
                </Link>
            </div>
        </>
    )
}