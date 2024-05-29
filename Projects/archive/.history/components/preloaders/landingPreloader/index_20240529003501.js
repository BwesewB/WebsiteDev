import styles from '../landingPreloader/landingPreloader.module.css'
import gsap from 'gsap'

export default function landingPreloader(){
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