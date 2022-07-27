import Head from "next/head";
import Collections from "src/components/Collections/Collections";
import { PATH } from "src/utils/consts";
import AppLayout from "src/components/AppLayout";
import Nav from "src/components/Nav";
import styles from "src/pages/home/home.module.css";

import useRedirect from "src/hooks/useRedirect";


export default function HomePage({ responseCollection }:any) {
  
  useRedirect(PATH.HOME);
  
  
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
            {/* <Collections allCollections={responseCollection} /> */}
          </section>
        </main>
      </AppLayout>

    </>
  );
}
export async function getServerSideProps() {
  const res = await fetch(`${PATH.API}/colections`);

  const responseCollection = await res.json();
  return { props: { responseCollection } };
}
