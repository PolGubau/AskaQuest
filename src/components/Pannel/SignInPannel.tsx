import router from "next/router";
import React from "react";
import { PATH } from "src/utils/consts";
import styles from "./SignInPannel.module.css";

export default function SignInPannel() {
  return (
    <>
      <section className={styles.container}>
        <h3 className={styles.title}>Do you have an account?</h3>
        <p className={styles.text}>
          You can use <span>Askaquest</span> without having an account, but you
          can try to <span>SignIn</span> or create an account for a complete
          experience.
        </p>
        <button
          className={styles.button}
          onClick={() => router.push(PATH.SIGN_IN)}
        >
          Sign In
        </button>
      </section>
    </>
  );
}
