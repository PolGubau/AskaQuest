import { useState } from "react";
import { useRouter } from "next/router";

import AppLayout from "src/components/Layout/AppLayout";
import styles from "src/pages/signup/signup.module.css";
import { PATH } from "src/utils/consts";
import Logo from "src/components/Logo/Logo";
import { AiOutlineUser } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiOutlineMail } from "react-icons/hi";
import Swal from "sweetalert2";
//auth
const SignUp = () => {
  const router = useRouter();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const [failedUser, setFailedUser] = useState(false);
  const [failedEmail, setFailedEmail] = useState(false);
  const [failedPassword, setFailedPassword] = useState(false);
  const messagesLogin = {
    base: "Create your account to acces all features!",
    userNoExist: `This user doesn't exist 🥀`,
    passwordIncorrect: "Your username or password are incorrect.",
  };
  const [message, setMessage] = useState(messagesLogin.base);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // reset error and message
    setError("");
    setMessage("");

    // fields check
    if (!userName || !email || !password)
      return setError("All fields are required");

    // user structure
    const user = {
      userName,
      email,
      password,
    };
    // save the post
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(user),
    });

    // get the data
    const data = await response.json();

    if (data.success) {
      // reset the fields
      setUserName("");
      setEmail("");
      setPassword("");
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Account Created! Now sign in with it'
      })
      router.push(PATH.SIGN_IN);
    } else {
      // set the error
      return setError(data.message);
    }
  };
  return (
    <>
      <AppLayout>
        <Logo />
        <div className={styles.container}>
          <section className={styles.singupSection}>
            {message && <p className={styles.message}>{message}</p>}

            {/*  */}
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
                  className={failedUser ? styles.inputError : styles.input}
                />
              </div>
              <div className={styles.inputBig}>
                <div className={styles.inputIcon}>
                  <HiOutlineMail size={18} />
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  autoComplete="current-email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className={failedUser ? styles.inputError : styles.input}
                />
              </div>
              <div className={styles.inputBig}>
                <div className={styles.inputIcon}>
                <RiLockPasswordLine  size={18}/>
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className={failedUser ? styles.inputError : styles.input}
                />
              </div>


              <input
                onClick={handleSubmit}
                type={"submit"}
                value="Create account"
                className={styles.CreateAccountButton}
              />
            </form>
          </section>

          <section className={styles.buttonSection}>
            <div className={styles.buttonsSectionContainer}>
            <p>Already having an account?</p>
            <button
              className={styles.SignInButton}
              onClick={(e) => {
                
                router.push(PATH.SIGN_IN);
              }}
            >
              Sign In
            </button>
            </div>
          </section>
        </div>
      </AppLayout>
    </>
  );
};

export default SignUp;
