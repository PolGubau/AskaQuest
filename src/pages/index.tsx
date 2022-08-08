import Head from "next/head";
import Collections from "src/components/Collections/Collections";
import { PATH } from "src/utils/consts";
import AppLayout from "src/components/Layout/AppLayout";
import Nav from "src/components/Nav";
import Logo from "src/components/Logo/Logo";
import Swal from "sweetalert2";
import useSessionStorage from "src/hooks/useSessionStorage";
import { useRouter } from "next/router";
import SignInPannel from "src/components/Pannel/SignInPannel";
import Intro from "src/components/Layout/Intro";
import WellcomeBack from "src/components/Pannel/WellcomeBack";

export default function HomePage({ trendyCollections }: any) {
  const router = useRouter();
  const {con}= useSessionStorage();
  const  {status, data } = con;

  // const alert = Swal.fire(
  //   "Hi!",
  //   "This is an open beta, you can suggest changes to our developers! Thank you.",
  //   "info"
  // );
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
            <Intro>
              <Logo />
              {status !== 1 && <SignInPannel />}
              {status === 1 && <WellcomeBack user={data} />}
            </Intro>

            <p>New Collections: </p>
            <Collections allCollections={trendyCollections} />
          </section>
        </main>
      </AppLayout>
    </>
  );
}

export async function getServerSideProps() {
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
