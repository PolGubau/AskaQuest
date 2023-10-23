import PATH from "src/utils/path";
import CollectionCover from "src/components/Question/CollectionCover/CollectionCover";
import { useState, useEffect } from "react";
import Nav from "src/components/Nav";
import Question from "src/components/Question";
import Results from "src/components/Question/Results/Results";
import AppLayout from "src/components/Layout/AppLayout/AppLayout";
import ErrorNoQuestions from "src/components/Question/ErrorNoQuestions";
import { bigAlert } from "src/utils/notifications";
import { useRouter } from "next/router";

import UserInterface from "src/interfaces/User";
import { CollectionInterface } from "src/interfaces/Collection";
import { QuestionInterface } from "src/interfaces/Question";
//
export default function CollectionPage({
  error = false,
  user,
  collection,
  questions,
}: {
  error: boolean;
  user: UserInterface;
  collection: CollectionInterface;
  questions: QuestionInterface[];
}) {
  const router = useRouter();
  if (questions.length === 0) {
    void bigAlert("ouups", "This collection has 0 questions...", "error");
    void router.push(PATH.HOME);
    return <h1>Oupss</h1>;
  }
  const MAX_QUESTION = Number(questions.length);
  const ARRAY_QUESTIONS = questions;
  console.log(ARRAY_QUESTIONS);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(
    ARRAY_QUESTIONS[questionIndex]
  );
  const [started, setStarted] = useState(false);
  const [results, setResults] = useState([]);

  const tagsJson = collection.tags ? JSON.parse(collection.tags) : [];

  //
  const nextQuestion = () => {
    setQuestionIndex(questionIndex + 1);
  };
  useEffect(() => {
    setCurrentQuestion(ARRAY_QUESTIONS[questionIndex]);
  }, [questionIndex]);

  return (
    <>
      <Nav />
      <AppLayout>
        {!started && (
          <CollectionCover
            id={collection.ID}
            userId={collection.creator_id}
            userName={user.userName}
            userImage={
              user.image ?? `https://api.multiavatar.com/${user.userName}.svg`
            }
            title={collection.title}
            likes={collection.likes}
            tags={tagsJson}
            questions={questions}
            setStarted={setStarted}
          />
        )}
        {error && <ErrorNoQuestions />}

        {started &&
          questionIndex < MAX_QUESTION &&
          currentQuestion.ID !== "undefined" && (
            <div>
              <Question
                id={currentQuestion.ID ? currentQuestion.ID : 0}
                userName={user.userName}
                userImage={
                  user.image ??
                  `https://api.multiavatar.com/${user.userName}.svg`
                }
                title={currentQuestion.title}
                answers={currentQuestion.answers}
                solution={currentQuestion.solution}
                creator={currentQuestion.creator_id ?? 0}
                createdAt={currentQuestion.date_creation}
                questionIndex={questionIndex}
                likes={currentQuestion.likes}
                nextQuestion={nextQuestion}
                results={results}
                setResults={setResults}
              />
            </div>
          )}
        {questionIndex >= MAX_QUESTION && (
          <Results
            results={results}
            collection={collection}
            userNameCreator={user.userName}
            title={collection.title}
          />
        )}
      </AppLayout>
    </>
  );
}
export async function getServerSideProps(context: { query: { id: string } }) {
  try {
    const { id } = context.query;
    // we have an id from a collection
    const collectionRes = await fetch(`${PATH.API.COLLECTION_BY_ID}/${id}`);
    const collection = await collectionRes.json();

    const questionsRes = await fetch(
      `${PATH.API.QUESTIONS_MATCHING_COLLECTION}/${id}`
    );
    const questJSON = await questionsRes.json();
    const questions = questJSON.rows;

    const userID = collection.creator_id;
    const userRes = await fetch(`${PATH.API.USER_BY_ID}/${userID}`);
    const user = await userRes.json();
    return { props: { user, collection, questions } };
  } catch (error) {
    console.log("Error: ", error);
    return { props: { error: true } };
  }
}
