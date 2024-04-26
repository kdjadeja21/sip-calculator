import styles from "./page.module.css";
import SIPCalculator from "./SIPCalculator/SIPCalculator";
import Footer from "./Footer/Footer";

export default function Home() {
  return (
    <main className={styles.main}>
      <SIPCalculator />
      <Footer />
    </main>
  );
}
