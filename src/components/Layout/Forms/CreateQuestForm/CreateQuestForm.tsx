/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useState } from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import styles from './CreateQuestForm.module.css'
import { messageCreateCollection } from 'src/utils/text'
import StartButton from 'src/components/Buttons/StartButton/StartButton'
import UserHeader from 'src/components/UserHeader/UserHeader'
import EachQuestionForm from './EachQuestionForm/EachQuestionForm'
import { Question } from 'src/interfaces/question'
import QuestionReaded from './QuestionReaded/QuestionReaded'
import { Collection } from 'src/interfaces/Collection'
import useSessionStorage from 'src/hooks/useSessionStorage'

export default function CreateQuestForm () {
  const [collection, setCollection] = useState<Collection[]>([])
  const [questions, setQuestions] = useState<Question[]>([])

  const { con: { data } }: any = useSessionStorage()
  const creatorID = data.ID

  const [title, setTitle] = useState('')
  const [tags, setTags] = useState(['', '', ''])

  const saveQuestions = (question: Question) => {
    question.creator_id = creatorID
    question.date_creation = new Date()
    setQuestions([...questions, question])
  }
  console.log(questions)
  const message = (messageCreateCollection.base)

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    // 1. guardar la coleccion en la base de datos
    // 2. coger el ID de la collection
    // 3. guardar las preguntas en la base de datos

    // const response = await fetch('/api/createQuest', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(data)
    // })
  }
  return (
    <>
      {message && <p className={styles.message}>{message}</p>}

      <form className={styles.formulario}>
        <div className={styles.headerInputs}>
          <div className={styles.inputBig}>
            <div className={styles.inputIcon}>
              <AiOutlineUser size={18} />
            </div>
            <input
              type="text"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className={styles.input}
            />
          </div>
          <UserHeader size={49} you={true} />
        </div>
        <section className={styles.tagsContainer}>
          <p>How would you describe your Quest in 3 words?</p>
          <div className={styles.tagsParent}>
            <input
              type="text"
              placeholder="Tag 1"
              onChange={(e) => setTags([e.target.value, tags[1], tags[2]])}
              value={tags[0]}
              className={styles.inputmini}
            />
            <input
              type="text"
              placeholder="Tag 2"
              autoComplete="username"
              onChange={(e) => setTags([tags[0], e.target.value, tags[2]])}
              value={tags[1]}
              className={styles.inputmini}
            />
            <input
              type="text"
              placeholder="Tag 3"
              autoComplete="username"
              onChange={(e) => setTags([tags[0], tags[1], e.target.value])}
              value={tags[2]}
              className={styles.inputmini}
            />
          </div>
        </section>

        {/* */}

        <article className={styles.questionsContainer}>
          {questions.map((question, index) => (
            <QuestionReaded key={index} question={question} />
          ))}

          <EachQuestionForm saveQuestion={saveQuestions} />

        </article>

        <div className={styles.buttonContainer} onClick={handleSubmit}>
          <StartButton type="submit" text="Submit Collection" fontSize="1.2rem" />
        </div>
      </form>
    </>)
}
