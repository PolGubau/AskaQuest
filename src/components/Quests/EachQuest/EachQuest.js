import { colors } from "src/styles/theme";
import styles from "./EachQuest.module.css";
import TimeAgo from "timeago-react";
import UserHeader from "src/components/userHeader/UserHeader";
import returnUserById from "src/services/returnUserById";
import StartButton from "src/components/Buttons/StartButton/StartButton";
import { useRouter } from "next/router";

//
export default function EachQuest({ collection }) {
  const {
    ID,
    title,
    creator_id: creatorid,
    date_creation,
    likes,
    tags,
  } = collection;
  const user = creatorid ? returnUserById(creatorid) : {};
  const router = useRouter();

  const handleClick = () => {
    router.push("/Quest/[id]", `/Quest/${ID}`);
  };
  return (
    <>
      <section className={styles.section}>
        <UserHeader
          username={user.userName || "Anonymous"}
          userimage={
            user.image || `https://api.multiavatar.com/${user.userName}.svg`
          }
          likes={likes || null}
        />
        <div>
          <h3 className={styles.title}>{title}</h3>

          <p>
            <span>
              {`Created `}
              <TimeAgo datetime={date_creation} locale="es.ts" />
            </span>
          </p>

          <div className={styles.tags}>
            {tags &&
              tags.map((tag, index) => (
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
        <div onClick={handleClick}>
          <StartButton />
        </div>
      </section>
    </>
  );
}
