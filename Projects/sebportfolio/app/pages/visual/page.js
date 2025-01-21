import * as THREE from 'three';
import { gsap } from "gsap";
import styles from './visual.module.css';
import Image from 'next/image';

export default function Visual() {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.canContainer}>
                    <h1>Visual</h1>
                </div>
                <div className={styles.projectContainer}>
                    <div className={styles.col}>
                        <div className={styles.projects}>
                            <div className={styles.indicator}></div>
                            <div className={`${styles.projectName} ${true ? styles.active : ''}`}><h2>decked beer</h2></div>
                            <div className={styles.projectName}><h2>Helly Hansen Techwear</h2></div>
                            <div className={styles.projectName}><h2>Reimagining Spaces</h2></div>
                            <div className={styles.projectName}><h2>mechanical.obj</h2></div>
                        </div>
                    </div>
                    <div className={styles.col}>
                        <div className={styles.projectImageWrapper}>
                            <div className={styles.projectImage}>
                                <div className={styles.img}><img src="/images/cans/Fish1.png" alt="Decked Beer"/></div>
                                <div className={styles.img}><img src="/images/poster/Sebastian_Fok_Assignment07.png" alt="Helly Hansen Rebrand"/></div>
                                <div className={styles.img}><img src="/images/magazine/reimagining.png" alt="Reimagining Spaces"/></div>
                                <div className={styles.img}><img src="/images/mechApplicance/Sebastian_Fok_Assignment08.png" alt="mechanical.obj"/></div>
                            </div>
                        </div>
                        <div className={styles.projectCopy}></div>
                    </div>
                </div>
            </div>

        </>
    );
}