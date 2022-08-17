import { useRouter } from 'next/router'

import AppLayout from 'src/components/Layout/AppLayout'
import styles from 'src/pages/signup/signup.module.css'
import { PATH } from 'src/utils/consts'
import Logo from 'src/components/Logo/Logo'
import SignUpForm from 'src/components/Layout/Forms/SignUpForm/SignUpForm'
import Nav from 'src/components/Nav'

// auth
const SignUp = () => {
  const router = useRouter()

  return (
    <>
    <Nav seeProfile={false}/>
      <AppLayout>
        <Logo />
        <div className={styles.container}>
          <section className={styles.singupSection}>
            <SignUpForm />
          </section>

          <section className={styles.buttonSection}>
            <div className={styles.buttonsSectionContainer}>
              <p>Already having an account?</p>
              <button
                className={styles.SignInButton}
                onClick={(e) => {
                  router.push(PATH.SIGN_IN).catch((err) => console.log(err))
                }}
              >
                Sign In
              </button>
            </div>
          </section>
        </div>
      </AppLayout>
    </>
  )
}

export default SignUp
