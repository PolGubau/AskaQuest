import React, { useState } from 'react'
import SaveButton from 'src/components/Buttons/SaveButton/SaveButton'
import styles from './EachQuestionForm.module.css'

export default function EachQuestionForm ({ saveQuestion }: any) {
  const [answersDone, setAnswersDone] = useState(false)
  const [question, setQuestion] = useState(
    {
      title: '',
      solution: '',
      answers: { Answer1: '', Answer2: '', Answer3: '' }
    }
  )
  const changeTitle = (e: { target: { value: string } }) => {
    setQuestion({
      ...question,
      title: e.target.value
    })
  }
  const changeSolution = (e: { target: { value: string } }) => {
    setQuestion({
      ...question,
      solution: e.target.value
    })
  }
  const changeAnswers = (e: { target: {name: string, value: string } }) => {
    setQuestion({
      ...question,
      answers: {
        ...question.answers,
        [e.target.name]: e.target.value
      }
    })
    // if all answers are filled, set answersDone to true
    if (question.answers.Answer1 !== '' && question.answers.Answer2 !== '' && question.answers.Answer3 !== '') {
      setAnswersDone(true)
    }
  }

  const handleSave = () => {
    saveQuestion(question)
  }
  return (

    <>
      <div className={styles.question}>
        <p className={styles.questionTitle}>Write here your question</p>
        <div className={styles.titleInputs}>
          <input type="text" placeholder="Question" value={question.title} className={styles.input} onChange={changeTitle}/>
        </div>
        <div className={styles.answersInputs}>
          <div className={styles.posibleAnswersInputs}>
            <input type="text" name='Answer1' placeholder="Posible Answer" className={styles.inputmini} onChange={changeAnswers} />
            <input type="text" name='Answer2' placeholder="Posible Answer" className={styles.inputmini} onChange={changeAnswers} />
            <input type="text" name='Answer3' placeholder="Posible Answer" className={styles.inputmini} onChange={changeAnswers} />
          </div>
          <section className={styles.questionFooter}>
          <div className={styles.correctOneSection}>
            <div>
              <p className={styles.correctOneText}>Which is the correct one?</p>

              <input disabled={!answersDone} type="radio" value={question.answers.Answer1} id="Answer1radio"
                onChange={changeSolution} name="AnswerRadio" />
              <label htmlFor="Answer1radio">{question.answers.Answer1.length > 1 ? question.answers.Answer1 : 'Answer 1'}</label>
            </div>
            <div>
              <input disabled={!answersDone} type="radio" value={question.answers.Answer2} id="Answer2radio"
                onChange={changeSolution} name="AnswerRadio" />
              <label htmlFor="Answer2radio">{question.answers.Answer2.length > 1 ? question.answers.Answer2 : 'Answer 2'}</label>
            </div>
            <div>
              <input disabled={!answersDone} type="radio" value={question.answers.Answer3} id="Answer3radio"
                onChange={changeSolution} name="AnswerRadio" />
              <label htmlFor="Answer3radio">{question.answers.Answer3.length > 1 ? question.answers.Answer3 : 'Answer 3'}</label>
            </div>
          </div>
          <div className={styles.saveButton} onClick={handleSave}>
            <SaveButton />
          </div>
          </section>
        </div></div>
    </>
  )
}
