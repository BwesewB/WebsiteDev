"use client"

import SectionTwo from "../../projectTemplates/SectionTwo/page"
import styles from "./footer.module.css"
import Link from "next/link"
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

export default function Footer({}) {
    const [copyMessage, setCopyMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const linkRefs = useRef({});
  
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

    const handleMouseEnter = (index) => {
        gsap.to(linkRefs.current[index], 
        {
            width: "100%",
            duration: 0.2,
            ease: "power2.out",
        });
    };

    const handleMouseLeave = (index) => {
        gsap.to(linkRefs.current[index], 
        {
            width: "0%",
            duration: 0.2,
            ease: "power2.out",
        });
    };

    const links = [
        { text: "3D", href: "/pages/3d" },
        { text: "Motion", href: "/pages/motion" },
        { text: "Visual", href: "/pages/visual" },
        { text: "Teamwork", href: "/pages/teamwork" },
        { text: "LinkedIn", href: "https://www.linkedin.com/in/sebastianfok/", external: true },
        { text: "Instagram", href: "https://www.instagram.com/bwes_design?utm_source=qr", external: true },
        { text: "Resume", href: "/media/SebastianFokResume.pdf", external: true },
    ];

    return(
        <footer className={styles.footerWrap}>
            <section className={styles.footerContainer}>
                <div className={styles.sectionTop}>
                    <div className={styles.linkSectionLeft}>
                        <div className={styles.linkSection}>
                            <h5 className={styles.footerH5}>EXPLORE</h5>
                            <div className={styles.linkies}>
                                {links.slice(0, 4).map((link, index) => (
                                    <Link key={index} href={link.href} passHref>
                                        <div 
                                            className={styles.linkWrapper}
                                            onMouseEnter={() => handleMouseEnter(index)}
                                            onMouseLeave={() => handleMouseLeave(index)}
                                        >
                                            <h4>{link.text}</h4>
                                            <span ref={(el) => (linkRefs.current[index] = el)} className={styles.underline}></span>
                                        </div>
                                    </Link>
                                ))}
                                {/* <Link href="/pages/3d">
                                    <h4>3D</h4>
                                    <span className={styles.underline}></span>
                                </Link>
                                <Link href="/pages/motion">
                                    <h4>Motion</h4>
                                    <span className={styles.underline}></span>
                                </Link>
                                <Link href="/pages/visual">
                                    <h4>Visual</h4>
                                    <span className={styles.underline}></span>
                                </Link>
                                <Link href="/pages/teamwork">
                                    <h4>Teamwork</h4>
                                    <span className={styles.underline}></span>
                                </Link> */}
                            </div>
                        </div>
                        <div className={styles.linkSection}>
                            <h5 className={styles.footerH5}>STALK ME</h5>
                            <div className={styles.linkies}>
                                {links.slice(4).map((link, index) => (
                                    <Link key={index + 4} href={link.href} target="_blank" passHref>
                                        <div 
                                            className={styles.linkWrapper}
                                            onMouseEnter={() => handleMouseEnter(index + 4)}
                                            onMouseLeave={() => handleMouseLeave(index + 4)}
                                        >
                                            <h4 className={styles.blueText}>{link.text}</h4>
                                            <span ref={(el) => (linkRefs.current[index + 4] = el)} className={styles.underline}></span>
                                        </div>
                                    </Link>
                                ))}
                                {/* <Link href="https://www.linkedin.com/in/sebastianfok/" target="_blank" className={styles.blueText}>
                                    <h4>LinkedIn</h4>
                                    <span className={styles.underline}></span>
                                </Link>
                                <Link href="https://www.instagram.com/bwes_design?utm_source=qr" target="_blank" className={styles.blueText}>
                                    <h4>Instagram</h4>
                                    <span className={styles.underline}></span>
                                </Link> */}
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
                        <p>INSPIRED BY @<a href="https://serious.business/">SERIOUS.BUSINESS</a></p>
                        <p>2024/2025</p>
                    </div>
                </div>
            </section>
        </footer>
    )
}