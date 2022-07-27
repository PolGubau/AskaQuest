import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import AppLayout from "src/components/AppLayout";
import SquareLoader from "src/components/loaders/SquaresLoader/SquareLoader";
import styles from "src/styles/Index.module.css";

//auth
import { useSession } from "next-auth/react";
//
const Index = () => {
  // const Index: NextPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  console.log(session.user);
  console.log(status);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [noUser, setnoUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await fetch(`/api/users/userName/${userName}`, {
      method: "GET",
    });

    const user = await response.json();
    setIsLoading(false);

    if (user.error) {
      console.log(user.error);
      setnoUser(true);
    } else {
      if ((user.password = password)) {
        console.log("User correct");
        router.push("/home");
      }
    }
  };

  return (
    <>
      <Head>
        <title>AskAQuest</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppLayout>
        <div className={styles.container}>
          <section>
            <h1>AskAQuest</h1>
            <section className={styles.singupSection}>
              {isLoading ? (
                <SquareLoader />
              ) : (
                <>
                  {noUser ? (
                    <span>This user doesn&apos;t exist 🥀</span>
                  ) : (
                    <span>Already having an account?</span>
                  )}
                  <form className={styles.formulario}>
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
                  </form>
                  <button onClick={handleSubmit}>Login</button>
                  <button>Signin with Github</button>
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

export default Index;
