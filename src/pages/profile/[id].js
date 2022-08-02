// user
import { PATH } from "src/utils/consts";
import AppLayout from "src/components/AppLayout";
import Head from "next/head";
import Collections from "src/components/Collections/Collections";
import Nav from "src/components/Nav";
import Image from "next/image";
import styles from "./[id].module.css";
import AddNewButton from "src/components/Buttons/AddNewButton";

export default function userPage({ user, collectionsByUser }) {
  const { userName, since, avatar, followers, following, date_creation } = user;

  let date = new Date(date_creation).toLocaleString("es-ES");

  return (
    <>
      <Nav
        actualName={`${userName}'s profile`}
        path={[]}
        actualLink={"profile/" + userName}
      />

      <AppLayout>
        <main>
          <header className={styles.header}>
            <div>
              <h1 className={styles.heading1}>{userName}</h1>
              {followers ? (
                <p> Followed by {followers}</p>
              ) : (
                `Be the first one to follow ${userName}!`
              )}
              {date_creation && <p>Here since {date}</p>}
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
              <Collections allCollections={collectionsByUser} />
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
