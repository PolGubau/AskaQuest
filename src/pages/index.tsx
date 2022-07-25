import type { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import { conn } from "src/utils/database";
import styles from "../styles/Home.module.css";
import AppLayout from "src/components/AppLayout";
import { PATH } from "src/utils/consts";
import { colors } from "../styles/theme";
import { setToStorage, getFromStorage } from "src/hooks/useStorage";

//
const Index: NextPage = () => {
  const router = useRouter();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [noUser, setnoUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: any) => {
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
            <section className="singupSection">
              {isLoading ? (
                <div>Loading...</div>
              ) : (
                <>
                  {noUser ? (
                    <span>This user doesn&apos;t exist 🥀</span>
                  ) : (
                    <span>Already having an account?</span>
                  )}
                  <form>
                    <input
                      type="text"
                      placeholder="Username"
                      autoComplete="username"
                      onChange={(e) => setUserName(e.target.value)}
                      value={userName}
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      autoComplete="current-password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />
                  </form>
                  <button onClick={handleSubmit}>Login</button>
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
      {/* <style jsx>{`
        .buttonsContainer {
          display: flex;
          flex-direction: row;
          margin: 10px;
        }
        button {
          margin: 5px 2px;
          padding: 3px 6px;
        }

        h1 {
          color: ${colors.secondary};
          font-weight: 800;
          margin-bottom: 16px;
        }
      `}</style> */}
    </>
  );
};

export default Index;
