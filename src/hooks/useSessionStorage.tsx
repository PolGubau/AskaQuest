import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function useSessionStorage() {
  const router = useRouter();
  const [con, setCon] = useState({ status: 0, data: {} });

  useEffect(() => {
    const takingUser = sessionStorage.getItem("user");

    if (takingUser) {
      const user = JSON.parse(takingUser);

      setCon({ status: 1, data: user });
    } else {
      setCon({ status: -1, data: {error: 'User not given'} });
    }
  }, [router]);      

  return { con };
}
