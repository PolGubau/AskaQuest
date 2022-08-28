import Collections from "src/components/QuestGallery/QuestGallery";
import PATH from "src/utils/path";
import AppLayout from "src/components/Layout/AppLayout";
import Nav from "src/components/Nav";

export default function HomePage({ allCollections }: any) {
  return (
    <>
      <Nav actualRoot="home" actualLink="quests" actualName="quests" />
      <AppLayout>
        <main>
          <section>
            <p>All Collections: </p>
            <Collections collections={allCollections} />
          </section>
        </main>
      </AppLayout>
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch(PATH.API.ALL_COLLECTIONS);
  const allCollections = await res.json();
  return { props: { allCollections } };
}
