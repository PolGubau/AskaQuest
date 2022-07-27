import { PATH } from "@s/consts";
import CollectionCover from "@c/Question/CollectionCover";
import { useState, useEffect } from "react";
import Nav from "@c/Nav";
import Question from "@c/Question";
import Results from "@c/Results/Results";
//
export default function CollectionPage({
  collection,
  collectionId,
  questionsMatched,
  user,
}) {
  console.log(user);

  const MAX_QUESTION = Number(questionsMatched.length);
  const ARRAY_QUESTIONS = questionsMatched;
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
  console.log(questionIndex, " - ", MAX_QUESTION);

  return (
    <>
      <Nav
        path={["collections", collectionId]}
        actualLink={"collection/" + collectionId}
      />
      {!started && (
        <CollectionCover
          id={collection.id}
          userId={collection.userId}
          userName={user.userName}
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
  let { id } = context.query;
  const collectionId = id;
  // taking apis
  const resCollection = await fetch(`${PATH.API}/collections/${id}`);
  const collection = await resCollection.json();
  const questions = collection.questions;
  console.log(collection);
  const resQuests = await fetch(`${PATH.API}/quests`);
  // passing apis to json
  const allQuests = await resQuests.json();

  // filtering questions

  // we need to find which questions matches with the allQuests.id
  // const questionsMatched = questsOfCollection.map((quest) => {
  //   const questMatch = allQuests.find((DBquest) => DBquest.id === quest)
  //   return questMatch
  // })
  // const { userId } = collection

  // id = userId
  // // finding the user that created the collection
  // const resUsers = await fetch(`${PATH}/api/singleUser/${id}`)
  // const user = await resUsers.json()

  // return { props: { collection, collectionId, questionsMatched, user } }
}
