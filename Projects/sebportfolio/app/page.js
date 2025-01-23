import styles from './styles/page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.underConstruction}>This site is currently under development</h1>
      <p className={styles.test}>This is a fire website!</p>
    </div>
  );
}
