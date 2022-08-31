import styles from "./EachQuest.module.css";
import TimeAgo from "timeago-react";
import UserHeader from "src/components/UserHeader/UserHeader";
import returnObjectById from "src/services/returnObjectById";
import StartButton from "src/components/Buttons/StartButton/StartButton";
import { useRouter } from "next/router";
import UserHeaderLoading from "src/components/UserHeader/UserHeaderLoading";
import { AiOutlineCalendar } from "react-icons/ai";
import { CollectionInterface } from "src/interfaces/Collection";
import LikesQuest from "./LikesQuest/LikesQuest";
import UserInterface from "src/interfaces/User";
import PATH from "src/utils/path";
import { useEffect } from "react";

//
export default function EachQuest({
  collection,
  userLoged,
}: {
  collection: CollectionInterface;
  userLoged: UserInterface | undefined;
}) {
  const router = useRouter();

  const {
    ID,
    title,
    creator_id: creatorId,
    date_creation: dateCreation,
    likes = 0,
    tags,
  } = collection;

  const tagsArray = tags ? JSON.parse(tags) : [];
  const user = returnObjectById(PATH.API.USER_BY_ID, creatorId);
  const { data, status } = user;

  return (
    <>
      <section className={styles.section}>
        <div className={styles.header}>
          {status === "success" ? (
            <UserHeader
              name={data.userName}
              image={`https://api.multiavatar.com/${data.userName}.svg`}
            />
          ) : (
            <UserHeaderLoading />
          )}
          <LikesQuest collection={collection} />
        </div>
        <div>
          <h3 className={styles.title}>{title}</h3>

          <p>
            <span>
              <AiOutlineCalendar />
              {"Created "}
              {dateCreation && (
                <TimeAgo datetime={dateCreation} locale="es.ts" />
              )}
            </span>
          </p>
          <div className={styles.tags}>
            {tags &&
              tagsArray.map((tag: string, index: string) => (
                <span className={styles.tag} key={index}>
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
