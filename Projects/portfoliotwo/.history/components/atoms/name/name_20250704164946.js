// components/atoms/name/name.js
import styles from "./name.module.css";
import Link from "next/link";
import Pin from "@/components/atoms/pin"; // Import our new, simple component

export default function Name() {
    return (
        // This is the 100vh spacer. It will act as the scroll trigger.
        <div className={styles.nameOuter}>
            {/* The Pin component wraps the element we want to become sticky */}
            <Pin>
                <div className={styles.nameContainer}>
                    <Link href="/">
                        <h1>Sebastian Fok</h1>
                    </Link>
                </div>
            </Pin>
        </div>
    );
}