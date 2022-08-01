import { colors } from "src/styles/theme";
import { addOpacityToColor } from "src/styles/utils";
import styles from "./CollectionsItem.module.css";
export default function CollectionsItem({ collection }) {
  const { ID, title, creator_id, date_creation, likes, tags } = collection;

  return (
    <>
      <section
        className={styles.section}
        style={{
          backgroundColor: addOpacityToColor(colors.primary, 0.1),
        }}
      >
        <h3 className={styles.title}>{title}</h3>
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
      </section>
    </>
  );
}
