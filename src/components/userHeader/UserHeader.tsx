import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./userHeader.module.css";
import useLocalStorage from "src/hooks/getUserFromLocalStorage";
import returnObjectById from "src/services/returnObjectById";
import PATH from "src/utils/path";

export default function UserHeader({
  id = "",
  you = false,
  size = 40,
  name = "Anonymous",
  image = "https://api.multiavatar.com/Anonymous.svg",
}) {
  if (you) {
    const {
      con: { data },
    }: any = useLocalStorage("user");
    name = data?.userName;
    image = data?.image;
  }

  if (id) {
    const user = returnObjectById(PATH.API.USER_BY_ID, id);
    const { data, status } = user;
    name = data.userName;
    image = data.image || `https://api.multiavatar.com/${name}.svg`;
  }
  return (
    <>
      <header className={styles.container}>
        <Link href={`/profile/${name}`}>
          <a className={styles.creator} style={{ height: size }}>
            <Image
              className={styles.creatorImage}
              src={image || `https://api.multiavatar.com/${name}.svg`}
              alt="Creator avatar"
              width={size - 10}
              height={size - 10}
            />
            <span className={styles.creatorUserName}>{name}</span>
          </a>
        </Link>
      </header>
    </>
  );
}
