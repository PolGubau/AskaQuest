// user
import { PATH } from "src/utils/consts";
import AppLayout from "src/components/Layout/AppLayout";
import QuestGallery from "src/components/Quests/QuestGallery";
import Nav from "src/components/Nav";
import Image from "next/image";
import styles from "./profile.module.css";
import { useRouter } from "next/router";
import { User } from "src/interfaces/User";
import { Collection } from "src/interfaces/Collection";
import { GetServerSidePropsContext } from "next";
import { takeUserLoged } from "src/services/takeUserLoged";
import TimeAgo from "timeago-react";
import Link from "next/link";
import AddNewButton from "src/components/Buttons/AddNew/AddNewButton";
import { handleFollow } from "src/services/handleFollow";
import { useState } from "react";
import ButtonWithIcon from "src/components/Buttons/ButtonWithIcon/ButtonWithIcon";
export default function userPage({
  user,
  collectionsByUser,
}: {
  userName: string;
  user: User;
  collectionsByUser: Collection[];
}) {
  const router = useRouter();
  const [followingProfile, setFollowingProfile] = useState(false);
  const { ID, userName, image, followers, date_creation: dateCreation } = user;

  //
  console.log('Followers received from frontend': followers);

  // const followers = followersStringlified
  //   ? JSON.parse(followersStringlified)
  //   : [];
  const userLoged = takeUserLoged();

  const handleFollowCall = async () => {
    if (userLoged) {
      setFollowingProfile(await handleFollow(userLoged, user));
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
              {userLoged && ID !== userLoged.ID && (
                <div className={styles.followersContainer}>
                  <div onClick={handleFollowCall}>
                    {followingProfile ? (
                      <ButtonWithIcon icon={"user"} text={"Following"} />
                    ) : (
                      <ButtonWithIcon icon={"user"} text={"Follow"} />
                    )}
                  </div>
                  {/* {followers.length > 0 ? (
                    <>
                      <p>{`Some of ${userName}'s followers:`}</p>

                      <div className={styles.followersContainer}>
                        {followers.map((follower: any) => (
                          <div
                            className={styles.followerContainer}
                            key={follower}
                            onClick={() =>
                              router.push(`${PATH.USER}/${follower}`)
                            }
                          >
                            <Image
                              src={`https://api.multiavatar.com/${follower}.svg`}
                              alt={follower}
                              width={25}
                              height={25}
                              className={styles.followerAvatar}
                            />
                            <p className={styles.followerName}>{follower}</p>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    `Be the first one to follow ${userName}!`
                  )} */}
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
            {ID === userLoged.ID && (
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
