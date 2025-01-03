import styles from '../landingPreloader/landingPreloader.module.css'
import gsap from 'gsap'
import { useEffect } from 'react';

export default function landingPreloader(){
    useEffect(() => {
        function startLoader() {
            let counterElement = document.querySelector("." + styles.counter); // Use styles.counter instead of ".counter"
            let currentValue = 0;

            function updateCounter() {
                if (currentValue === 100) {
                    return;
                }

                currentValue += Math.floor(Math.random() * 10) + 1;

                if (currentValue > 100) {
                    currentValue = 100;
                }

                counterElement.textContent = currentValue;

                let delay = Math.floor(Math.random() * 200) + 50;
                setTimeout(updateCounter, delay);
            }
            updateCounter();
        }

        startLoader();

        gsap.to("." + styles.counter, 0.25, { // Use styles.counter instead of ".counter"
            delay: 3.5,
            opacity: 0,
        });

        gsap.to("." + styles.bar, 1.5, { // Use styles.bar instead of ".bar"
            delay: 3.5,
            height: 0,
            stagger: {
                amount: 0.5,
            },
            ease: "power1.inOut"
        });
    }, []);

    return(
        <>
            <h6 className={styles.counter}>0</h6>

            <div className={styles.overlay}>
                <div className={styles.bar}></div>
                <div className={styles.bar}></div>
                <div className={styles.bar}></div>
                <div className={styles.bar}></div>
                <div className={styles.bar}></div>
                <div className={styles.bar}></div>
                <div className={styles.bar}></div>
                <div className={styles.bar}></div>
                <div className={styles.bar}></div>
                <div className={styles.bar}></div>
            </div>
        </>
    )
}