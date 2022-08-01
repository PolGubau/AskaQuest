import CollectionsItem from "./CollectionsItem";
import Link from "next/link";

export default function Collections({
  allCollections = [
    {
      ID: 0,
      title: "No conection",
      creator_id: "1",
      date_creation: "2022-07-23 10:06:32.953831",
      likes: 0,
      tags: '["internet","connection"]',
    },
  ],
}) {
  return (
    <>
      <section>
        {allCollections.map((collection) => (
          <Link
            key={collection.ID}
            href={{
              pathname: "/collection/[id]",
              query: { id: collection._id },
            }}
          >
            <a>
              <CollectionsItem collection={collection} />
            </a>
          </Link>
        ))}
      </section>

      <style jsx>{`
        section {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(230px, 2fr));
          margin-top: 10px;

          grid-gap: 15px;
        }
      `}</style>
    </>
  );
}
