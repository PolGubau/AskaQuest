import { PATH } from "src/utils/consts";

export default async function returnUserById( creatorid:any ){
  fetch(`${PATH.API}/users/id/${creatorid}`)
    .then((response) => {
      return response.json();
    })
    // .then((data) => {
    //   console.log(data);
    // });
}
