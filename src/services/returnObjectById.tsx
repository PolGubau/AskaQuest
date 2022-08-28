import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function returnObjectById(
  endPoint: string,
  ID: string | number
) {
  const { data, error } = useSWR(`${endPoint}/${ID}`, fetcher);

  if (!data) return { data, status: "loading" };
  return { data, status: error ? "error" : "success" };
}
