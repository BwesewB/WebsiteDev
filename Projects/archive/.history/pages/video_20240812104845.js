import styles from "@/styles/video.module.css";
import HeadData from "@/components/HeadData";
import Header from "@/components/Header";

export default function video(){
    return(
        <>
            <HeadData title="video" description="Videos by Colin Chan"/>
            <main className={`${styles.main}`}>
                <div style={{ backgroundColor: 'var(--black)', minHeight: '100vh' }}>
                    <Header 
                        lineHoriz = {0.5}
                        headerNamesDelay = {0.7}
                        headerButtonDelay = {0.9}
                        primaryColor="var(--white)"
                    />

                    <div className={styles.bodey}>
                        <div className={styles.leftSection}>
                            <div className={styles.twennyfour}>
                                <h6>twenty-four</h6>
                                <h6>truths</h6>
                                <h6>per</h6>
                                <h6>second</h6>
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