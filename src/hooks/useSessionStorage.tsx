import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { PATH } from "src/utils/consts";

export default function useSessionStorage() {
  const router = useRouter();
  const [status, setStatus] = useState<number>(0);
  const [data, setData] = useState<object | string>({});

  useEffect(() => {
    const takingUser = sessionStorage.getItem("user");

    const jsonUser = takingUser;
    if (jsonUser) {
      const user = JSON.parse(jsonUser);
      setData(user);
      setStatus(1);
    } else {
      setStatus(-1);
      setData("No user found");
      router.replace(PATH.SIGN_IN);
    }
  }, [router,status,data]);
  return { data, status };
}
