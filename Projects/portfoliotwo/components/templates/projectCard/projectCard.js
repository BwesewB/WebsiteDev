import { useRef } from 'react';
import MediaBlock from '@/components/molecules/MediaBlock/MediaBlock';
import DynamicHover from '@/components/molecules/DynamicHover/DynamicHover';
import TextContainer from '@/components/atoms/textContainer/page';
import ArrowRight from '@/components/atoms/arrowRight';
import styles from './projectCard.module.css';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function ProjectCard({
    link,
    header,
    paragraph,
    children,
    videoSrc,
    imageSrc,
    scale,
    movementFactor,
}) {

    const arrowRef = useRef(null);
    const arrowContainerRef = useRef(null); 
    const projectCardRef = useRef(null);
    const textContainerRef = useRef(null);

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
            movementFactor={movementFactor}
            link={link}
            className={styles.mediaWrapper} 
        >
            {children ? (
                children 
            ) : (
                <MediaBlock
                    videoSrc={videoSrc}
                    imageSrc={imageSrc}
                />
            )}
        </DynamicHover>
        {paragraph && <p className={styles.paragraph}>{paragraph}</p>}
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
                />
            </div>

        </div>

    </div>
  );
}