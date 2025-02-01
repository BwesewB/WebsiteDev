"use client";
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import styles from './styles/page.module.css';
import Link from 'next/link';
import ArrowRight from "@/public/icons/arrowRight";

export default function Home() {

  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const navLinks = document.querySelectorAll(`.${styles.navigationSection}`);
  
    navLinks.forEach((link, index) => {
      const h2 = link.querySelector("h2");
  
      const ctx = gsap.context(() => {
        link.addEventListener("mouseenter", () => {
          gsap.to(link, {
            backgroundColor: "var(--blue)",
            duration: 0, 
          });
    
          gsap.to(h2, {
            color: "var(--white)",
            duration: 0.2, 
            ease: "power1.out",
          });
    
          setHoveredIndex(index);
        });
  
        link.addEventListener("mouseleave", () => {
          gsap.to(link, {
            backgroundColor: "var(--white)",
            duration: 0,
          });
    
          gsap.to(h2, {
            color: "var(--blue)",
            duration: 0.2,
            ease: "power1.out",
          });
    
          setHoveredIndex(null);
        });
      }, link);
  
      return () => ctx.revert();
    });
  }, []);

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.underConstruction}>This site is currently under development</h1>
        <p className={styles.test}>This is a fire website!</p>
      </div>
      <div className={styles.sectionContent}>
        <div className={styles.containerContent}>
          <div>
            <h5 className={styles.headerFive}>ABOUT ME</h5>
            <div className={styles.headingContent}>
              <h3><span className={styles.blueText}>I’m a reflective and driven designer</span> who understands how <span className={styles.blueText}>creative and technical elements</span> come together to <span className={styles.blueText}>drive success</span> in projects and teams. </h3>
            </div>
          </div>
          <h5 className={styles.headerFive}>MY PROJECTS</h5>
        </div>
        <div className={styles.containerContent}>
          <div className={styles.headingContent}>
            {[
              { href: "/pages/3d", title: "3D", description: "Personal 3D projects in Blender" },
              { href: "/pages/motion", title: "MOTION", description: "Animations in After Effects" },
              { href: "/pages/visual", title: "VISUAL", description: "Utilizing Photoshop, Illustrator and InDesign" },
              { href: "/pages/teamwork", title: "TEAMWORK", description: "Collaboration and teamwork projects" },
            ].map((link, index) => (
              <Link key={link.href} href={link.href} className={styles.navigationSection}>
                <h2>{link.title}</h2>
                {hoveredIndex === index && (
                  <p className={styles.navDescription}>{link.description}</p>
                )}
              </Link>
            ))}
          </div>
          <h5 className={styles.headerFive}>CONTACT</h5>
        </div>
        <div className={styles.containerContentContact}>
          <div className={styles.headingContent}>
            <p>info.sebfok@gmail.com</p>
            <Link href="https://www.instagram.com/bwes_design?utm_source=qr" target="_blank" className={styles.blueText}><p>Instagram</p></Link>
            <Link href="https://www.linkedin.com/in/sebastianfok/" target="_blank" className={styles.blueText}><p>LinkedIn</p></Link>
          </div>
        </div>
      </div>
    </>

  );
}
