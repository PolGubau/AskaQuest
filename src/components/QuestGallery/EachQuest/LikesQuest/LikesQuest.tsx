import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { CollectionInterface } from "src/interfaces/Collection";
import UserInterface from "src/interfaces/User";
import { handleLike } from "src/services/handleLike/handleLike";
import styles from "./LikesQuest.module.css";

interface LikesQuestProps {
  userLoged: UserInterface | undefined;
  collection: CollectionInterface;
}

export default function LikesQuest({ userLoged, collection }: LikesQuestProps) {
  
  const [likes, setLikes] = useState(collection.likes || 0);
  const [liked, setLiked] = useState(false);
  
  const handleLikeCall = () => {
    if (userLoged && collection) {
      handleLike(userLoged, collection, setLiked, setLikes);
    }
  };

  // check if the user liked the quest
  useEffect(() => {
    if (userLoged?.liked && collection.ID) {
      const likedArray = userLoged.liked;
      console.log(likedArray);
      if (likedArray.includes(collection.ID)) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    }
  }, [userLoged, collection.ID]);
  console.log(collection.ID, likes);

  return (
    <div className={styles.likes}>
      {likes > 0 && <p>{likes}</p>}
      <div onClick={handleLikeCall}>
        {liked ? (
          <AiFillHeart size={25} color={"red"} />
        ) : (
          <AiOutlineHeart size={25} color={"red"} />
        )}
      </div>
    </div>
  );
}
