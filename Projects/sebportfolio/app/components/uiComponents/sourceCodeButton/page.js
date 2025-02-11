import styles from "./sourceCodeButton.module.css"
import Link from "next/link"
import GithubLogo from "@/public/icons/GithubLogo";

export default function SourceCodeButton({
    externalLink = "",
    backgroundColor = "var(--blue)",
    buttonContentColour = "var(--sand)",
}) {
    return(
        <>
            <div className={styles.button} style={{backgroundColor: backgroundColor}}>
                <Link href={externalLink} target="_blank" rel="noopener noreferrer" className={styles.link}>
                    <p style={{color: buttonContentColour}} className={styles.pText}>SOURCE CODE</p>
                    <div className={styles.arrowDiv}><GithubLogo color={buttonContentColour}/></div>
                </Link>
            </div>
        </>
    )
}