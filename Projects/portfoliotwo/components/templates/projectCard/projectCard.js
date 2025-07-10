
import MediaBlock from '@/components/molecules/MediaBlock/MediaBlock';
import DynamicHover from '@/components/molecules/DynamicHover/DynamicHover';
import TextContainer from '@/components/atoms/textContainer/page';
import styles from './projectCard.module.css';

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

  return (
    <div className={styles.projectCardWrap}>
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
        <TextContainer
            header={header}
            width="100%"
        />
    </div>
  );
}