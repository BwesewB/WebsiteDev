import styles from "@/styles/video.module.css";
import HeadData from "@/components/HeadData";
import Header from "@/components/Header";

export default function video(){
    return(
        <>
            <HeadData title="video" description="Videos by Colin Chan"/>
            <main className={`${styles.main}`}>
                <div className={styles.bodey}>
                    <Header 
                        lineHoriz = {2.5}
                        headerNamesDelay = {2.7}
                        headerButtonDelay = {2.9}
                        primaryColor="var(--white)"
                    />
                </div>
            </main>
        </>
    )
}