import { useRef } from 'react';
import MediaBlockOrChild from '@/components/molecules/MediaBlockOrChild/mediaBlockOrChild';
import DynamicHover from '@/components/molecules/DynamicHover/DynamicHover';
import TextContainer from '@/components/atoms/textContainer/page';
import ArrowRight from '@/components/atoms/arrowRight';
import styles from './projectCard.module.css';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectCard({
    link,
    header,
    categories,
    children,
    scale,
    startingScale,
    movementFactor,
    startTrigger,
    ...props
}) {

    const arrowRef = useRef(null);
    const arrowContainerRef = useRef(null); 
    const projectCardRef = useRef(null);
    const textContainerRef = useRef(null);
    const paragraphRef = useRef(null)

    useGSAP(() => {
        const paragraphContainer = paragraphRef.current;
        if (!paragraphContainer) return;

        const tagsToAnimate = gsap.utils.toArray(paragraphContainer.querySelectorAll('span'));

        if (tagsToAnimate.length === 0) return;

        gsap.from(tagsToAnimate, {
            opacity: 0,
            y: 15,
            stagger: 0.07,
            duration: 0.4,
            ease: "power2.out",
            scrollTrigger: {
                trigger: paragraphContainer,
                start: "top 90%",
                toggleActions: "play none none none",
                // markers: true,
            },
        });

    }, { scope: projectCardRef, dependencies: [categories] });


    useGSAP(() => {
        const textElement = textContainerRef.current;
        const arrowContainerElement = arrowContainerRef.current;
        const arrowElement = arrowRef.current;

        const tl = gsap.timeline({ paused: true });

        tl.to(textElement, {
            x: 50,
            duration: 0.3,
            ease: "power3.out",
        }, 0); // Start at 0 seconds

        tl.to(arrowContainerElement, {
            x: 0,
            duration: 0.3,
            ease: "power3.out",
            scale: 1,
        }, 0.1); // Start at 0.1 seconds (creates the delay)

        tl.to(arrowElement, {
            scale:1,
            duration: 0.25,
            ease: "power3.inOut",
        }, 0.1)

        const handleMouseEnter = () => {
            tl.play(); 
        };

        const handleMouseLeave = () => {
            tl.reverse(); // Reverse the timeline back to its start
        };

        const projectCard = projectCardRef.current;
        projectCard.addEventListener("mouseenter", handleMouseEnter);
        projectCard.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            projectCard.removeEventListener("mouseenter", handleMouseEnter);
            projectCard.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, { scope: projectCardRef });

  return (
    <div className={styles.projectCardWrap} ref={projectCardRef}>
        <DynamicHover
            scale={scale}
            startingScale={startingScale}
            movementFactor={movementFactor}
            link={link}
            className={styles.mediaWrapper} 
        >
            <MediaBlockOrChild {...props}>
                {children}
            </MediaBlockOrChild>
        </DynamicHover>
        {categories && categories.length > 0 && (
                <p className={styles.paragraph} ref={paragraphRef}>
                    {[...categories].sort().map((cat, index, arr) => (
                        <React.Fragment key={cat}>
                            <span className={styles.categoryTag}>{cat}</span>
                            {index < arr.length - 1 && (
                                <span className={styles.separator}>•</span>
                            )}
                        </React.Fragment>
                    ))}
                </p>
            )}
        <div className={styles.textContainer}>
            <div className={styles.arrowDiv} ref={arrowContainerRef}>
                <div className={styles.arrowContainer} ref={arrowRef}>
                    <ArrowRight color="var(--black)" width="100%" height="100%"/>
                </div>
            </div>
            <div ref={textContainerRef}>
                <TextContainer
                    header={header}
                    width="100%"
                    startTrigger={startTrigger}
                />
            </div>
        </div>
    </div>
  );
}