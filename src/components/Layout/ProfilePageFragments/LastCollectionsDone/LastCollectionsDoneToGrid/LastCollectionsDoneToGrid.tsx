import React from 'react'
import SquareLoader from 'src/components/loaders/SquaresLoader/SquareLoader'
import UserInterface from 'src/interfaces/user'
import returnObjectById from 'src/services/returnObjectById'
import PATH from 'src/utils/path'
import styles from './LastCollectionsDoneToGrid.module.css'
export default function LastCollectionsDoneToGrid ({
  user
}: {
  user: UserInterface
}) {
  const collectionsDone = user.collections_done
  if (!collectionsDone) {
    return null
  } else {
    return (
          <div className={styles.container}>
            <p>{'Fav collections:'}</p>
            <div className={styles.collectionsDoneContainer}>
                {collectionsDone.map((collectionID) => {
                  const res = returnObjectById(PATH.API.ALL_COLLECTIONS, collectionID.id)
                  const { data, status } = res
                  if (status === 'loading') { return <SquareLoader size={20} /> }
                  return (
                    data.title
                  )
                })
                  .slice(0, 9)
                  }
              </div>
            </div>

    )
  }
}
