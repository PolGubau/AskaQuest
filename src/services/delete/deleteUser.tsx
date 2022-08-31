export const deleteUser = (endpoint: string, userID: string | number) => {
  fetch(`${endpoint}/${userID}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("DELETED: ", data);
    })
    .catch((err) => console.log(err));
};
