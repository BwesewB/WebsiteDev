import Link from "next/link";
import Image from "next/image";
import styles from "./navbar.module.css";
import Logo from "@/public/images/Logo";

export default function Navbar({
  navColor = "var(--blue)"
}) {
  return (
    <div className={styles.fullWithNavbar}>
      <nav className={styles.navbar}>
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
            <Link href="/pages/motion">Motion</Link>
          </li>
          <li className={styles.linkContainer}>
            <Link href="/pages/visual">Visual</Link>
          </li>
          <li className={styles.linkContainer}>
            <Link href="/pages/teamwork">Teamwork</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
