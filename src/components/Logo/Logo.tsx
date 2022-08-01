import Image from "next/image";
import styles from "./Logo.module.css";
export default function Logo() {
  return (
    <section className={styles.logo}>
      <Image alt="logo" src="/favicon.svg" width={3} height={130} />
      <h1 className={styles.heading}>AskaQuest</h1>
    </section>
  );
}
