"use client"

import * as THREE from 'three';
import { gsap } from "gsap";
import styles from './visual.module.css';
import { useEffect } from 'react';
import Lenis from "@studio-freight/lenis"
import ScrollTrigger from 'gsap/ScrollTrigger';
import projectsCopy from "./projects.js"

export default function Visual() {


    useEffect(() => {
        document.addEventListener('DOMContentLoaded', () => {
            gsap.registerPlugin(ScrollTrigger);

            const lenis = new Lenis()
            lenis.on('scroll', ScrollTrigger.update);
            gsap.ticker.add((time) => {
                lenis.raf(time * 1000)
            });
            
            gsap.ticker.lagSmoothing(0);
        });
        //this is key to updating elements on scroll with lenis and gsap working together to track scroll position by listening to lenis scroll events

        //10.03

    }, []);

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
                                <div className={styles.img}><img className={styles.imgTag} src="/images/cans/Fish1.png" alt="Decked Beer" /></div>
                                <div className={styles.img}><img className={styles.imgTag} src="/images/poster/Sebastian_Fok_Assignment07.png" alt="Helly Hansen Rebrand" /></div>
                                <div className={styles.img}><img className={styles.imgTag} src="/images/magazine/reimagining.png" alt="Reimagining Spaces" /></div>
                                <div className={styles.img}><img className={styles.imgTag} src="/images/mechApplicance/Sebastian_Fok_Assignment08.png" alt="mechanical.obj" /></div>
                            </div>
                        </div>
                        <div className={styles.projectCopy}>
                            <p>Aliqua anim ea anim ullamco ea do irure reprehenderit. Elit Lorem fugiat dolore culpa mollit duis aliqua amet ullamco irure non commodo. Ex id incididunt veniam cillum. Ea minim exercitation anim qui minim do elit amet consequat cupidatat. Adipisicing pariatur nisi exercitation voluptate esse ipsum adipisicing occaecat cillum veniam duis qui aute est.</p>
                        </div>
                    </div>
                    
                    <div className={styles.progressBar}>
                        <div className={styles.progress}></div>
                    </div>

                    <div className={styles.index}>
                        <span className={styles.currentCount}><p>1</p></span>
                        <span className={styles.seperator}></span>
                        <span className={styles.totalCount}><p>4</p></span>
                    </div>
                </div>
            </div>

        </>
    );
}