import { colors, fontSizes } from '../../styles/theme'
import { useState } from 'react'
import AppLayout from '@c/AppLayout'
import Button from '@c/Button'

import { addOpacityToColor } from '@sty/utils'
export default function Question({
  id = 0,
  title = 'Your connection did not work, do you know why?',
  answers,
  solution = 'yes',
  creator = 'unknown',

  nextQuestion,
  questionIndex,
  results,
  setResults,
}) {
  const [selectedIndex, setSelectedIndex] = useState(undefined)
  const select = (index) => {
    selectedIndex === index
      ? setSelectedIndex(undefined)
      : setSelectedIndex(index)
  }
  const handleSubmit = () => {
    const yourAnswer = answers[selectedIndex]
    const isCorrect = yourAnswer === solution

    // concat in results array the index of question, its solution and if you did it right
    setResults([
      ...results,
      {
        index: questionIndex,
        question: title,
        solution,
        isCorrect,
      },
    ])

    nextQuestion()
  }
  return (
    <>
      <AppLayout>
        <article key={id} className="container">
          <header className="names">
            <small>@{creator}</small>
          </header>
          <div className="content">
            <p className="title">
              {id}.{title}
            </p>
            <div className="answers">
              {answers.map((answer, index) => {
                return (
                  <div
                    onClick={() => select(index)}
                    className="answer"
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
                )
              })}
            </div>
            <Button text="Next" start={handleSubmit} />
          </div>
        </article>
      </AppLayout>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          padding: 10px 15px;
        }
        .container:hover {
          background-color: #f5f8fa;
        }

        header {
          display: flex;
          justify-content: space-between;
        }
        .answer {
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: ${colors.background};
          margin: 5px 0;
          padding: 10px;
          border-radius: 25px;
        }
        .answer:hover {
          background-color: ${colors.secondary};
        }
        .title {
          font-size: ${fontSizes.subheader};
        }
        .send {
          background: ${addOpacityToColor(colors.primary, 0.5)};
          width: fit-content;
          border-radius: 10px;
          padding: 5px 15px;
          cursor: pointer;
        }
      `}</style>
    </>
  )
}
