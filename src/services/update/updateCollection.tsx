import { CollectionInterface } from "src/interfaces/Collection";
import { bigAlert } from "src/utils/notifications";

export const updateCollection = (
  endpoint: string,
  newCollection: CollectionInterface
) => {
  fetch(`${endpoint}/${newCollection.ID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: newCollection.title,
      tags: newCollection.tags,
      likes: newCollection.likes,
      ID: newCollection.ID,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      const { rowCount } = data;
      if (rowCount > 0) {
        bigAlert("Nice!", "Like added to quest!", "success");
      }
    })
    .catch((err) => console.log(err));
};
