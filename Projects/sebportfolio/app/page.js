"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";
import styles from './styles/page.module.css';
import Link from 'next/link';
import ArrowRight from "@/public/icons/arrowRight";
import SectionTwo from "./components/projectTemplates/SectionTwo/page";
import ProjectLayout from "./components/pageComponents/projectLayout/page";

export default function Home() {

  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(`.${styles.letter}`, {
        y:40,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "expoScale",
        stagger: 0.05, // Stagger for smoother animation
      });
    });
  
    return () => ctx.revert(); // Cleanup GSAP animation on unmount
  }, []);
  

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
      <div className={styles.topContainer}>
          <div className={styles.heroContainer}>
          <h1 className={styles.name}>
            {"sebastian fok".split("").map((char, index) => (
              <span key={index} className={styles.letter}>{char === " " ? "\u00A0" : char}</span>
            ))}
          </h1>
            {/* <p className={styles.heroDescription}>A hand-coded and specially curated web experience of my greatest projects.</p> */}
          </div>
          <div>
            <SectionTwo 
              imageSrc="/media/3dWorks/3shilo-minFlip.png"
            />
          </div>
      </div>
      <div className={styles.sectionContent}>
        <div className={styles.containerContent1}>
          <div>
            <h5 className={styles.headerFive}>ABOUT ME</h5>
            <div className={styles.headingContent}>
              <h3><span className={styles.blueText}>I’m a reflective and driven designer</span> who understands how <span className={styles.blueText}>creative and technical elements</span> come together to <span className={styles.blueText}>drive success</span> in projects and teams. </h3>
            </div>
          </div>
          <h5 className={styles.headerFive}>MY PROJECTS</h5>
        </div>
        <div className={styles.containerContent2}>
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
          
        </div>
        <div className={styles.containerContent3}>
          <h5 className={styles.headerFive}>Featured</h5>
          <div className={styles.headingContent}>          
            <ProjectLayout
              videoSrc = "/media/cans/fishCanVideo.mp4"
              h4Title = "Decked Beer"
              description = "3D model integration"
              projectLink = "/pages/visual/projects/deckedBeer/"

              videoSrcTwo = "/media/flare/FlareTechDemo.mp4"
              h4TitleTwo = "Flare"
              descriptionTwo = "BC wildfire risk mitigation app"
              projectLinkTwo = "/pages/teamwork/projects/flare/"
            />
          </div>
        </div>
        {/* <div className={styles.containerContentContact}>
          <div className={styles.headingContent}>
            <p>info.sebfok@gmail.com</p>
            <Link href="https://www.instagram.com/bwes_design?utm_source=qr" target="_blank" className={styles.blueText}><p>Instagram</p></Link>
            <Link href="https://www.linkedin.com/in/sebastianfok/" target="_blank" className={styles.blueText}><p>LinkedIn</p></Link>
          </div>
        </div> */}
      </div>
    </>

  );
}
