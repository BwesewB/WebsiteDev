import styles from "./name.module.css";
import Link from "next/link";
import StickyContainer from "../stickyContainer/page";

export default function Name() {
    return(
        <>
            <div className={styles.nameOuter}>
                <div className={styles.nameContainer}>
                    <Link href="/">
                        <h1>Sebastian Fok</h1>
                    </Link>
                </div>
            </div>
        </>
    )
}