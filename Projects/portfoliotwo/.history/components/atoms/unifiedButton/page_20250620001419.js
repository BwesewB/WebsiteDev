import Link from "next/link"
import standardStyles from "./unifiedButton.module.css"
import roundStyles from "./buttonRound.module.css"

import FigmaLogo from "@/public/icons/FigmaLogo"
import GithubLogo from "@/public/icons/GithubLogo"
import ArrowRight from "@/app/components/uiComponents/arrowRight"

export default function UnifiedButton({
  externalLink = "",
  backgroundColor = "var(--blue)",
  buttonContentColour = "var(--sand)",
  text = "CLICK",
  icon = null,         // "figma" | "github" | "arrow" | null
  rounded = false,     // true = ButtonRound variant
}) {
  const IconComponent =
    icon === "figma"
      ? FigmaLogo
      : icon === "github"
      ? GithubLogo
      : icon === "arrow"
      ? ArrowRight
      : null

  const styles = rounded ? roundStyles : standardStyles

  return (
    <div className={styles.button} style={{ backgroundColor }}>
      <Link
        href={externalLink}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link ?? undefined}
      >
        <p style={{ color: buttonContentColour }} className={styles.buttonText ?? styles.pText}>
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
