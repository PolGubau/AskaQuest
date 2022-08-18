/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useState } from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import { RiLockPasswordLine } from 'react-icons/ri'
import styles from './LoginForm.module.css'
import { messagesLogin } from 'src/utils/text'

import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import { PATH } from 'src/utils/consts'
import StartButton from 'src/components/Buttons/StartButton/StartButton'
const bcrypt = require('bcryptjs')

export default function LoginForm ({ setLoading }: any) {
  const router = useRouter()

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [failedUser, setFailedUser] = useState(false)
  const [failedPassword, setFailedPassword] = useState(false)
  const [message, setMessage] = useState(messagesLogin.base)

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    const response = await fetch(`/api/users/userName/${userName}`)

    if (!response.ok) {
      // user not found
      void Swal.fire('Ouups!', messagesLogin.userNoExist, 'error')
      setFailedUser(true)
      setMessage(messagesLogin.userNoExist)
      setLoading(false)
    } else {
      // user found
      const user = await response.json()
      const passwordsMatch = await bcrypt.compare(password, user.password)
      if (!(passwordsMatch)) {
        // password not match
        void Swal.fire('Ouups!', messagesLogin.passwordIncorrect, 'error')
        setFailedPassword(true)
        setMessage(messagesLogin.passwordIncorrect)
        setLoading(false)
      } else {
        // password match

        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        void Toast.fire({
          icon: 'success',
          title: 'Signed in successfully'
        })
        const jsonUser = JSON.stringify(user)

        sessionStorage.setItem('user', jsonUser)
        router.push(PATH.HOME).catch((err) => console.log(err))
      }
    }
  }
  return (
    <>
      {(Boolean(message)) && <p className={styles.message}>{message}</p>}
      <form className={styles.formulario} onSubmit={handleSubmit}>
        <div className={styles.inputBig}>
          <div className={styles.inputIcon}>
            <AiOutlineUser size={18} />
          </div>
          <input
            type="text"
            placeholder="Username"
            autoComplete="username"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            className={
              failedUser ? styles.inputError : styles.input
            }
          />
        </div>
        <div className={styles.inputBig}>
          <div className={styles.inputIcon}>
            <RiLockPasswordLine size={18} />
          </div>
          <input
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className={
              failedPassword ? styles.inputError : styles.input
            }
          />
        </div>
        <StartButton type="submit" text="Login" fontSize="1.2rem" />

      </form>
    </>)
}