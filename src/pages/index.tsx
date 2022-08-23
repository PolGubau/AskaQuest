import BodyComponent from "src/components/BodyComponent/BodyComponent";
import AppLayout from "src/components/Layout/AppLayout";
import Nav from "src/components/Nav";
import { Collection } from "src/interfaces/Collection";
import PATH from "src/utils/consts";

export default function HomePage({
  collections,
}: {
  collections: Collection[];
}) {
  if (!collections) collections = [];
  return (
    <>
      <Nav />
      <AppLayout>
        <main className="main">
          <BodyComponent collections={collections} />
        </main>
      </AppLayout>
    </>
  );
}

export async function getStaticProps() {
  const collections = await fetch(PATH.API.ALL_COLLECTIONS).then((res) =>
    res.json()
  );
  return { props: { collections } };
}
