import styles from './styles/page.module.css';
import Navbar from './components/navbar/page';

export default function Home() {
  return (
    <div className={styles.container}>
      <Navbar />
      <p className={styles.test}>Hello World!</p>
    </div>
  );
}
