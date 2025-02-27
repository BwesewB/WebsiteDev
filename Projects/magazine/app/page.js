import Image from "next/image";
import styles from "./page.module.css";
import Slideshow from "./components/slideshow/page";

export default function Home() {
  return (
    <div className={styles.pageLayout}>
      <Slideshow />
    </div>
  );
}
