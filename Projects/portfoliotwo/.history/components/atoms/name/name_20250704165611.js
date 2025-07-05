// components/atoms/name/name.js
import styles from "./name.module.css";
import Link from "next/link";
import StickyContainer from "../stickyContainer/page";

export default function Name() {
    return (
        // This is the 100vh spacer. It will act as the scroll trigger.
        <div className={styles.nameOuter}>
            {/* The Pin component wraps the element we want to become sticky */}
            <StickyContainer>
                <div className={styles.nameContainer}>
                    <Link href="/">
                        <h1>Sebastian Fok</h1>
                    </Link>
                </div>
            </StickyContainer>
        </div>
    );
}