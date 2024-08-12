import styles from "@/styles/video.module.css";
import HeadData from "@/components/HeadData";
import Header from "@/components/Header";

export default function video(){
    return(
        <>
            <HeadData title="video" description="Videos by Colin Chan"/>
            <main className={`${styles.main}`}>
                <div style={{ backgroundColor: 'var(--black)', minHeight: '100vh' }}>
                    <div className={styles.absolutement}>
                        <Header 
                            lineHoriz = {0.5}
                            headerNamesDelay = {0.7}
                            headerButtonDelay = {0.9}
                            primaryColor="var(--white)"
                        />
                    </div>

                    <div className={styles.bodey}>
                        <div className={styles.leftSection}>
                            <div className={styles.twennyfour}>

                            </div>
                        </div>
                        <div className={styles.rightSection}>

                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}