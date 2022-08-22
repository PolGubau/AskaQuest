import { useEffect, useState } from "react";

export default function useLocalStorage(toSearch: string) {
  const [con, setCon] = useState({ status: 0, data: {} });

  useEffect(() => {
    const takingData = localStorage.getItem(toSearch);
    if (takingData) {
      const dataRes = JSON.parse(takingData);

      setCon({ status: 1, data: dataRes });
    } else {
      setCon({ status: -1, data: { error: `${toSearch} not given` } });
    }
  }, []);

  return { con };
}
