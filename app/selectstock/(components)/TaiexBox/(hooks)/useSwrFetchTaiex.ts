import { PrismaTaiexResponse } from '@/app/api/taiwan-stock/v2/taiex/types';
import useCancelToken from '@/hooks/useCancelToken';
import { useEffect } from 'react';
import useSWR from 'swr';
import fetcherWithCancel from '../../../(utils)/fetcherWithCancel';

export default function useSwrFetchTaiex() {
  const { newCancelToken, isAbortError, handleCancel } = useCancelToken();
  const { data } = useSWR<PrismaTaiexResponse>(
    `http://localhost:3000/api/taiwan-stock/v2/taiex`,

    (url) => fetcherWithCancel(url, newCancelToken, isAbortError),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
    },
  );

  useEffect(() => {
    return () => handleCancel();
  }, [handleCancel]);

  return data;
}
