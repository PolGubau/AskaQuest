import UserInterface from "src/interfaces/User";
import { notificacionTop } from "src/utils/notifications";

export const updateUser = (endpoint: string, userUpdated: UserInterface) => {
  fetch(`${endpoint}/${userUpdated.ID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userName: userUpdated.userName,
      email: userUpdated.email,
      password: userUpdated.password,
      followers: userUpdated.followers,
      following: userUpdated.following,
      collections_done: userUpdated.collections_done,
      role: userUpdated.role,
      image: userUpdated.image,
      liked: userUpdated.liked,
      ID: userUpdated.ID,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      const { rowCount } = data;
      if (rowCount > 0) {
        notificacionTop("success", "You liked this quest!");
      }
    })
    .catch((err) => console.log(err));
};
