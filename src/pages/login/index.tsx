import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import AppLayout from "src/components/AppLayout";
import SquareLoader from "src/components/loaders/SquaresLoader/SquareLoader";
import styles from "src/pages/login/login.module.css";
import { PATH } from "src/utils/consts";
import { getSession, signIn, getProviders } from "next-auth/react";

//auth
//
const Login = () => {
  // const Index: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const providers = await getProviders();
    })();
  }, []);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [noUser, setnoUser] = useState(false);
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

    const user = await response.json();
    setIsLoading(false);

    if (user.error) {
      console.log(user.error);
      setMessage(messagesLogin.userNoExist);
      setnoUser(true);
    } else {
      if (user.password === password) {
        console.log("User correct");
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
                  <form className={styles.formulario} onClick={handleSubmit}>
                    <input
                      type="text"
                      placeholder="Username"
                      autoComplete="username"
                      onChange={(e) => setUserName(e.target.value)}
                      value={userName}
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
                  <input type="submit" value='Sign In' />
                  </form>
                  <button onClick={() => signIn("github")}>
                    Signin with Github
                  </button>
                </>
              )}
            </section>

            <section className="buttonsContainer">
              <button
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
