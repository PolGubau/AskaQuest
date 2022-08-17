import Head from "next/head";
import BodyComponent from "src/components/BodyComponent/BodyComponent";
import AppLayout from "src/components/Layout/AppLayout";
import Nav from "src/components/Nav";
import { PATH } from "src/utils/consts";
export default function HomePage({trendyCollections}:any) {
  
  return (
    <>
        <Head>
          <title>Home / AskaQuest </title>
          <link rel="icon" href="/favicon.ico" />
        </Head>          
        <Nav actualRoot="home" />
        <AppLayout>
        <main className="main">
          <BodyComponent collections={trendyCollections}/>
        </main>
      </AppLayout>
    </>
  );
}

export async function getStaticprops() {
  const res = await fetch(`${PATH.API}/collections`);
  const trendyCollections = await res.json();
  return { props: { trendyCollections } };
}

