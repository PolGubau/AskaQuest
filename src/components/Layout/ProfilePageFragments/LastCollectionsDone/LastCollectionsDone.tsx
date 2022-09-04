import React from 'react'
import SquareLoader from 'src/components/loaders/SquaresLoader/SquareLoader'
import UserInterface from 'src/interfaces/user'
import returnObjectById from 'src/services/returnObjectById'
import PATH from 'src/utils/path'
import CollectionMinView from './CollectionMinView/CollectionMinView'
import styles from './LastCollectionsDone.module.css'
export default function LastCollectionsDone ({
  user
}: {
  user: UserInterface
}) {
  const collectionsDone = user.collections_done
  if (!collectionsDone) {
    return null
  } else {
    if (collectionsDone.length === 0) {
      return null
    }

    return (
          <div className={styles.container}>
            <p>{'Last collections done:'}</p>
            <div className={styles.collectionsDoneContainer}>
                {collectionsDone.map((collectionID) => {
                  const res = returnObjectById(PATH.API.ALL_COLLECTIONS, collectionID.id)
                  const { data, status } = res
                  if (status === 'loading') { return <SquareLoader size={20} /> }
                  return (
                    <CollectionMinView key={collectionID.id} name={data.title} collections={data}/>
                  )
                })
                  .slice(0, 3)
                  }
              </div>
            </div>

    )
  }
}
