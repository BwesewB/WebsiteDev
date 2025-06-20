import Link from "next/link"
import styles from "./unifiedButton.module.css"

import FigmaLogo from "@/public/icons/FigmaLogo"
import GithubLogo from "@/public/icons/GithubLogo"
import ArrowRight from "../arrowRight"

export default function UnifiedButton({
  externalLink = "",
  backgroundColor = "var(--blue)",
  buttonContentColour = "var(--sand)",
  text = "CLICK",
  icon = null,        // "figma" | "github" | "arrow" | null
}) {
  const IconComponent =
    icon === "figma"
      ? FigmaLogo
      : icon === "github"
      ? GithubLogo
      : icon === "arrow"
      ? ArrowRight
      : null

  return (
    <div className={styles.button} style={{ backgroundColor }}>
      <Link
        href={externalLink}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
      >
        <p
          style={{ color: buttonContentColour }}
          className={styles.buttonText ?? styles.pText}
        >
          {text}
        </p>
        {IconComponent && (
          <div className={styles.arrowDiv}>
            <IconComponent color={buttonContentColour} />
          </div>
        )}
      </Link>
    </div>
  )
}
