import Head from "next/head";
import Collections from "src/componen/Collections/Collections";
import AppLayout from "src/components/Layout/AppLayout";
import Nav from "src/components/Nav";

export default function collections({ responseCollection }) {
  const allCollections = responseCollection.message;
  const success = responseCollection.success;
  return (
    <>
      <Nav path={["collections"]} />
      <AppLayout>
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
  const res = await fetch(`${PATH.API}/colections`);

  const responseCollection = await res.json();
  return { props: { responseCollection } };
}
