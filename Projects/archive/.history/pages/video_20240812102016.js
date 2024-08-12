import styles from "@/styles/video.module.css";
import Header from "@/components/Header";

export default function video(){
    return(
        <>
            <HeadData title="Digital Archive" description="Created by Sebastian Fok. Media by Colin Chan"/>
            <main className={`${styles.main}`}>
                <Header 
                    lineHoriz = {2.5}
                    headerNamesDelay = {2.7}
                    headerButtonDelay = {2.9}
                    primaryColor="var(--white)"
                />
            </main>
        </>
    )
}