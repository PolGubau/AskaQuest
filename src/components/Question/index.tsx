import { colors } from 'src/styles/theme'
import { useState } from 'react'
import Button from 'src/components/Buttons/Button'
import styles from './Question.module.css'
import UserHeader from 'src/components/UserHeader/UserHeader'
//

export default function Question ({
  id = 0,
  title = 'Your connection did not work, do you know why?',
  answers: answersStringified = '[]',
  solution = 'yes',
  userName = 'unknow',
  userImage = 'https://api.multiavatar.com/unknow.svg',
  nextQuestion,
  questionIndex,
  results,
  creator,
  likes,
  createdAt,
  setResults
}: {id: number | string, title: string, answers: any, solution: string, userName: string, userImage: string, nextQuestion: any, questionIndex: number, results: any, creator: number, likes: number, createdAt: string | Date, setResults: any}) {
  const answers = JSON.parse(answersStringified)

  const [selectedIndex, setSelectedIndex] = useState(undefined)
  const select = (index: any) => {
    selectedIndex === index
      ? setSelectedIndex(undefined)
      : setSelectedIndex(index)
  }
  const handleSubmit = () => {
    const yourAnswer = answers[selectedIndex ?? 0]
    const isCorrect = yourAnswer === solution
    setSelectedIndex(undefined)
    // concat in results array the index of question, its solution and if you did it right
    setResults([
      ...results,
      {
        index: questionIndex,
        question: title,
        solution,
        isCorrect
      }
    ])

    nextQuestion()
  }
  return (
    <>
      <article key={id} className={styles.container}>
        <header className={styles.names}>
         <UserHeader name={userName} image={userImage} searchById={{ state: false, id: '' }} you={false} size={40}/>
        </header>
        <div className={styles.content}>
          <p className={styles.title}>
            {id}.{title}
          </p>
          <div className={styles.answers}>
            {answers.map((answer: string, index: string) => {
              return (
                <div
                  onClick={() => select(index)}
                  className={styles.answer}
                  style={{
                    backgroundColor:
                      selectedIndex === index
                        ? colors.primary
                        : colors.background
                  }}
                  key={index}
                  id={`answer${index}`}
                >
                  <span>{answer}</span>
                </div>
              )
            })}
          </div>
          <Button text="Next" start={handleSubmit} />
        </div>
      </article>
    </>
  )
}
