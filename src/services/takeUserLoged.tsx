import useLocalStorage from "src/hooks/useLocalStorage";

export const takeUserLoged = () => {
  const { con }: any = useLocalStorage("user");
  if (!con) return "";
  return con.data;
};
