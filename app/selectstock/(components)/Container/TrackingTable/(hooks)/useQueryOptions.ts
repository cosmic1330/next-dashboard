import { V2StocksMinimalResponse } from '@/app/api/taiwan-stock/v2/stocks/minimal/route';
import useCancelToken from '@/hooks/useCancelToken';
import { useEffect } from 'react';
import useSWR from 'swr';

export default function useQueryOptions() {
  const { newCancelToken, isAbortError, handleCancel } = useCancelToken();
  const fetcherWithCancel = async (url: string) => {
    try {
      const r = await fetch(url, {
        signal: newCancelToken().signal,
      });
      const data = await r.json();
      return data;
    } catch (error) {
      return [];
    }
  };

  const { data, error, isLoading, isValidating } =
    useSWR<V2StocksMinimalResponse>(
      `http://localhost:3000/api/taiwan-stock/v2/stocks`,
      fetcherWithCancel,
      {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        revalidateIfStale: false,
      },
    );

  useEffect(() => {
    return () => handleCancel();
  }, [handleCancel]);

  return { options: data || [] };
}
