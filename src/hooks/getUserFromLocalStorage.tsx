import { useEffect, useState } from "react";
import UserInterface from "src/interfaces/User";

export default function getUserFromLocalStorage(toSearch: string) {
  interface getUserFromLocalStorageInterface {
    status: number;
    user: UserInterface | undefined;
  }
  const [con, setCon] = useState<getUserFromLocalStorageInterface>({
    status: 0,
    user: undefined,
  });

  useEffect(() => {
    const takingUser = localStorage.getItem(toSearch);

    if (!takingUser) {
      setCon({ status: -1, user: undefined });
      return;
    }

    const userRaw = JSON.parse(takingUser);

    const liked = JSON.parse(userRaw.liked);
    const followers = JSON.parse(userRaw.followers);
    const following = JSON.parse(userRaw.following);

    const user: UserInterface = {
      ...userRaw,
      followers,
      following,
      liked,
    };

    setCon({ status: 1, user });
  }, []);

  return { con };
}
