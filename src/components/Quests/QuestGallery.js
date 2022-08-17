import EachQuest from 'src/components/Quests/EachQuest/EachQuest'

export default function QuestGallery({
  allCollections = [
    {
      ID: 0,
      title: 'No conection',
      creator_id: undefined,
      date_creation: '2022-07-23 10:06:32.953831',
      likes: 0,
      tags: ['internet', 'connection']
    }
  ]
}) {
  return (
    <>
      <section>
        {allCollections &&
          !allCollections.error &&
          allCollections.map((collection) => (
            <EachQuest collection={collection} key={collection.ID} />
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
  )
}
