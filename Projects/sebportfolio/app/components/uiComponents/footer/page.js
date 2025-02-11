import styles from "./footer.module.css"
import Link from "next/link"

export default function Footer({}) {
    return(
        <footer className={styles.footerWrap}>
            <section className={styles.footerContainer}>
                <div>
                    <h5 className="h5stretched">EXPLORE</h5>
                    <h3>3d</h3>
                    <h3>Motion</h3>
                    <h3>Visual</h3>
                    <h3>Teamwork</h3>
                </div>

            </section>
        </footer>
    )
}