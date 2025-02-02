import Link from "next/link";
import Image from "next/image";
import styles from "./navbar.module.css";
import Logo from "@/public/media/Logo";

export default function Navbar({
  navColor = "var(--blue)",
  navBG,
}) {
  return (
    // <div className={styles.fullWithNavbar}>
      <nav className={styles.navbar} style={{ backgroundColor: navBG}}>
        <div className={styles.logoContainer}>
          <Link href="/">
            <Logo color={navColor} />
          </Link>
        </div>

        <ul className={styles.navPages} style={{ color: navColor }}>
          <li className={styles.linkContainer}>
            <Link href="/pages/3d">3D</Link>
          </li>
          <li className={styles.linkContainer}>
            <Link href="/pages/motion">MOTION</Link>
          </li>
          <li className={styles.linkContainer}>
            <Link href="/pages/visual">VISUAL</Link>
          </li>
          <li className={styles.linkContainer}>
            <Link href="/pages/teamwork">TEAMWORK</Link>
          </li>
        </ul>
      </nav>
    // </div>
  );
}



