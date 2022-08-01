import Head from "next/head";
import Collections from "src/components/Collections/Collections";
import { PATH } from "src/utils/consts";
import AppLayout from "src/components/AppLayout";
import Nav from "src/components/Nav";
import Logo from "src/components/Logo/Logo";
import { useSession, signIn } from "next-auth/react";

export default function HomePage({ trendyCollections }: any) {
  const { data: session } = useSession();
  
  
return(
<>
  <Nav actualRoot="home" />
        <AppLayout>
          <Head>
            <title>Home / AskaQuest </title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Logo />
          <main>
            <section>
              {!session && <>
                You can <button onClick={() => signIn()}>Sign in</button>
              </>
              }
              
              
              <p>New Collections: </p>
              <Collections allCollections={trendyCollections} />
            </section>
          </main>
        </AppLayout>
      </>
    );
  }
  

export async function getServerSideProps(context: object) {
  const res = await fetch(`${PATH.API}/collections`);
  const trendyCollections = await res.json();

  // si no inicia session con RRSS ni cuenta
  // return {
  //   redirect: {
  //     destination: "/login",
  //     permanent: false,
  //   },
  // };
  return { props: { trendyCollections } };
}
