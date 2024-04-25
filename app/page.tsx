import styles from "./page.module.css";
import SIPCalculator from "./SIPCalculator/SIPCalculator";

export default function Home() {
  return (
    <main className={styles.main}>
      <SIPCalculator />
    </main>
  );
}
