import Head from "next/head";
import Collections from "src/components/Collections/Collections";
import { PATH } from "src/utils/consts";
import AppLayout from "src/components/AppLayout";
import Nav from "src/components/Nav";
export default function HomePage({ responseCollection }:any) {
  
  return (
    <>
      <Nav actualRoot="home" />
      <AppLayout>
        <Head>
          <title>Home / AskaQuest </title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <section>
            <h1>AskaQuest</h1>
          </section>
          <section>
            <p>New Collections: </p>
            <Collections allCollections={responseCollection} />
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
