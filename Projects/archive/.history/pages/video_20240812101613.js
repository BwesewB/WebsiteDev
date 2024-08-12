import styles from "@/styles/video.module.css"
import Header from "@/components/Header"

export default function video(){
    return(
        <>
            <Header 
                lineHoriz = {2.5}
                headerNamesDelay = {2.7}
                headerButtonDelay = {2.9}
                primaryColor="var(--white)"
            />
        </>
    )
}