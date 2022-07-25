export default function CorrectedQuest({
  index,
  color,
  question,
  isCorrect,
  solution,
}) {
  return (
    <>
      <li key={index} className="answerContainer">
        <span className="question">{question}</span>

        <p className="solution">
          {isCorrect && <small>{solution}</small>}
          {!isCorrect && <small>Correct one was {solution}</small>}
        </p>
      </li>
      <style jsx>{`
        li {
          display: flex;
          align-items: flex-start;
          padding: 5px;
        }
        .answerContainer {
          display: flex;
          margin: 10px 0;
          flex-wrap: wrap;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
        }
        .question {
          padding: 0px 4px;
          border-radius: 4px;
          background-color: ${color};
          line-height: 1.5;
        }
        .solution {
          margin: 0 20px;
          padding: 0px 4px;
          border-radius: 4px;
        }
      `}</style>
    </>
  )
}
