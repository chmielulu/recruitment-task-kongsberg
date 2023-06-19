import { useState, useEffect, SetStateAction, Dispatch } from "react";

export function useAPIQuery<T>(target: string): {
  isError: boolean;
  isLoading: boolean;
  data: T | null;
} {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isError, setError] = useState<boolean>(false);
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch(target, { signal })
      .then((res) => {
        tryToParseData(res, setData, setError, setLoading);
      })
      .catch((e) => {
        if (e.name !== "AbortError") {
          setError(true);
          setLoading(false);
        }
      });

    return () => {
      controller.abort();
      setData(null);
      setLoading(true);
      setError(false);
    };
  }, [target]);

  return { isLoading, isError, data };
}

async function tryToParseData(
  res: Response,
  setState: Dispatch<SetStateAction<any>>,
  setError: Dispatch<SetStateAction<boolean>>,
  setLoading: Dispatch<SetStateAction<boolean>>
) {
  try {
    const data = await res.json();
    setState(data);
  } catch (_e) {
    setError(true);
  } finally {
    setLoading(false);
  }
}
