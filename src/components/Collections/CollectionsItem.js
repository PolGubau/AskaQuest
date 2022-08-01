import { colors } from "src/styles/theme";
import styles from "./CollectionsItem.module.css";
import { FaArrowRight } from "react-icons/fa";

export default function CollectionsItem({ collection }) {
  const { ID, title, creator_id, date_creation, likes, tags } = collection;

  return (
    <>
      <section className={styles.section}>
        <div>
          <h3 className={styles.title}>{title}</h3>
          <p>
            This collection has <span>{likes} likes!</span>
          </p>

          <div className={styles.tags}>
            {tags.map((tag, index) => (
              <span
                className={styles.tag}
                key={index}
                style={{
                  color: colors.white,
                  backgroundColor: colors.primary,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className={styles.startButton} onClick>
          <p className={styles.startButtonText}>Start</p> <FaArrowRight />
        </div>
      </section>
    </>
  );
}
