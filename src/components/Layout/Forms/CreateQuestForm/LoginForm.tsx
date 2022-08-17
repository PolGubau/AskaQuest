/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useState } from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import { RiLockPasswordLine } from 'react-icons/ri'
import styles from './CreateQuestForm.module.css'
import { messageCreateCollection } from 'src/utils/text'

import { useRouter } from 'next/router'
import StartButton from 'src/components/Buttons/StartButton/StartButton'

export default function CreateQuestForm ({ setLoading }: any) {
  const router = useRouter()

  const [title, setTitle] = useState('')

  const [message, setMessage] = useState(messageCreateCollection.base)

  return (
    <>
      {(Boolean(message)) && <p className={styles.message}>{message}</p>}
      <form className={styles.formulario}>
        <div className={styles.inputBig}>
          <div className={styles.inputIcon}>
            <AiOutlineUser size={18} />
          </div>
          <input
            type="text"
            placeholder="Title"
            autoComplete="username"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className={styles.input}
          />
        </div>

        <StartButton type="submit" text="Login" fontSize="1.2rem" />

      </form>
    </>)
}
