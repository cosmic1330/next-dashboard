import { YahooDailyDealResponseResponse } from '@/app/api/taiwan-stock/v2/daily_deal/types';
import useCancelToken from '@/hooks/useCancelToken';
import { useEffect } from 'react';
import useSWR from 'swr';
import fetcherWithCancel from '../(utils)/fetcherWithCancel';

export default function useTrackingFetchDeal(
  stock_id: string,
  headers: HeadersInit = {},
) {
  const { newCancelToken, isAbortError, handleCancel } = useCancelToken();
  const { data } = useSWR<YahooDailyDealResponseResponse>(
    `http://localhost:3000/api/taiwan-stock/v2/daily_deal/yahoo/${stock_id}`,
    (url) => fetcherWithCancel(url, newCancelToken, isAbortError, headers),
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

  return data;
}
