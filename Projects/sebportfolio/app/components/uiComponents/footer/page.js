import SectionTwo from "../../projectTemplates/SectionTwo/page"
import styles from "./footer.module.css"
import Link from "next/link"
import { useState } from "react";

export default function Footer({}) {
    const [copyMessage, setCopyMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false);
  
    const copyEmailToClipboard = () => {
      const email = "info.sebfok@gmail.com";
      navigator.clipboard.writeText(email)
        .then(() => {
          setCopyMessage("Email copied!");
          setShowMessage(true);
          setTimeout(() => {
            setShowMessage(false);
            setTimeout(() => setCopyMessage(""), 500); // Wait for animation to finish
          }, 2000);
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
        });
    };

    return(
        <footer className={styles.footerWrap}>
            <section className={styles.footerContainer}>
                <div className={styles.sectionTop}>
                    <div className={styles.linkSectionLeft}>
                        <div className={styles.linkSection}>
                            <h5 className={styles.footerH5}>EXPLORE</h5>
                            <div className={styles.linkies}>
                                <Link href="/pages/3d"><h4>3D</h4></Link>
                                <Link href="/pages/motion"><h4>Motion</h4></Link>
                                <Link href="/pages/visual"><h4>Visual</h4></Link>
                                <Link href="/pages/teamwork"><h4>Teamwork</h4></Link>
                            </div>
                        </div>
                        <div className={styles.linkSection}>
                            <h5 className={styles.footerH5}>STALK ME</h5>
                            <div className={styles.linkies}>
                                <Link href="https://www.linkedin.com/in/sebastianfok/" target="_blank" className={styles.blueText}><h4>LinkedIn</h4></Link>
                                <Link href="https://www.instagram.com/bwes_design?utm_source=qr" target="_blank" className={styles.blueText}><h4>Instagram</h4></Link>
                            </div>
                        </div>
                    </div>
                    <div className={styles.linkSectionContact}>
                        <h5 className={styles.footerH5}>Contact Me!</h5>
                        <div className={styles.linkies}>
                            <h4 onClick={copyEmailToClipboard} className={styles.emailCopy}>info.sebfok@gmail.com</h4>
                            {copyMessage && <p className={`${styles.copyMessage} ${showMessage ? "" : styles.hide}`}>{copyMessage}</p>}
                        </div>
                    </div>
                </div>
                <div className={styles.sectionBottom}>
                    <div className={styles.logoContainer}>
                        <Link href="/">
                            <SectionTwo imageSrc="/media/logo/LogoBlue.png" />
                        </Link>
                    </div>
                    <div className={styles.textLowest}>
                        <p>SEBASTIAN FOK</p>
                        <p>2024/2025</p>
                    </div>
                </div>
            </section>
        </footer>
    )
}