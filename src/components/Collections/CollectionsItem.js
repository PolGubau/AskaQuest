import { colors } from "src/styles/theme";
import styles from "./CollectionsItem.module.css";
import { FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/router";
import { PATH } from "src/utils/consts";

//
export default function CollectionsItem({ collection }) {
  const router = useRouter();
  const { ID, title, creator_id, date_creation, likes, tags } = collection;
  let date = new Date(date_creation).toLocaleString("es-ES");

  return (
    <>
      <section className={styles.section}>
        <div>
          <h3 className={styles.title}>{title}</h3>
          <p>
            This collection has <span>{likes} likes!</span>
          </p>
          <p>
            Created at <span>{date}</span>
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
        <div
          className={styles.startButton}
          onClick={() => {
            router.push("/Collection/[id]", `/Collection/${ID}`);
          }}
        >
          <p className={styles.startButtonText}>Start</p> <FaArrowRight />
        </div>
      </section>
    </>
  );
}
