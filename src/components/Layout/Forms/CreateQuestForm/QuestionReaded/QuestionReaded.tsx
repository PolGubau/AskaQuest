import styles from './QuestionReaded.module.css'
export default function QuestionReaded ({ question }: any) {
  console.log(question)
  const { title, solution, answers } = question
  return (<>
        <div className={styles.questionBox}>
            <p className={styles.title}>{title}</p>
            <div>
                <p>Answers:</p>
                <p>{answers.Answer1}</p>
                <p>{answers.Answer2}</p>
                <p>{answers.Answer3}</p>
            </div>
            <div className={styles.solutionContainer}>
                <p>Solution:</p>
                <p className={styles.solutionText}>{solution}</p>
            </div>
        </div>
    </>)
}
