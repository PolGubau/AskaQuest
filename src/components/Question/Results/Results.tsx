import CorrectedQuest from './CorrectedQuest'
import Link from 'next/link'
import styles from './Results.module.css'
import ButtonWithIcon from 'src/components/Buttons/ButtonWithIcon/ButtonWithIcon'
import { updateUser } from 'src/services/update/updateUser'
import PATH from 'src/utils/path'
import getUserFromLocalStorage from 'src/hooks/getUserFromLocalStorage'
import { CollectionInterface } from 'src/interfaces/Collection'
import { Key } from 'react'

export default function Results ({
  results,
  collection,
  userNameCreator = 'Anonymous',
  title = 'Unnamed quest'
}: {
  results: any
  collection: CollectionInterface
  userNameCreator: string
  title: string
}) {
  const {
    con: { user }
  } = getUserFromLocalStorage()
  console.log('UserGetted:', user)

  const questNumber = Number(results.length)
  const correctAnswers = results.filter(
    (result: { isCorrect: any }) => result.isCorrect
  ).length // how much questions you answered correctly

  const percent = Math.round((correctAnswers / questNumber) * 100)
  const allAnswersAreGood = correctAnswers === questNumber

  // we will save the collection ID and its percent to collections_done table of the user logged in in the database
  const saveCollection = async () => {
    if ((user != null) && collection.ID) {
      if (user.collections_done != null) {
        // console.log("Not his first collection");

        let collectionsDone = user.collections_done
        if (!collectionsDone || collectionsDone.length === 0) {
          collectionsDone = []
        }

        // need to check if the collection is already in the array
        const collectionAlreadyDone = collectionsDone.find(
          (idsDone: { id: number }) => idsDone.id === collection.ID
        )

        if (collectionAlreadyDone != null) {
          // Collection already done

          const newTimes = collectionAlreadyDone.times + 1
          const newPer = Math.round(
            (collectionAlreadyDone.per + percent) / newTimes
          )

          // we need to update the collection in the array
          const newCollectionsDone = collectionsDone.map(
            (collectionDone: { id: number, per: number, times: number }) => {
              if (collectionDone.id === collection.ID) {
                return {
                  id: collection.ID,
                  per: newPer,
                  times: collectionDone.times + 1
                }
              } else {
                return collectionDone
              }
            }
          )
          const newUser = {
            ...user,
            collections_done: newCollectionsDone
          }
          console.log(newUser)

          const newUserStringified = {
            ...newUser,
            collections_done: JSON.stringify(newCollectionsDone)
          }
          console.log(newUserStringified)
          localStorage.setItem('user', JSON.stringify(newUserStringified))
          updateUser(PATH.API.USER_BY_ID, newUser)
        } else {
          // First time doing this collection;

          collectionsDone.push({
            id: collection.ID,
            per: percent,
            times: 1
          })
          const newUser = {
            ...user,
            collections_done: collectionsDone
          }
          const newUserStringified = {
            ...newUser,
            collections_done: JSON.stringify(collectionsDone)
          }
          localStorage.setItem('user', JSON.stringify(newUserStringified))
          updateUser(PATH.API.USER_BY_ID, newUser)
        }
      } else {
        const collectionsDone = []
        collectionsDone.push({
          id: collection.ID,
          per: percent,
          times: 1
        })
        const newUser = {
          ...user,
          collections_done: collectionsDone
        }
        const newUserStringified = {
          ...newUser,
          collections_done: JSON.stringify(collectionsDone)
        }
        localStorage.setItem('user', JSON.stringify(newUserStringified))
        updateUser(PATH.API.USER_BY_ID, newUser)
      }
    }
  }
  saveCollection()
  return (
    <>
      <article className={styles.container}>
        <div className={styles.content}>
          <section className={styles.resultsSection}>
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
              <Link href={`${PATH.PROFILE}/${userNameCreator}`}>
                <a>
                  <ButtonWithIcon
                    text={`More from ${userNameCreator}`}
                    icon="user"
                  />
                </a>
              </Link>
              <Link href={PATH.HOME}>
                <a>
                  <ButtonWithIcon text={'Go Home'} icon="home" />
                </a>
              </Link>
            </div>
          </section>
          <section className={styles.responsesSection}>
            <p>Results</p>
            <h3 className={styles.title}>
              {title}
              <br />
            </h3>
            <div className={styles.explication}>
              <ol style={{ listStyle: 'none', marginLeft: 0, paddingLeft: 0 }}>
                {results.map(
                  (
                    result: { isCorrect: any, solution: any, question: any },
                    index: Key | null | undefined
                  ) => {
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
                  }
                )}
              </ol>
            </div>
          </section>
        </div>
      </article>
    </>
  )
}
