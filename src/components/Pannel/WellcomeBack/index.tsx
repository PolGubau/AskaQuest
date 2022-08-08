import router from "next/router";
import React from "react";
import { PATH } from "src/utils/consts";
import styles from "./SignInPannel.module.css";
import { BsPlusLg } from "react-icons/bs";
import { BiDice5, BiGridAlt } from "react-icons/bi";

export default function SignInPannel({ user }: any) {
  return (
    <>
      <section className={styles.container}>
        <h3 className={styles.title}>Wellcome back {user.userName}! </h3>
        <p className={styles.text}></p>
        <div className={styles.buttonGroup}>
          <button
            className={styles.button}
            onClick={() => router.push(PATH.ALL_QUESTS)}
          >
            <p className={styles.icon}>
              <BiGridAlt size={20} />
            </p>
            <p>All Quests</p>
          </button>
          <button
            className={styles.button}
            onClick={() => router.push(PATH.CREATE_QUEST)}
          >
            <p className={styles.icon}>
              <BsPlusLg size={20} />
            </p>

            <p>Create One</p>
          </button>
          <button
            className={styles.button}
            onClick={() => router.push(PATH.RANDOM_QUEST)}
          >
            <p className={styles.icon}>
              <BiDice5 size={20} />
            </p>
            <p>Random Quest</p>
          </button>
        </div>
      </section>
    </>
  );
}
