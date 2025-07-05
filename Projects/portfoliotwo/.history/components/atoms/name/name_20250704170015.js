// components/atoms/name/name.js
import styles from "./name.module.css";
import Link from "next/link";
import StickyContainer from "../stickyContainer/page";
import { useRef } from "react";

export default function Name() {
    const VRef = useRef(null);
    return (
        // This is the 100vh spacer. It will act as the scroll trigger.
        <div className={styles.nameOuter} ref={VRef}>
            {/* The Pin component wraps the element we want to become sticky */}
            <StickyContainer endTriggerRef={VRef}>
                <div className={styles.nameContainer}>
                    <Link href="/">
                        <h1>Sebastian Fok</h1>
                    </Link>
                </div>
            </StickyContainer>
        </div>
    );
}