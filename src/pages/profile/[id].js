// user
import { PATH } from "src/utils/consts";
import AppLayout from "src/components/AppLayout";
import Head from "next/head";
import Collections from "src/components/Collections/Collections";
import Nav from "src/components/Nav";
import usePascalCase from "src/hooks/usePascalCase";
import Image from "next/image";

export default function userPage({ user, collectionsMatched }) {
  let { userName, since, avatar } = user;

  // using usePascalCase to make the userName pascalCase

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
              <h1>{userName}</h1>
              <p>Here since {since}</p>
            </div>
            <div>
              <Image
                className="avatar"
                alt={`${userName}&apos;s avatar`}
                src={
                  avatar ||
                  `https://api.multiavatar.com/askaquest.png
`
                }
                width={200}
                height={200}
              />
            </div>
          </header>
          <section>
            <Collections allCollections={collectionsMatched} />
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

  return { props: { user } };
}
