import { PATH } from "src/utils/consts";
import CollectionCover from "src/components/Question/CollectionCover";
import { useState, useEffect } from "react";
import Nav from "src/components/Nav";
import Question from "src/components/Question";
import Results from "src/components/Results/Results";
//
export default function CollectionPage({
  error = false,
  user,
  collection,
  questions,
}) {
  if (error) {
    return <h1>Error</h1>;
  }
  const MAX_QUESTION = Number(questions.length);
  const ARRAY_QUESTIONS = questions;
  const [questionIndex, setQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(
    ARRAY_QUESTIONS[questionIndex]
  );
  const [started, setStarted] = useState(false);
  const [results, setResults] = useState([]);

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
      {!started && (
        <CollectionCover
          id={collection.id}
          userId={collection.userId}
          // userName={user.userName}
          title={collection.title}
          tags={collection.tags}
          questions={collection.questions}
          setStarted={setStarted}
        />
      )}
      {started && questionIndex < MAX_QUESTION && (
        <div>
          <Question
            id={currentQuestion.id}
            title={currentQuestion.title}
            answers={currentQuestion.answers}
            solution={currentQuestion.solution}
            creator={currentQuestion.creator}
            createdAt={currentQuestion.createdAt}
            likes={currentQuestion.likes}
            incorrect={currentQuestion.incorrect}
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
    </>
  );
}
export async function getServerSideProps(context) {
  const { id } = context.query;
  // we have an id from a collection
  const collectionRes = await fetch(`${PATH.API}/collections/${id}`);
  if (!collectionRes) {
    return { props: { error: true } };
  }
  const collection = await collectionRes.json();

  const questionsRes = await fetch(
    `${PATH.API}/questions/MatchingByCollection/${id}`
  );
  const questions = await questionsRes.json();

  const userID = collection.creator_id;
  const userRes = await fetch(`${PATH.API}/users/id/${userID}`);
  const user = await userRes.json();

  return { props: { user, collection, questions } };
}
