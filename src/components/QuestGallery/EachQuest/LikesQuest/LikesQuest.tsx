import { useEffect, useState } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { CollectionInterface } from 'src/interfaces/Collection'
import { handleLike } from 'src/services/handleLike/handleLike'
import styles from './LikesQuest.module.css'
import getUserFromLocalStorage from 'src/hooks/getUserFromLocalStorage'
import UserInterface from 'src/interfaces/user'
import { bigAlert } from 'src/utils/notifications'
export default function LikesQuest ({
  collection
}: {
  collection: CollectionInterface
}) {
  const [likes, setLikes] = useState(collection.likes ?? 0)
  const [liked, setLiked] = useState(false)
  const [loadingUser, setLoadingUser] = useState(false)

  // we want a useEffect that refresh the user Loged every time the component is rendered
  const { con } = getUserFromLocalStorage()
  const userLoged: UserInterface | undefined = con.user

  // useEffect that checks if the user liked before the quest or not
  useEffect(() => {
    if (userLoged !== undefined) {
      if (!collection.ID) return console.log('No collection ID')
      if (!userLoged.liked) return console.log('No likes yet')

      setLoadingUser(true)

      if (userLoged.liked.includes(collection.ID)) {
        setLiked(true)
      } else {
        setLiked(false)
      }
      setLoadingUser(false)
    }
  }, [])

  const handleLikeCall = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    if (!userLoged) return bigAlert('Oupsss', 'You need to be signed in to like a Quest', 'warning')
    if ((userLoged) && collection) {
      handleLike(userLoged, collection, setLiked, setLikes)
    }
  }
  return (
    <div className={styles.likes}>
      {loadingUser
        ? (
        <div className={styles.loading}>Loading...</div>
          )
        : (
        <>
          <div onClick={handleLikeCall}>
            {liked
              ? (
              <div className={styles.likesContainer}>
                {likes > 0 && <p className={styles.likesNum}>{likes}</p>}
                <p className={styles.icon}>
                  <AiFillHeart size={25} color={'red'} />
                </p>
              </div>
                )
              : (
              <div className={styles.likesContainer}>
                {likes > 0 && <p className={styles.likesNum}>{likes}</p>}
                <p className={styles.icon}>
                  <AiOutlineHeart size={25} color={'red'} />
                </p>
              </div>
                )}
          </div>
        </>
          )}
    </div>
  )
}
