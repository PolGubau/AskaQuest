import { useState } from "react";
import { useRouter } from "next/router";

import Logo from "src/components/Logo/Logo";
import AppLayout from "src/components/Layout/AppLayout";
import SquareLoader from "src/components/loaders/SquaresLoader/SquareLoader";
import styles from "src/pages/login/login.module.css";
import { PATH } from "src/utils/consts";
import { messagesLogin } from "src/utils/text";

import Swal from "sweetalert2";
var bcrypt = require("bcryptjs");

import { AiOutlineUser } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import Nav from "src/components/Nav";

const Login = () => {
  const router = useRouter();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [failedUser, setFailedUser] = useState(false);
  const [failedPassword, setFailedPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(messagesLogin.base);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await fetch(`/api/users/userName/${userName}`);

    if (response.ok === false) {
      // user not found
      Swal.fire("Ouups!", messagesLogin.userNoExist, "error");
      setFailedUser(true);
      setMessage(messagesLogin.userNoExist);
      setIsLoading(false);
    } else {
      // user found
      const user = await response.json();

      if (!bcrypt.compareSync(password, user.password)) {
        // password not match
        Swal.fire("Ouups!", messagesLogin.passwordIncorrect, "error");
        setFailedPassword(true);
        setMessage(messagesLogin.passwordIncorrect);
        setIsLoading(false);
      } else {
        // password match

        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: "Signed in successfully",
        });
        const jsonUser = JSON.stringify(user);

        sessionStorage.setItem("user", jsonUser);
        router.push(PATH.HOME);
      }
    }
  };

  return (
    <>
      <Nav seeProfile={false} />
      <AppLayout>
        <div className={styles.container}>
          <section>
            <Logo />
            <section className={styles.singupSection}>
              {isLoading ? (
                <SquareLoader />
              ) : (
                <>
                  {message}
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
                    <input
                      type="submit"
                      value="Sign In"
                      className={styles.SignInButton}
                    />
                  </form>
                </>
              )}
            </section>

            <section className={styles.buttonSection}>
              <div className={styles.buttonsSectionContainer}>
                <p>Not having an accout yet?</p>
                <button
                  className={styles.CreateAccountButton}
                  onClick={(e) => {
                    router.push(PATH.CREATE_ACCOUNT);
                  }}
                >
                  Create an account
                </button>
              </div>
            </section>
          </section>
        </div>
      </AppLayout>
    </>
  );
};

export default Login;
