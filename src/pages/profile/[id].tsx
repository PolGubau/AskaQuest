// user
import PATH from "src/utils/path";
import AppLayout from "src/components/Layout/AppLayout";
import QuestGallery from "src/components/QuestGallery/QuestGallery";
import Nav from "src/components/Nav";
import Image from "next/image";
import styles from "./profile.module.css";
import { useRouter } from "next/router";
import UserInterface from "src/interfaces/User";
import { CollectionInterface } from "src/interfaces/Collection";
import { GetServerSidePropsContext } from "next";
import TimeAgo from "timeago-react";
import Link from "next/link";
import AddNewButton from "src/components/Buttons/AddNew/AddNewButton";
import { handleFollow } from "src/services/handleFollow";
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactFragment,
  useEffect,
  useState,
} from "react";
import ButtonWithIcon from "src/components/Buttons/ButtonWithIcon/ButtonWithIcon";
import UserHeader from "src/components/UserHeader/UserHeader";
import getUserFromLocalStorage from "src/hooks/getUserFromLocalStorage";
import SquareLoader from "src/components/loaders/SquaresLoader/SquareLoader";
import UserHeaderLoading from "src/components/UserHeader/UserHeaderLoading";
import returnObjectById from "src/services/returnObjectById";

export default function userPage({
  user,
  collectionsByUser,
}: {
  userName: string;
  user: UserInterface;
  collectionsByUser: CollectionInterface[];
}) {
  let { ID, userName, image, followers, date_creation: dateCreation } = user;
  followers = JSON.parse(followers);

  const [userLoading, setUserLoading] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const [userLoged, setUserLoged] = useState<UserInterface | undefined>(
    undefined
  );
  const { con } = getUserFromLocalStorage("user");

  useEffect(() => {
    setUserLoading(true);
    if (con.status === 1) {
      setUserLoged(con.user);
      const isFollowed = userLoged?.following.find(
        (following: { ID: number }) => following.ID === Number(user.ID)
      );
      if (isFollowed) {
        setIsFollowed(true);
      }
      setUserLoading(false);
    }
  }, [con]);
  console.log("IsFollowed: ", isFollowed);

  const handleFollowCall = async () => {
    if (userLoged) {
      handleFollow(user, userLoged, isFollowed, setIsFollowed);
    }
  };

  return (
    <>
      <Nav
        actualName={`${userName}'s profile`}
        actualLink={"profile/" + userName}
      />

      <AppLayout>
        <main>
          <header className={styles.header}>
            <div className={styles.headerLeft}>
              <h1 className={styles.heading1}>{userName}</h1>
              {userLoading && <SquareLoader />}
              {userLoged && ID !== userLoged.ID && (
                <div className={styles.followersContainer}>
                  <div onClick={handleFollowCall}>
                    {isFollowed ? (
                      <ButtonWithIcon icon={"user"} text={"Following"} />
                    ) : (
                      <ButtonWithIcon icon={"user"} text={"Follow"} />
                    )}
                  </div>
                  {followers.length > 0 ? (
                    <>
                      <p>{`Some of ${userName}'s followers:`}</p>

                      <div className={styles.followersContainer}>
                        {followers
                          .map((followerID: string) => {
                            return (
                              <UserHeader
                                id={followerID || ""}
                                you={false}
                                size={40}
                                name={""}
                                image={""}
                              />
                            );
                          })
                          .slice(0, 3)}
                      </div>
                    </>
                  ) : (
                    `Be the first one to follow ${userName}!`
                  )}
                </div>
              )}
              {dateCreation && (
                <p>
                  {"Here since "}
                  <TimeAgo datetime={dateCreation} locale="es.ts" />
                  {"."}
                </p>
              )}
            </div>
            <div>
              <Image
                className={styles.avatar}
                alt={`${userName}&apos;s avatar`}
                src={image || `https://api.multiavatar.com/${userName}.svg`}
                width={200}
                height={200}
              />
            </div>
          </header>
          <section>
            {collectionsByUser.length === 0 ? (
              <p>This user has not created anything 😥</p>
            ) : (
              <QuestGallery collections={collectionsByUser} />
            )}
            {ID === userLoged?.ID && (
              <Link href={PATH.CREATE_QUEST}>
                <a>
                  <AddNewButton />
                </a>
              </Link>
            )}
          </section>
        </main>
      </AppLayout>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id: userName } = context.query;

  const userRes = await fetch(`${PATH.API.USER_BY_USERNAME}/${userName}`);
  const user = await userRes.json();

  const collectionsRes = await fetch(
    `${PATH.API.COLLECTION_BY_USERNAME}/${userName}`
  );
  const collectionsByUser = await collectionsRes.json();

  return { props: { user, collectionsByUser } };
}
