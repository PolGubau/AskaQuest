import CorrectedQuest from './CorrectedQuest'
import Link from 'next/link'
import styles from './Results.module.css'
import Button from 'src/components/Buttons/Button'

export default function Results({
  results,
  userName = 'Anonymous',
  title = 'Unnamed quest'
}) {
  const questNumber = Number(results.length)
  const correctAnswers = results.filter((result) => result.isCorrect).length // how much questions you answered correctly
  const allAnswersAreGood = correctAnswers === questNumber
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
              <ol style={{ listStyle: 'none', marginLeft: 0, paddingLeft: 0 }}>
                {results.map((result, index) => {
                  const { isCorrect, solution, question } = result
                  const color = isCorrect ? 'green' : 'red'
                  return (
                    <CorrectedQuest
                      key={index}
                      index={index}
                      color={color}
                      question={question}
                      isCorrect={isCorrect}
                      solution={solution}
                    />
                  )
                })}
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
              {allAnswersAreGood && 'wow, you are a master!'}
            </div>
            <div className={styles.buttonsContainer}>
              <Link
                href={{
                  pathname: `/profile/${userName}`
                }}
              >
                <a>
                  <p className={styles.goUser}>More from {userName}</p>
                </a>
              </Link>
              <Link href="/home">
                <a>
                  <Button className={styles.goHome} text="Go Home" />
                </a>
              </Link>
            </div>
          </section>
        </div>
      </article>
    </>
  )
}
