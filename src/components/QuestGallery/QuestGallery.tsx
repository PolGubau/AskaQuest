import EachQuest from 'src/components/QuestGallery/EachQuest/EachQuest'
import useLocalStorage from 'src/hooks/getUserFromLocalStorage'
import { CollectionInterface } from 'src/interfaces/Collection'
import UserInterface from 'src/interfaces/user'
import { offlineCollections } from 'src/utils/offlineData'
import styles from './QuestGallery.module.css'
export default function QuestGallery ({ collections = [] }: any) {
  const {
    con: { user }
  } = useLocalStorage()
  const userLoged = user as UserInterface
  return (
    <>
      <section className={styles.section}>
        {collections &&
          !collections.error &&
          collections.map((collection: CollectionInterface) => (
            <EachQuest
              collection={collection}
              key={collection.ID}
              userLoged={userLoged} extraInfo={{
                times: 0,
                id: 0,
                per: 0
              }}
            />
          ))}

        {collections.length === 0 && (
          <div className={styles.noInternetContainer}>
            <p>You don&apos;t have internet connection.</p>
            <p>While we try to reconnect you, try your offline quests!</p>
            <div className={styles.offlineCollections}>
              {offlineCollections.map((offlineCollection) => (
                <EachQuest
                  userLoged={undefined}
                  collection={offlineCollection}
                  key={offlineCollection.ID} extraInfo={{
                    times: 0,
                    id: 0,
                    per: 0
                  }} />
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  )
}
