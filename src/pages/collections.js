import Head from "next/head";
import Collections from "@c/Collections/Collections";
import { PATH } from "@s/consts";
import AppLayout from "@c/AppLayout";
import Nav from "@c/Nav";

export default function collections({ responseCollection }) {
  const allCollections = responseCollection.message;
  const success = responseCollection.success;
  return (
    <>
      <Nav path={["collections"]} />
      <AppLayout>
        <Head>
          <title>Collections / AskaQuest </title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <section>
            <p>All Collections: </p>
            <Collections allCollections={allCollections} success={success} />
          </section>
        </main>
      </AppLayout>
      <style jsx>{`
        nav {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          align-content: center;
          justify-content: space-between;
          align-items: center;
        }
        .profile {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          align-content: center;
          align-items: center;
        }
      `}</style>
    </>
  );
}
export async function getServerSideProps() {
  const res = await fetch(`${PATH}/api/colections`);

  const responseCollection = await res.json();
  return { props: { responseCollection } };
}
