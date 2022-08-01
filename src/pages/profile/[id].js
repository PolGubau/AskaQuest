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
  console.log(user);
  return (
    <>
      <Head>
        <title>{userName}&apos;s Profile / AskaQuest </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav
        actualName={`${userName}'s profile`}
        path={[]}
        actualLink={"profile/" + userName}
      />

      <AppLayout>
        <main>
          <header>
            <div>
              <h1 className={styles.heading1}>{userName}</h1>
              {followers ? (
                <p> Followed by {followers}</p>
              ) : (
                `Be the first one to follow ${userName}!`
              )}
              <p>Here since {date_creation}</p>
            </div>
            <div>
              <Image
                className="avatar"
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
      <style jsx>{`
        header {
          display: flex;
          justify-content: space-between;
          align-content: center;
          flex-wrap: wrap;
          flex-direction: row;
          align-items: center;
        }
        .avatar {
          border-radius: 50%;
          width: 100px;
        }
      `}</style>
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
