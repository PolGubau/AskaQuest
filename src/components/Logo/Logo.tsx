import Image from "next/image";
import styles from "./Logo.module.css";
import logo from "src/assets/logo.svg";
export default function Logo() {
  return (
    <section className={styles.logo}>
      <Image alt="logo" src={logo} width={3} height={130} />
      <h1 className={styles.heading}>AskaQuest</h1>
    </section>
  );
}
