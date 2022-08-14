import { colors } from "src/styles/theme";
import styles from "./EachQuest.module.css";
import TimeAgo from "timeago-react";
import UserHeader from "src/components/userHeader/UserHeader";
import returnUserById from "src/services/returnUserById";
import StartButton from "src/components/Buttons/StartButton/StartButton";
import { useRouter } from "next/router";
import UserHeaderLoading from "src/components/userHeader/UserHeaderLoading";
export default function EachQuest({ collection }) {
  const router = useRouter();

  const { ID, title, creator_id, date_creation, likes, tags } = collection;

  const user = returnUserById(creator_id);
  return (
    <>
      <section className={styles.section}>
        {user ? (
          <UserHeader
            username={user.userName || "Anonymous"}
            userimage={`https://api.multiavatar.com/${creator_id}.svg`}
            likes={likes || null}
          />
        ) : (
          <UserHeaderLoading />
        )}

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
        <div onClick={() => router.push("/Quest/[id]", `/Quest/${ID}`)}>
          <StartButton />
        </div>
      </section>
    </>
  );
}
