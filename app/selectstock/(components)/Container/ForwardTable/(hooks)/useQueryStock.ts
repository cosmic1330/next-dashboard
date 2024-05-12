import { V2EpsPlusResponse } from '@/app/api/taiwan-stock/v2/eps/plus/route';
import useCancelToken from '@/hooks/useCancelToken';
import { useEffect, useMemo } from 'react';
import useSWR from 'swr';

export default function useQueryStock() {
  const { newCancelToken, isAbortError, handleCancel } = useCancelToken();
  const fetcherWithCancel = async (url: string) => {
    try {
      const response = await fetch(url, {
        signal: newCancelToken().signal,
      });

      const data = await response.json();
      return data;
    } catch (error) {
      if (isAbortError(error)) {
        console.log('Request was canceled.');
      } else {
        console.error('Error:', error);
      }
      throw error;
    }
  };

  const { data, error, isLoading, isValidating, mutate } =
    useSWR<V2EpsPlusResponse>(
      `http://localhost:3000/api/taiwan-stock/v2/stocks`,
      fetcherWithCancel,
      {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        revalidateIfStale: false,
        revalidateOnMount: false,
      },
    );

  useEffect(() => {
    return () => handleCancel();
  }, [handleCancel]);

  return {
    data,
    error,
    mutate,
  };
}
