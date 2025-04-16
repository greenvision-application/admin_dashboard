import { useEffect, useState } from 'react';

type FetchOptions<T> = {
  fetchFn: () => Promise<T>;
  enabled?: boolean; // option để chủ động gọi
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
      console.log('[useFetchData] Fetch disabled, skipping...');
      return;
    }

    const fetchData = async () => {
      console.log('[useFetchData] Starting fetch...');
      setIsLoading(true);
      try {
        console.log('[useFetchData] Calling fetch function...');
        const response = await fetchFn();
        console.log('[useFetchData] Fetch successful, data:', response);
        setData(response);
      } catch (err) {
        console.log('[useFetchData] Fetch error:', err);
        setError(err);
      } finally {
        console.log('[useFetchData] Fetch completed, setting loading to false');
        // setIsLoading(false);
      }
    };

    fetchData();
  }, [fetchFn, enabled]);

  return { data, isLoading, error };
};
