import Logo from 'src/components/Logo/Logo'
import AppLayout from 'src/components/Layout/AppLayout/index'
import SquareLoader from 'src/components/loaders/SquaresLoader/SquareLoader'
import styles from 'src/styles/stylesPages/login.module.css'
import PATH from 'src/utils/path'
import Nav from 'src/components/Nav'
import LoginForm from 'src/components/Layout/Forms/loginForm/LoginForm'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Head from 'next/head'

const Login = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  return (
    <>
      <Head>
        <title>Login / AskaQuest</title>
      </Head>
      <Nav seeProfile={false} />
      <AppLayout>
        <div className={styles.container}>
          <section>
            <Logo />
            <section className={styles.singupSection}>
              {isLoading
                ? (
                <SquareLoader />
                  )
                : (
                <LoginForm isLoading={isLoading} setLoading={setIsLoading} />
                  )}
            </section>

            <section className={styles.buttonSection}>
              <div className={styles.buttonsSectionContainer}>
                <p>Not having an accout yet?</p>
                <button
                  className={styles.CreateAccountButton}
                  onClick={(e) => {
                    router
                      .push(PATH.CREATE_ACCOUNT)
                      .catch((err) => console.log(err))
                  }}
                >
                  Create Account
                </button>
              </div>
            </section>
          </section>
        </div>
      </AppLayout>
    </>
  )
}

export default Login
