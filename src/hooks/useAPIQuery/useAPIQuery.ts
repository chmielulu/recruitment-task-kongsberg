import { useState, useEffect } from "react";

export function useAPIQuery<T>(
  target: string,
  key: string,
  ttl: number = 60
): {
  isError: boolean;
  isLoading: boolean;
  data: T | null;
} {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isError, setError] = useState<boolean>(false);
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    const cachedDataJSON = window.localStorage.getItem(key);
    if (cachedDataJSON) {
      const cachedData = JSON.parse(cachedDataJSON) as {
        saveTime: number;
        data: T;
      };

      if (cachedData.saveTime + ttl > Date.now() / 1000) {
        setData(cachedData.data);
        setLoading(false);
        return;
      }
    }

    const controller = new AbortController();
    const signal = controller.signal;

    (async () => {
      try {
        const res = await fetch(target, { signal });
        const data = await res.json();
        window.localStorage.setItem(
          key,
          JSON.stringify({
            saveTime: Date.now() / 1000,
            data,
          })
        );
        setData(data);
        setLoading(false);
      } catch (e: any) {
        if (e.name !== "AbortError") {
          setError(true);
          setLoading(false);
          window.localStorage.removeItem(key);
        }
      }
    })();

    return () => {
      controller.abort();
      setData(null);
      setLoading(true);
      setError(false);
    };
  }, [target, key, ttl]);

  return { isLoading, isError, data };
}
