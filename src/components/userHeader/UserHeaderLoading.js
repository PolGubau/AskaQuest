import styles from "./userHeader.module.css";
import { AiFillHeart } from "react-icons/ai";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function UserHeaderLoading() {
  return (
    <>
      <header className={styles.names}>
        <div className={styles.creator}>
          <span className={styles.creatorUserName}>
            <Skeleton className={styles.creatorImage} circle />
          </span>
          <Skeleton className={styles.userName} />
        </div>
        <div className={styles.likes}>
            <Skeleton className={styles.likesNumber} />
          <AiFillHeart className={styles.likesIcon} color="red" />
        </div>
      </header>
    </>
  );
}
