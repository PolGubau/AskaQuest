import Collections from 'src/components/Quests/QuestGallery';
import { PATH } from "src/utils/consts";
import AppLayout from "src/components/Layout/AppLayout";
import Nav from "src/components/Nav";
import useSessionStorage from "src/hooks/useSessionStorage";

export default function HomePage({ allCollections }: any) {
  const {con}= useSessionStorage();


  return (
    <>
      <Nav actualRoot="home" actualLink='quests' actualName='quests'/>
      <AppLayout>
        
        <main>
          <section>
            <p>All Collections: </p>
            <Collections allCollections={allCollections} />
          </section>
        </main>
      </AppLayout>
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${PATH.API}/collections`);
  const allCollections = await res.json();
  return { props: { allCollections } };
}
