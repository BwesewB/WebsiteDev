import styles from '../landingPreloader/landingPreloader.module.css'
import gsap from 'gsap'

export default function landingPreloader(){
    function startLoader(){
        let counterElement = document.querySelector(".counter");
        let currentValue = 0;

        function updateCounter() {
            if(currentValue === 100) {
                return;
            }

            currentValue += Math.floor(Math.random() * 10) + 1;

            if(currentValue > 100) {
                currentValue = 100;
            }

            counterElement.textContent = currentValue;

            let delay = Math.floor(Math.random() * 200) + 50;
            setTimeout(updateCounter, delay);
        }
        updateCounter();
    }

    startLoader();
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