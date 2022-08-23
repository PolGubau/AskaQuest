/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import router from "next/router";
import React from "react";
import PATH from "src/utils/consts";
import styles from "./SignInPannel.module.css";
import { BiDice5 } from "react-icons/bi";
import randomCollection from "src/services/randomCollectionID";
import InputWithIcon from "src/components/Buttons/InputButtons/InputWithIcon/InputWithIcon";
import ButtonWithIcon from "src/components/Buttons/ButtonWithIcon/ButtonWithIcon";
import Link from "next/link";

export default function SignInPannel({ user }: any) {
  const randomCollectionID = randomCollection();

  return (
    <>
      <section className={styles.container}>
        <h3 className={styles.title}>Welcome back {user.userName}! </h3>
        <p className={styles.text}></p>
        <div className={styles.buttonGroup}>
          {/* ALL */}

          <Link href={PATH.ALL_QUESTS}>
            <a>
              <ButtonWithIcon text={"All Quests"} icon={"grid"} />
            </a>
          </Link>

          {/* CREATE */}
          <Link href={PATH.CREATE_QUEST}>
            <a>
              <ButtonWithIcon text={"Create One"} icon={"create"} />
            </a>
          </Link>

          {/* RANDOM */}
          <Link href={`${PATH.RANDOM_QUEST}/${randomCollectionID}`}>
            <a>
              <ButtonWithIcon text={"Random Quest"} icon={"dice5"} />
            </a>
          </Link>
        </div>
      </section>
    </>
  );
}
