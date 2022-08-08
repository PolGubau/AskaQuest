import AppLayout from "src/components/Layout/AppLayout";
import Button from "src/components/Button";
import Link from "next/link";
import { colors, fontSizes } from "src/styles/theme";
import { addOpacityToColor } from "src/styles/utils";
import styles from "./CollectionCover.module.css";
import { FaArrowRight } from "react-icons/fa";

import Image from "next/image";
export default function CollectionCover({
  id,
  userId,
  userName = "unknow",
  userImage = "https://api.multiavatar.com/unknow.svg",
  title,
  tags,
  likes,
  questions,
  setStarted,
}) {
  // we have a questions array, they are links, we want to send the first one when start button is pressed
  console.log(questions);
  const start = () => {
    setStarted(true);
  };
  return (
    <>
      <article key={id}>
        <AppLayout>
          <section className={styles.container}>
            <header className={styles.names}>
              <Link href={`/profile/${userName}`}>
                <a className={styles.creator}>
                  <Image
                    src={userImage}
                    alt="Creator avatar"
                    width={30}
                    height={30}
                  />
                  <small className={styles.creatorUserNameBy}>
                    By{" "}
                    <span className={styles.creatorUserName}>{userName}</span>
                  </small>
                </a>
              </Link>
            </header>
            <div className={styles.content}>
              <h3 className={styles.title}>{title}</h3>
              <div className={styles.tags}>
                <span>Tags: </span>
                {tags.map((tag, index) => (
                  <span key={index} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
              <p className={styles.likesP}>This quest has {likes} likes.</p>
              <button onClick={start} className={styles.startButton}>
                <span className={styles.startButtonText}> Start</span>
                <FaArrowRight />
              </button>
            </div>
          </section>
        </AppLayout>
      </article>
    </>
  );
}
