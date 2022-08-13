import { colors } from "src/styles/theme";
import { useState } from "react";
import Button from "src/components/Buttons/Button";
import styles from "./Question.module.css";
import Link from "next/link";
import Image from "next/image";

//
export default function Question({
  id = 0,
  title = "Your connection did not work, do you know why?",
  answers,
  solution = "yes",
  userName = "unknow",
  userImage = "https://api.multiavatar.com/unknow.svg",
  nextQuestion,
  questionIndex,
  results,
  setResults,
}) {
  const [selectedIndex, setSelectedIndex] = useState(undefined);
  const select = (index) => {
    selectedIndex === index
      ? setSelectedIndex(undefined)
      : setSelectedIndex(index);
  };
  const handleSubmit = () => {
    const yourAnswer = answers[selectedIndex];
    const isCorrect = yourAnswer === solution;

    // concat in results array the index of question, its solution and if you did it right
    setResults([
      ...results,
      {
        index: questionIndex,
        question: title,
        solution,
        isCorrect,
      },
    ]);

    nextQuestion();
  };
  return (
    <>
      <article key={id} className={styles.container}>
        <header className={styles.names}>
          <Link href={`/profile/${userName}`}>
            <a className={styles.creator}>
              <Image
                src={userImage}
                alt="Creator avatar"
                width={30}
                height={30}
              />
              <small className={styles.creatorUserNameBy}>
                By
                <span className={styles.creatorUserName}>{userName}</span>
              </small>
            </a>
          </Link>
        </header>
        <div className={styles.content}>
          <p className={styles.title}>
            {id}.{title}
          </p>
          <div className={styles.answers}>
            {answers.map((answer, index) => {
              return (
                <div
                  onClick={() => select(index)}
                  className={styles.answer}
                  style={{
                    backgroundColor:
                      selectedIndex === index
                        ? colors.primary
                        : colors.background,
                  }}
                  key={index}
                  id={`answer${index}`}
                >
                  <span>{answer}</span>
                </div>
              );
            })}
          </div>
          <Button text="Next" start={handleSubmit} />
        </div>
      </article>
    </>
  );
}
