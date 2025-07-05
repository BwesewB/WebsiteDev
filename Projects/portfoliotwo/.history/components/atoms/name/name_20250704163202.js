import styles from "./name.module.css";
import Link from "next/link";

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