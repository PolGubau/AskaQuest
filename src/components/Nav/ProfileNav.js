import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import SkeletonProfile from "./SkeletonProfile";
import "react-loading-skeleton/dist/skeleton.css";
import { PATH } from "src/utils/consts";
import styles from "./ProfileNav.module.css";
import { backgroundSmooth } from "src/styles/theme";
import useSessionStorage from "src/hooks/useSessionStorage";

//
export default function ProfileNav() {
  const router = useRouter();

  const {
    con: { data, status },
  } = useSessionStorage();
  const { userName, avatar } = data;
  switch (status) {
    case 1:
      return (
        <Link href={`/profile/${userName}`}>
          <a>
            <div className={styles.profileLink} style={{ backgroundSmooth }}>
              <div className={styles.nameProfile}>
                <p className={styles.userName}>{userName}</p>
                <span>Your Profile</span>
              </div>
              <Image
                src={avatar || `https://api.multiavatar.com/${userName}.svg`}
                alt={userName}
                width={55}
                height={55}
                className={styles.avatar}
              />
            </div>
          </a>
        </Link>
      );
  }
  return (
    <div
      className={styles.profileLink}
      style={{ backgroundSmooth }}
      onClick={() => router.push(PATH.SIGN_IN)}
    >
      <div className={styles.nameProfile}>
        <p className={styles.userName}>Anonymous</p>
        <span>Click for Sign in</span>
      </div>
      <Image
        src={`https://api.multiavatar.com/a.svg`}
        alt={"Anonymous avatar"}
        width={55}
        height={55}
        className={styles.avatar}
      />
    </div>
  );
}
