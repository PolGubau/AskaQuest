import { colors } from '../../styles/theme'

export default function QuestionLoading() {
  return (
    <>
      <article className="container">
        <header className="names">
          <small className="nameCreator">@</small>
        </header>
        <div className="content">
          <p className="title"></p>
          <div className="answers"></div>
          <div className="answers"></div>
          <div className="answers"></div>
          <p className="send"></p>
        </div>
      </article>
      <style jsx>{`
        .container {
          min-height: 300px;
          border-bottom: solid #ccc 2px;
          display: flex;
          flex-direction: column;
          padding: 10px 15px;
        }
        .names {
          width: 20%;
          height: 25px;
          background-color: ${colors.black};
          opacity: 0.1;
          border-radius: 50px;
        }
        .title {
          width: 60%;
          height: 35px;
          margin-top: 30px;
          background-color: ${colors.black};
          opacity: 0.3;
          border-radius: 50px;
        }
        .answers {
          width: 100%;
          height: 40px;
          margin-top: 5px;
          background-color: ${colors.black};
          opacity: 0.2;
          border-radius: 50px;
        }
      `}</style>
    </>
  )
}
