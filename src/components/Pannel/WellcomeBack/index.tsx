/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import router from 'next/router'
import React from 'react'
import { PATH } from 'src/utils/consts'
import styles from './SignInPannel.module.css'
import { BsPlusLg } from 'react-icons/bs'
import { BiDice5, BiGridAlt } from 'react-icons/bi'
import randomCollection from 'src/services/randomCollectionID'

export default function SignInPannel ({ user }: any) {
  const randomCollectionID = randomCollection()

  const handleRandom = () => {
    console.log(`${PATH.RANDOM_QUEST}/${randomCollectionID}`)
  }
  return (
    <>
      <section className={styles.container}>
        <h3 className={styles.title}>Welcome back {user.userName}! </h3>
        <p className={styles.text}></p>
        <div className={styles.buttonGroup}>
          {/* ALL */}

          <button
            className={styles.button}
            onClick={async () => await router.push(PATH.ALL_QUESTS)}
          >
            <p className={styles.icon}>
              <BiGridAlt size={20} />
            </p>
            <p>All Quests</p>
          </button>

          {/* CREATE */}

          <button
            className={styles.button}
            onClick={async () => await router.push(PATH.CREATE_QUEST)}
          >
            <p className={styles.icon}>
              <BsPlusLg size={20} />
            </p>

            <p>Create One</p>
          </button>

          {/* RANDOM */}
          <button
            className={styles.button}
            onClick={handleRandom}>
            <p className={styles.icon}>
              <BiDice5 size={20} />
            </p>
            <p>Random Quest</p>
          </button>
        </div>
      </section>
    </>
  )
}
