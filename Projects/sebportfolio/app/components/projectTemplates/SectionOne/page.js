import styles from "./sectionOne.module.css";

export default function SectionOne({
    paragraphTitleText = "",
    textColour = "var(--black)"
}) {
    return (
        <div className={styles.container}>
            <h3 style={{ color: textColour }}>{paragraphTitleText}</h3>
        </div>
    );
}