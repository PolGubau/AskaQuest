import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { CollectionInterface } from "src/interfaces/Collection";
import { handleLike } from "src/services/handleLike/handleLike";
import styles from "./LikesQuest.module.css";
import getUserFromLocalStorage from "src/hooks/getUserFromLocalStorage";
import UserInterface from "src/interfaces/User";

export default function LikesQuest({
  collection,
}: {
  collection: CollectionInterface;
}) {
  const [likes, setLikes] = useState(collection.likes || 0);
  const [liked, setLiked] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);

  // we want a useEffect that refresh the user Loged every time the component is rendered
  const { con } = getUserFromLocalStorage("user");
  const userLoged: UserInterface | undefined = con.user;

  // useEffect that checks if the user liked before the quest or not
  useEffect(() => {
    if (userLoged !== undefined) {
      if (!collection.ID) return console.log("No collection ID");
      if (!userLoged.liked) return console.log("No likes yet");

      setLoadingUser(true);

      if (userLoged.liked.includes(collection.ID)) {
        setLiked(true);
      } else {
        setLiked(false);
      }
      setLoadingUser(false);
    }
  }, []);

  const handleLikeCall = () => {
    if (userLoged && collection) {
      handleLike(userLoged, collection, setLiked, setLikes);
    }
  };
  return (
    <div className={styles.likes}>
      {loadingUser ? (
        <div className={styles.loading}>Loading...</div>
      ) : (
        <>
          {likes > 0 && <p>{likes}</p>}
          <div onClick={handleLikeCall}>
            {liked ? (
              <AiFillHeart size={25} color={"red"} />
            ) : (
              <AiOutlineHeart size={25} color={"red"} />
            )}
          </div>
        </>
      )}
    </div>
  );
}
