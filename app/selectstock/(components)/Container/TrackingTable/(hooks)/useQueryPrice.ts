import { FinialDayDataType } from '@/app/api/taiwan-stock/v1/stocks/id/day/route';
import useCancelToken from '@/hooks/useCancelToken';
import { useEffect } from 'react';
import useSWR from 'swr';

export default function useQueryPrice(str: string) {
  const { newCancelToken, isAbortError, handleCancel } = useCancelToken();
  const fetcherWithCancel = async (str: string) => {
    let result:
      | {
          id: string;
          data: FinialDayDataType[];
          date: string;
          plan: string;
          name: string;
          c: string;
        }
      | undefined = undefined;
    try {
      const [id, name, date, plan, c] = str.split(',');
      const r = await fetch(
        `http://localhost:3000/api/taiwan-stock/v1/stocks/id/day/nocache?stockId=${id}`,
        {
          signal: newCancelToken().signal,
        },
      );
      const data = await r.json();
      result = { id, data, plan, date, name, c };
      return result;
    } catch (error) {
      if (isAbortError(error)) {
        console.log('Request was canceled.');
      } else {
        console.error('Error:', error);
      }
      throw error;
    }
  };

  const { data, error, isLoading, isValidating } = useSWR(
    str,
    fetcherWithCancel,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
      refreshInterval: 1000 * 60 * 5,
    },
  );

  useEffect(() => {
    return () => handleCancel();
  }, [handleCancel]);

  return { data, error, isLoading };
}
