import { useEffect, useState } from "react";

export default function useFetch<T>(path: string) {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`https://api.hnpwa.com/v0${path}.json`);
        const data = await response.json();
        setData(data);
        setError(null);
        window.scrollTo(0, 0);
      } catch (error) {
        if (error instanceof Error) {
          setError(error);
        }
      }
    }

    fetchData();
  }, [path]);

  return { data, error };
}
