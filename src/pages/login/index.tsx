import { useState } from "react";
import { useRouter } from "next/router";

import AppLayout from "src/components/Layout/AppLayout";
import SquareLoader from "src/components/loaders/SquaresLoader/SquareLoader";
import styles from "src/pages/login/login.module.css";
import { PATH } from "src/utils/consts";
import Swal from "sweetalert2";

import { AiOutlineUser } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";

const Login = () => {
  const router = useRouter();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [failedUser, setFailedUser] = useState(false);
  const [failedPassword, setFailedPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesLogin = {
    base: "Already having an account?",
    userNoExist: "This user doesn&apos;t exist 🥀",
    passwordIncorrect: "Your username or password are incorrect.",
  };
  const [message, setMessage] = useState(messagesLogin.base);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await fetch(`/api/users/userName/${userName}`);

    console.log(response);

    if (response.ok === false) {
      Swal.fire("Ouups!", messagesLogin.userNoExist, "error");
      setFailedUser(true);
      setMessage(messagesLogin.userNoExist);
      setIsLoading(false);
    } else {
      const user = await response.json();

      if (user.password !== password) {
        Swal.fire("Ouups!", messagesLogin.passwordIncorrect, "error");
        setFailedPassword(true);
        setMessage(messagesLogin.passwordIncorrect);
        setIsLoading(false);
      } else {
        const jsonUser = JSON.stringify(user);

        sessionStorage.setItem("user", jsonUser);
        router.push(PATH.HOME);
      }
    }
  };

  return (
    <>
      <AppLayout>
        <div className={styles.container}>
          <section>
            <h1>AskAQuest</h1>
            <section className={styles.singupSection}>
              {isLoading ? (
                <SquareLoader />
              ) : (
                <>
                  {message}
                  <form className={styles.formulario} onSubmit={handleSubmit}>
                    <div className={styles.inputBig}>
                      <div className={styles.inputIcon}>
                        <AiOutlineUser size={18}/>
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
                        <RiLockPasswordLine  size={18}/>
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
                    <input
                      type="submit"
                      value="Sign In"
                      className={styles.SignInButton}
                    />
                  </form>
                </>
              )}
            </section>

            <section className={styles.buttonsContainer}>
              <button
                className={styles.CreateAccountButton}
                onClick={(e) => {
                  router.push("/singup");
                }}
              >
                Create an account
              </button>
            </section>
          </section>
        </div>
      </AppLayout>
    </>
  );
};

export default Login;
