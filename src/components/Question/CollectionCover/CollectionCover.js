import styles from './CollectionCover.module.css'
import { FaArrowRight } from 'react-icons/fa'
import UserHeader from 'src/components/UserHeader/UserHeader'
export default function CollectionCover({
  id,
  userId,
  userName = 'unknow',
  userImage = 'https://api.multiavatar.com/unknow.svg',
  title,
  tags,
  likes,
  questions,
  setStarted
}) {
  const start = () => {
    setStarted(true)
  }
  return (
    <>
      <article key={id}>
        <section className={styles.container}>
          <UserHeader name={userName} image={userImage} />

          <div className={styles.content}>
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.tags}>
              <span>Tags: </span>
              {tags.map((tag, index) => (
                <span key={index} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
            <p className={styles.likesP}>This quest has {likes} likes.</p>
            <button onClick={start} className={styles.startButton}>
              <span className={styles.startButtonText}> Start</span>
              <FaArrowRight />
            </button>
          </div>
        </section>
      </article>
    </>
  )
}
