import { FinialWeekDataType } from '@/app/api/taiwan-stock/v1/stocks/id/week/route';
import { useEffect } from 'react';
import useSWR from 'swr';
import { StocksType } from '../type';
import useCancelToken from '@/hooks/useCancelToken';

// const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function useWeekStockData(item: StocksType) {
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

  const { data, error, isLoading, isValidating } = useSWR<FinialWeekDataType[]>(
    `http://localhost:3000/api/taiwan-stock/v1/stocks/id/week?stockId=${item[0]}`,
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

  return {
    data,
    isLoading,
  };
}
