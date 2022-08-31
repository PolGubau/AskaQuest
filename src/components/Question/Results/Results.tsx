import CorrectedQuest from "./CorrectedQuest";
import Link from "next/link";
import styles from "./Results.module.css";
import Button from "src/components/Buttons/Button";
import ButtonWithIcon from "src/components/Buttons/ButtonWithIcon/ButtonWithIcon";
import { updateUser } from "src/services/update/updateUser";
import PATH from "src/utils/path";
import getUserFromLocalStorage from "src/hooks/getUserFromLocalStorage";
import UserInterface from "src/interfaces/User";
import { CollectionInterface } from "src/interfaces/Collection";
import { Key } from "react";

export default function Results({
  results,
  collection,
  userNameCreator = "Anonymous",
  title = "Unnamed quest",
}: {
  results: any;
  collection: CollectionInterface;
  userNameCreator: string;
  title: string;
}) {
  const {
    con: { user },
  } = getUserFromLocalStorage("user");

  const questNumber = Number(results.length);
  const correctAnswers = results.filter(
    (result: { isCorrect: any }) => result.isCorrect
  ).length; // how much questions you answered correctly

  const percent = Math.round((correctAnswers / questNumber) * 100);
  const allAnswersAreGood = correctAnswers === questNumber;

  // we will save the collection ID and its percent to collections_done table of the user logged in in the database
  const saveCollection = async () => {
    if (user) {
      if (user.collections_done) {
        const collectionsDone = user.collections_done;
        collectionsDone.push({
          collection_id: collection.ID,
          percent,
        });
        updateUser(PATH.API.USER_BY_ID, user);
      } else {
        const collectionsDone = [];
        collectionsDone.push({
          collection_id: collection.ID,
          percent,
        });
        updateUser(PATH.API.USER_BY_ID, {
          collections_done: collectionsDone,
          ID: user.ID,
          userName: user.userName,
          password: user.password,
          email: user.email,
          role: user.role,
          liked: user.liked,
        });
      }
    }
  };
  saveCollection();
  return (
    <>
      <article className={styles.container}>
        <div className={styles.content}>
          <section>
            <p>Results</p>
            <h3 className={styles.title}>
              {title}
              <br />
            </h3>
            <div className={styles.explication}>
              <ol style={{ listStyle: "none", marginLeft: 0, paddingLeft: 0 }}>
                {results.map(
                  (
                    result: { isCorrect: any; solution: any; question: any },
                    index: Key | null | undefined
                  ) => {
                    const { isCorrect, solution, question } = result;
                    const color = isCorrect ? "green" : "red";
                    return (
                      <CorrectedQuest
                        key={index}
                        index={index}
                        color={color}
                        question={question}
                        isCorrect={isCorrect}
                        solution={solution}
                      />
                    );
                  }
                )}
              </ol>
            </div>
          </section>
          <section>
            <div className={styles.results}>
              <b>
                {correctAnswers}
                <span>/</span>
                {questNumber}
              </b>
            </div>
            <div className={styles.message}>
              {allAnswersAreGood && "wow, you are a master!"}
            </div>
            <div className={styles.buttonsContainer}>
              <Link href={`${PATH.PROFILE}/${userNameCreator}`}>
                <a>
                  <ButtonWithIcon
                    text={`More from ${userNameCreator}`}
                    icon="user"
                  />
                </a>
              </Link>
              <Link href={PATH.HOME}>
                <a>
                  <ButtonWithIcon text={`Go Home`} icon="home" />
                </a>
              </Link>
            </div>
          </section>
        </div>
      </article>
    </>
  );
}
