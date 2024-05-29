import styles from '../logoSection/logoSection.module.css';
import gsap from 'gsap';
import { useEffect } from 'react';

export default function logoSection(){
    useEffect(() => {

        gsap.to("." + styles.onePixelDiv, {
          duration: 0.25,
          height: "3vw",
      });
    
      })
    return(
        <>
            <div className={styles.logoSection}>
                <div className={styles.websiteName}>
                    <h5>DOUGA</h5>
                </div>
                <div className={styles.onePixelDiv}></div>
                <div className={styles.websiteJapan}>
                    <h6>Japan</h6>
                </div>
            </div>
        </>
    )
}