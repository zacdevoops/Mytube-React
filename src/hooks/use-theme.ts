import { useCallback, useEffect, useState } from "react";

const KEY = "streamvault-theme";

export function useTheme() {
  const [light, setLight] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(KEY);
    const isLight = stored === "light";
    setLight(isLight);
    document.documentElement.classList.toggle("light", isLight);
  }, []);

  const toggle = useCallback(() => {
    setLight((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("light", next);
      window.localStorage.setItem(KEY, next ? "light" : "dark");
      return next;
    });
  }, []);

  return { light, toggle };
}
