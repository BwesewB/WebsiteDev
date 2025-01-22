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
    </div>
  );
}

// .fullWithNavbar{
//   position: fixed;
//   box-sizing: border-box;
//   width: 100%;
//   left:0;
//   padding: 20px 90px;
//   z-index: 1000;
// }

// .navbar {
//   display: flex;
//   justify-content: space-between;
//   font-family: var(--font-primary);
//   font-size: 16px;
//   font-style: normal;
//   font-weight: 700;
//   line-height: 100%; /* 16px */
//   letter-spacing: 1.6px;
//   color: var(--blue);
//   text-decoration: none;
//   flex-shrink: 0;
// }

// .navPages{
//   display: flex;
//   justify-content: space-between;
//   gap:40px;
// }

// .linkContainer{
//   padding: 6px 12px;
//   display: flex;
//   align-items: center;
// }

