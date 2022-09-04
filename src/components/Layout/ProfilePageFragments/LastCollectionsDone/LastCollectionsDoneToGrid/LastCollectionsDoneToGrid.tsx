import React from 'react'
import SquareLoader from 'src/components/loaders/SquaresLoader/SquareLoader'
import EachQuest from 'src/components/QuestGallery/EachQuest/EachQuest'
import UserInterface from 'src/interfaces/user'
import returnObjectById from 'src/services/returnObjectById'
import PATH from 'src/utils/path'
import styles from './LastCollectionsDoneToGrid.module.css'
export default function LastCollectionsDoneToGrid ({
  collections, you, userLoged
}:
{collections: any, you: boolean, userLoged: UserInterface}) {
  if (!collections || JSON.parse(collections).length === 0) {
    return <p>This user has not done any collection...</p>
  }

  return (
  <div className={styles.container}>
    <p>{you ? 'Your most done collections: ' : `${userLoged.userName}'s most done collections: `}</p>
    <div className={styles.containerCollection}>

      {JSON.parse(collections).map((collectionID: {id: number, times: number, per: number }, index: number) => {
        const res = returnObjectById(PATH.API.ALL_COLLECTIONS, collectionID.id)
        if (res.status === 'loading') { return <SquareLoader size={20} key={`${collectionID.id}-loading-${index}`} /> }
        return (<><EachQuest key={collectionID.id} collection={res.data} userLoged={userLoged} extraInfo={collectionID} /></>)
      })}

      </div>
    </div>

  )
}
