import React from 'react'
import SquareLoader from 'src/components/loaders/SquaresLoader/SquareLoader'
import EachQuest from 'src/components/QuestGallery/EachQuest/EachQuest'
import UserInterface from 'src/interfaces/user'
import returnObjectById from 'src/services/returnObjectById'
import PATH from 'src/utils/path'
import styles from './LastCollectionsDoneToGrid.module.css'
export default function LastCollectionsDoneToGrid ({
  collections, you = false, userLoged
}:
{collections: any, you: boolean, userLoged: UserInterface}) {
  if (typeof collections === 'string') {
    collections = JSON.parse(collections)
  }
  if (!collections || collections.length === 0) {
    return (
          <p>{you ? 'Complete a collection to save them here! ' : `${userLoged.userName} has not done any collection yet: `}</p>

    )
  }

  console.log(collections)
  return (
  <div className={styles.container}>
    <p>{you ? 'Your most done collections: ' : `${userLoged.userName}'s most done collections: `}</p>
    <div className={styles.containerCollection}>

      {collections.map((collectionID: {id: number, times: number, per: number }, index: number) => {
        const res = returnObjectById(PATH.API.ALL_COLLECTIONS, collectionID.id)
        if (res.status === 'loading') { return <SquareLoader size={20} key={`${collectionID.id}-loading-${index}`} /> }
        return (<><EachQuest key={`${collectionID.id}-charged-${index}`} collection={res.data} userLoged={userLoged} extraInfo={collectionID} /></>)
      })}

      </div>
    </div>

  )
}
