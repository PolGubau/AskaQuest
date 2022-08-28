import PATH from "src/utils/path";
import CollectionCover from "src/components/Question/CollectionCover/CollectionCover";
import { useState, useEffect } from "react";
import Nav from "src/components/Nav";
import Question from "src/components/Question";
import Results from "src/components/Question/Results/Results";
import AppLayout from "src/components/Layout/AppLayout";
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

  if (error === true) {
    bigAlert("ouups", `This collection has 0 questions...`, "error");
    void router.push(PATH.HOME);
    return <h1>Oupss</h1>;
  }
  const MAX_QUESTION = Number(questions.length);
  const ARRAY_QUESTIONS = questions;
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
              user.image || `https://api.multiavatar.com/${user.userName}.svg`
            }
            title={collection.title}
            likes={collection.likes}
            tags={tagsJson}
            questions={questions}
            setStarted={setStarted}
          />
        )}
        {error && <ErrorNoQuestions />}

        {started && questionIndex < MAX_QUESTION && (
          <div>
            <Question
              id={currentQuestion.ID}
              userName={user.userName}
              userImage={
                user.image || `https://api.multiavatar.com/${user.userName}.svg`
              }
              title={currentQuestion.title}
              answers={currentQuestion.answers}
              solution={currentQuestion.solution}
              creator={currentQuestion.creator_id}
              createdAt={currentQuestion.date_creation}
              questionIndex={questionIndex}
              nextQuestion={nextQuestion}
              results={results}
              setResults={setResults}
            />
          </div>
        )}
        {questionIndex >= MAX_QUESTION && (
          <Results
            results={results}
            userName={user.userName}
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
    if (!collectionRes) {
      return { props: { error: true } };
    }
    const collection = await collectionRes.json();

    const questionsRes = await fetch(
      `${PATH.API.QUESTIONS_MATCHING_COLLECTION}/${id}`
    );
    const questions = await questionsRes.json();

    const userID = collection.creator_id;
    const userRes = await fetch(`${PATH.API.USER_BY_ID}/${userID}`);
    const user = await userRes.json();
    return { props: { user, collection, questions } };
  } catch (error) {
    return { props: { error: true } };
  }
}
