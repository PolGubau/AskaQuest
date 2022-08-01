import Head from "next/head";
import Collections from "src/components/Collections/Collections";
import { PATH } from "src/utils/consts";
import AppLayout from "src/components/AppLayout";
import Nav from "src/components/Nav";
import Logo from "src/components/Logo/Logo";
import useUserSession from "src/hooks/useUserSession";
import { useRouter } from "next/router";
import useSessionStorage from "src/hooks/useSessionStorage";
import { Context } from "vm";
import { getSession } from "next-auth/react";

export default function HomePage({ responseCollection }: any) {
  const router = useRouter();
  const { data, status } = useSessionStorage();

  console.log(data);

  return (
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
            <p>New Collections: </p>
            <Collections allCollections={responseCollection} />
          </section>
        </main>
      </AppLayout>
    </>
  );
}
export async function getServerSideProps(context: Context) {
  const res = await fetch(`${PATH.API}/collections`);
  const trendyCollections = await res.json();
  
  const sessionRRSS = await getSession(context); //si inicia sesion con RRSS
  const sessionLocalSession = sessionStorage.getItem("user"); // si inicia sesion con
  
  
  if (!sessionRRSS && !sessionLocalSession) {
    // si no inicia session con RRSS ni cuenta
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const user = sessionLocalSession ? sessionLocalSession : sessionRRSS;
  return { props: { trendyCollections, user } };
}
