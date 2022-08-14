import { PATH } from "src/utils/consts";
import useSWR from "swr";




  const getData = async (url:string) => {
    const response = await fetch(url);
    return await response.json();
  }; 
  
  
  export default function returnUserById() {
    const userIdEndPoint = `${PATH.API_QUESTS}`;
  const { data: user } = useSWR(userIdEndPoint, getData);

    return user
  }
  
  
  
  
  
 