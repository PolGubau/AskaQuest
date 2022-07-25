import AppLayout from '@c/AppLayout'
import { addOpacityToColor } from '@sty/utils'
import { colors, fontSizes, breakpoints } from '../../styles/theme'
import CorrectedQuest from './CorrectedQuest'
import Link from 'next/link'
import Button from '@c/Button'

export default function Results({
  results,
  userName = 'Anonymous',
  title = 'Unnamed quest',
}) {
  const questNumber = Number(results.length)
  const correctAnswers = results.filter((result) => result.isCorrect).length // how much questions you answered correctly
  //   const incorrectAnswers = results.filter((result) => !result.isCorrect).length  // how much questions you answered wrong
  const allAnswersAreGood = correctAnswers === questNumber
  return (
    <>
      <article className="container">
        <AppLayout>
          <div className="content">
            <section>
              <p>Results</p>
              <h3 className="title">
                {title}
                <br />
              </h3>
              <div className="explication">
                <ol
                  style={{ listStyle: 'none', marginLeft: 0, paddingLeft: 0 }}
                >
                  {results.map((result, index) => {
                    const { isCorrect, solution, question } = result
                    const color = isCorrect ? colors.right : colors.wrong
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
              <div className="results">
                <b>
                  {correctAnswers}
                  <span>/</span>
                  {questNumber}
                </b>
              </div>
              <div className="message">
                {allAnswersAreGood && 'wow, you are a master!'}
              </div>
              <div className="buttonsContainer">
                <Link
                  href={{
                    pathname: `/profile/${userName}`,
                  }}
                >
                  <a>
                    <p className="goUser">More from {userName}</p>
                  </a>
                </Link>
                <Link href="/home">
                  <a>
                    <Button className="goHome" text="Go Home" />
                  </a>
                </Link>
              </div>
            </section>
          </div>
        </AppLayout>
      </article>

      <style jsx>{`
        article {
          width: 100%;
        }
        .container {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          padding: 10px 15px;
        }
        .content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding-left: 20px;
        }
        header {
          display: flex;
          justify-content: space-between;
        }
        .names {
          font-size: ${fontSizes.small};
        }

        .title {
          font-size: ${fontSizes.header};
          margin: 0;
          margin-bottom: 15px;
        }
        .results {
          display: flex;
          flex-direction: row;
          margin-right: 10px;
          font-size: ${fontSizes.extraBig};
          justify-content: flex-end;
          align-items: center;
          align-content: center;
          flex-wrap: wrap;
        }
        .results span {
          color: ${addOpacityToColor(colors.primary, 0.6)};
          margin: 0 3px;
        }
        .message {
          display: flex;
          flex-direction: row;
          margin-right: 10px;
          font-size: ${fontSizes.text};
          justify-content: flex-end;
          align-items: center;
          align-content: center;
          flex-wrap: wrap;
        }
        .buttonsContainer {
          position: absolute;
          bottom: 20px;
          right: 20px;
          display: flex;
          justify-content: flex-end;
          width: 100%;
          align-items: flex-end;
          flex-wrap: wrap;
          flex-direction: column;
          align-content: flex-end;
          gap: 10px;
        }
        .buttonsContainer p {
          margin: 1px 0;
        }
        .goUser {
          border-bottom: 1px solid black;
          cursor: pointer;
        }
        .goHome {
          cursor: pointer;
          display: flex;
          background-color: ${addOpacityToColor(colors.primary, 0.4)};
          width: fit-content;
          border-radius: 7px;
          font-size: ${fontSizes.subheader};
          padding: 5px 15px;
        }
        .send:hover {
          background-color: ${addOpacityToColor(colors.primary, 0.7)};
        }
        @media (max-width: ${breakpoints.mobile}) {
          .content {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
          }
        }
        .results {
          justify-content: flex-start;
        }
        .buttonContainer {
        }
      `}</style>
    </>
  )
}
