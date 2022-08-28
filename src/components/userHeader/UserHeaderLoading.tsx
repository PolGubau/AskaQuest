import styles from './userHeader.module.css'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function UserHeaderLoading() {
  return (
    <>
      <header className={styles.container}>
        <div className={styles.creator}>
          <span className={styles.creatorUserName}>
            <Skeleton className={styles.creatorImage} circle />
          </span>
          <Skeleton className={styles.userName} />
        </div>
        
      </header>
    </>
  )
}
