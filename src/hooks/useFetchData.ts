import { useEffect, useState } from 'react';

type FetchOptions<T> = {
  fetchFn: (
    onSuccess?: (data: T) => void,
    onError?: (error: unknown) => void
  ) => Promise<T>;
  enabled?: boolean;
};

export const useFetchData = <T>({
  fetchFn,
  enabled = true
}: FetchOptions<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      try {
        await fetchFn(
          (data: T) => {
            setData(data);
          },
          (error: unknown) => {
            setError(error);
          }
        );
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [fetchFn, enabled]);

  return { data, isLoading, error };
};
