import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import SkeletonProfile from "./SkeletonProfile";
import "react-loading-skeleton/dist/skeleton.css";
import usePascalCase from "src/hooks/usePascalCase";
import { PATH } from "src/utils/consts";
import styles from "./ProfileNav.module.css";
import { backgroundSmooth } from "src/styles/theme";
import useSessionStorage from "src/hooks/useSessionStorage";
import { signOut } from "next-auth/react";

//
export default function ProfileNav() {
  const router = useRouter();

  const { data, status } = useSessionStorage();
  const { ID, date_creation, userName, password } = data;

  const PascalName = usePascalCase(userName);

  switch (status) {
    case -1:
      router.push(PATH.SIGN_IN);

    case 0:
      return (
        <div className={styles.profile}>
          <SkeletonProfile />
        </div>
      );
    case 1:
      if (userName) {
        return (
          <Link href={`/profile/${userName}`}>
            <a>
              <div className={styles.profileLink} style={{ backgroundSmooth }}>
                <div className={styles.nameProfile}>
                  <p>
                    <b>{userName}</b>
                  </p>
                  <p>
                    <small>Your Profile</small>
                  </p>
                </div>
                <button onClick={() => signOut()}>SignOut</button>
                {/* <Image
                  src={`${image}`}
                  alt={userName}
                  width={49}
                  height={49}
                  className={styles.avatar}
                /> */}
              </div>
            </a>
          </Link>
        );
      } else {
        return "";
      }
  }
}
