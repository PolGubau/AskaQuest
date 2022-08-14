// user
import { PATH } from "src/utils/consts";
import AppLayout from "src/components/Layout/AppLayout";
import QuestGallery from "src/components/Quests/QuestGallery";
import Nav from "src/components/Nav";
import Image from "next/image";
import styles from "./profile.module.css";
import AddNewButton from "src/components/Buttons/AddNew/AddNewButton";
import { useRouter } from "next/router";
import TimeAgo from "timeago-react";

export default function userPage({ user, collectionsByUser }) {
  const router = useRouter();
  const { ID, userName, since, avatar, followers, following, date_creation } =
    user;

  return (
    <>
      <Nav
        actualName={`${userName}'s profile`}
        actualLink={"profile/" + userName}
      />

      <AppLayout>
        <main>
          <header className={styles.header}>
            <div>
              <h1 className={styles.heading1}>{userName}</h1>

              {followers ? (
                <>
                  <p>Some of {userName}'s followers:</p>

                  <div className={styles.followersContainer}>
                    {followers.map((follower) => (
                      <div
                        className={styles.followerContainer}
                        key={follower}
                        onClick={() => router.push(`${PATH.USER}/${follower}`)}
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
              )}
              {date_creation && (
                <p>
                  {`Here since `}
                  <TimeAgo datetime={date_creation} locale="es.ts" />
                  {`.`}
                </p>
              )}
            </div>
            <div>
              <Image
                className={styles.avatar}
                alt={`${userName}&apos;s avatar`}
                src={avatar || `https://api.multiavatar.com/${userName}.svg`}
                width={200}
                height={200}
              />
            </div>
          </header>
          <section>
            {collectionsByUser.length === 0 ? (
              <p>This user has not created anything 😥</p>
            ) : (
              <QuestGallery allCollections={collectionsByUser} />
            )}
            <AddNewButton />
          </section>
        </main>
      </AppLayout>
    </>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;

  const userRes = await fetch(`${PATH.API}/users/userName/${id}`);
  const user = await userRes.json();

  const collectionsRes = await fetch(`${PATH.API}/collections/userName/${id}`);
  const collectionsByUser = await collectionsRes.json();

  return { props: { user, collectionsByUser } };
}
