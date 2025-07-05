import styles from "./name.module.css";

export default function Name() {
    return(
        <>
            <div className={styles.logoContainerOuter}>
                <div className={styles.logoContainer}>
                    <Link href="/">
                        <h1>Sebastian Fok</h1>
                    </Link>
                </div>
            </div>
        </>
    )
}