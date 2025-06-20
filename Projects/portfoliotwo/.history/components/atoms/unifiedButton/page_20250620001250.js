import Link from "next/link"
import styles from "./unifiedButton.module.css"
import FigmaLogo from "@/public/icons/FigmaLogo"
import GithubLogo from "@/public/icons/GithubLogo"
import ArrowRight from "@/app/components/uiComponents/arrowRight"

export default function UnifiedButton({
  externalLink = "",
  backgroundColor = "var(--blue)",
  buttonContentColour = "var(--sand)",
  text = "",
  icon = "arrow", // "figma" | "github" | "arrow"
}) {
  const IconComponent =
    icon === "figma"
      ? FigmaLogo
      : icon === "github"
      ? GithubLogo
      : ArrowRight

  return (
    <div
      className={styles.button}
      style={{ backgroundColor: backgroundColor }}
    >
      <Link
        href={externalLink}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
      >
        <p
          style={{ color: buttonContentColour }}
          className={styles.pText}
        >
          {text}
        </p>
        <div className={styles.arrowDiv}>
          <IconComponent color={buttonContentColour} />
        </div>
      </Link>
    </div>
  )
}
