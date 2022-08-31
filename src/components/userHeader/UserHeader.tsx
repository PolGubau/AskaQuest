import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./userHeader.module.css";
import useLocalStorage from "src/hooks/getUserFromLocalStorage";
import PATH from "src/utils/path";
import UserInterface from "src/interfaces/User";

export default async function UserHeader({
  id = "",
  you = false,
  size = 40,
  name = "Anonymous",
  image = "https://api.multiavatar.com/Anonymous.svg",
}: {
  id: string;
  you: boolean;
  size: number;
  name: string;
  image: string;
}) {
  if (you) {
    const {
      con: { data },
    }: any = useLocalStorage("user");
    name = data?.userName;
    image = data?.image;
  }

  if (id) {
    const [userWithID, setUserWithID] = useState<UserInterface | undefined>(
      undefined
    );
    const getUserByItsID = async () => {
      const response = await fetch(`${PATH.API.USER_BY_ID}/${id}`).then(
        (response) => response.json()
      );

      // update the state
      setUserWithID(response);
    };
    useEffect(() => {
      try {
        getUserByItsID();
      } catch (error) {
        console.log(error);
      }
    }, []);

    if (userWithID) {
      name = userWithID.userName;
      image = userWithID.image || `https://api.multiavatar.com/${name}.svg`;
    } else {
      name = "Loading";
      image = `https://api.multiavatar.com/loading.svg`;
    }
  }
  return (
    <>
      <header className={styles.container}>
        <Link href={`/profile/${name}`}>
          <a className={styles.creator} style={{ height: size }}>
            <Image
              className={styles.creatorImage}
              src={
                image ||
                `https://api.multiavatar.com/${name}.svg` ||
                `https://api.multiavatar.com/Annonymous.svg`
              }
              alt="Creator avatar"
              width={size - 10}
              height={size - 10}
            />
            <span className={styles.creatorUserName}>
              {name || "Loading..."}
            </span>
          </a>
        </Link>
      </header>
    </>
  );
}
