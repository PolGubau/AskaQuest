import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import AppLayout from "src/components/Layout/AppLayout";
import styles from "src/pages/signup/signup.module.css";
import { PATH } from "src/utils/consts";
import Logo from "src/components/Logo/Logo";

//auth
//
const Login = () => {
  // const Index: NextPage = () => {
  const router = useRouter();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

 
    const handleSubmit = async (e:any) => {
    e.preventDefault()

    // reset error and message
    setError('')
    setMessage('')

    // fields check
    if (!userName || !email|| !password) return setError('All fields are required')

    // user structure
    const user = {
      userName,
      email,
      password,
    }
    // save the post
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(user),
    })

    // get the data
    const data = await response.json()

    if (data.success) {
      // reset the fields
      setUserName('')
      setEmail('')
      setPassword('')
      // set the message
      return setMessage(data.message)
    } else {
      // set the error
      return setError(data.message)
    }
  }
  return (
    <>
      <AppLayout>
        <Logo />
        <div className={styles.container}>
          <section className={styles.singupSection}>
            {error && <p className={styles.error}>{error}</p>}
            {message && <p className={styles.message}>{message}</p>}
            
            {/*  */}
            <form className={styles.formulario} onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Username"
                autoComplete="username"
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
                className={styles.input}
              />
              <input
                type="email"
                placeholder="Email"
                autoComplete="current-email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className={styles.input}
              />
              <input
                type="password"
                placeholder="Password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className={styles.input}
              />

              <input onClick={handleSubmit}
                type={"submit"}
                value="Create account"
                className={styles.createAccount}
              />
            </form>
          </section>

          <section className={styles.buttonSection}>
            <p>Already having an account?</p>
            <button
              className={styles.SignInButton}
              onClick={(e) => {
                router.push(PATH.SIGN_IN);
              }}
            >
              Sign In
            </button>
          </section>
        </div>
      </AppLayout>
    </>
  );
};

export default Login;

// import { useState } from 'react'

// import Nav from '../components/Nav'
// import styles from '../styles/Home.module.css'

// export default function AddPost() {
//   const [title, setTitle] = useState('')
//   const [content, setContent] = useState('')
//   const [error, setError] = useState('')
//   const [message, setMessage] = useState('')

//   const handlePost = async (e) => {
//     e.preventDefault()

//     // reset error and message
//     setError('')
//     setMessage('')

//     // fields check
//     if (!title || !content) return setError('All fields are required')

//     // post structure
//     const post = {
//       title,
//       content,
//       published: false,
//       createdAt: new Date().toISOString(),
//     }
//     // save the post
//     const response = await fetch('/api/posts', {
//       method: 'POST',
//       body: JSON.stringify(post),
//     })

//     // get the data
//     const data = await response.json()

//     if (data.success) {
//       // reset the fields
//       setTitle('')
//       setContent('')
//       // set the message
//       return setMessage(data.message)
//     } else {
//       // set the error
//       return setError(data.message)
//     }
//   }

// }
