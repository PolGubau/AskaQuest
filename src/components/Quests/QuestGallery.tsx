import EachQuest from "src/components/Quests/EachQuest/EachQuest";
import { Collection } from "src/interfaces/Collection";
import { offlineCollections } from "src/utils/offlineCollections";
import styles from "./QuestGallery.module.css";
export default function QuestGallery({ collections = [] }: any) {
  return (
    <>
      <section className={styles.section}>
        {collections &&
          !collections.error &&
          collections.map((collection: Collection) => (
            <EachQuest collection={collection} key={collection.ID} />
          ))}

        {collections.length === 0 && (
          <div className={styles.noInternetContainer}>
            <p>You don&apos;t have internet connection.</p>
            <p>While we try to reconnect you, try your offline quests!</p>
            <div className={styles.offlineCollections}>
              {offlineCollections.map((offlineCollection) => (
                <EachQuest
                  collection={offlineCollection}
                  key={offlineCollection.ID}
                />
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
