import styles from '../logoSection/logoSection.module.css'

export default function logoSection(){
    return(
        <>
            <div className={styles.logoSection}>
                <div className={styles.websiteName}>
                    <h5>DOUGA</h5>
                </div>
                <div className={styles.websiteJapan}>
                    <h6>Japan</h6>
                </div>
            </div>
        </>
    )
}