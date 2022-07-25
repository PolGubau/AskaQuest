import AppLayout from '@c/AppLayout'
import Button from '@c/Button'
import { addOpacityToColor } from '@sty/utils'
import Link from 'next/link'
import { colors, fontSizes } from '../../styles/theme'
export default function CollectionCover({
  id,
  userId,
  userName = 'unknow',
  title,
  tags,
  questions,
  setStarted,
}) {
  // we have a questions array, they are links, we want to send the first one when start button is pressed

  const start = () => {
    setStarted(true)
  }
  return (
    <>
      <article key={id} className="container">
        <AppLayout>
          <header className="names">
            <Link href={`/profile/${userName}`}>
              <a>
                <small>@{userName}</small>
              </a>
            </Link>
          </header>
          <div className="content">
            <h3 className="title">{title}</h3>
            <span>Tags: </span>
            {tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            ))}
            <div className="answers">
              This test has <b>{questions.length}</b> questions.
            </div>
            <Button text="Start" start={start} />
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

        header {
          display: flex;
          justify-content: space-between;
        }
        .names {
          font-size: ${fontSizes.small};
        }
        .answer {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: ${colors.background};
          margin: 5px 0;
          padding: 10px;
          border-radius: 25px;
          text-align: center;
        }
        .answer:hover {
          background-color: ${colors.secondary};
        }
        .title {
          font-size: ${fontSizes.header};
          margin: 0;
          margin-bottom: 15px;
        }
        .tag {
          margin: 0 5px;
          background-color: ${addOpacityToColor(colors.primary, 0.1)};
          padding: 3px 6px;
          border-radius: 5px;
        }
        .answers {
          margin-top: 15px;
        }
        .sendCont {
          display: flex;
          justify-content: flex-start;
          width: 100%;
          align-items: center;
          flex-wrap: wrap;
          flex-direction: row;
          align-content: center;
        }
        .send {
          margin: 0;
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
        .buttonsContainer {
          position: absolute;
          bottom: 20px;
          right: 20px;
          display: flex;
          justify-content: flex-end;
          align-items: flex-end;
          flex-wrap: wrap;
          flex-direction: column;
          align-content: flex-end;
        }
      `}</style>
    </>
  )
}
