// components/Name.js
'use client';

import styles from './Name.module.css';
import Link from 'next/link';

export default function Name({ isHomePage }) {
  // This component receives a prop to know which state it should be in.
  // It then applies one of two classes to its container.
  return (
    <div
      className={`${styles.nameContainer} ${
        isHomePage ? styles.homeLayout : styles.navLayout
      }`}
    >
      <Link href="/" className={styles.nameLink}>
        Sebastian Fok
      </Link>
    </div>
  );
}