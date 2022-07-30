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
import useUserSession from "src/hooks/useUserSession";

//
export default function ProfileNav() {
  const router = useRouter();
  const {
    user: { name, image },
    status,
  } = useUserSession();

  const PascalName = usePascalCase(name);

  switch (status) {
    case "unauthorized":
      router.push(PATH.SIGN_IN);
      
    case "loading":
      return (
        <div className={styles.profile}>
          <SkeletonProfile />
        </div>
      );
    case "authenticated":
      if (name) {
        return (
          <Link href={`${"/profile/" + name}`}>
            <a>
              <div className={styles.profileLink} style={{ backgroundSmooth }}>
                <div className={styles.nameProfile}>
                  <p>
                    <b>{PascalName}</b>
                  </p>
                  <p>
                    <small>Your Profile</small>
                  </p>
                </div>
                <Image
                  src={`${image}`}
                  alt={name}
                  width={49}
                  height={49}
                  className={styles.avatar}
                />
              </div>
            </a>
          </Link>
        );
      } else {
        return "";
      }
  }
}
