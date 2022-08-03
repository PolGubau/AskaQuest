import { useState, useEffect } from "react";

const DATE_UNITS = [
  ["years", 31536000],
  ["months", 2419200],
  ["days", 86400],
  ["hours", 3600],
  ["minutes", 60],
  ["seconds", 1],
  ["milisecons", 0.001],
];
const getDateDiffs = (timestamp) => {
  const now = Date.now();
  const elapsed = (timestamp - now) / 1000;

  for (const [unit, secondsInUnit] of DATE_UNITS) {
    if (Math.abs(elapsed) > secondsInUnit || unit === "second") {
      const value = Math.round(elapsed / secondsInUnit);
      return { value, unit };
    }
  }
};

export default function useTimeAgo(timestamp) {
  const [timeAgo, setTimeAgo] = useState(() => getDateDiffs(timestamp));

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeAgo = getDateDiffs(timestamp);
      setTimeAgo(newTimeAgo);
    }, 1000);
    return () => clearInterval(interval);
  }, [timestamp]);

  const rtf = new Intl.RelativeTimeFormat("es", { style: "short" });
  if (timeAgo !== undefined) {
    const { value, unit } = timeAgo;
    return rtf.format(value, unit);
  } else {
    return "Date not defined";
  }
}
