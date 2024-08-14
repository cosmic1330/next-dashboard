import {
  PrismaDailyDealResponseResponse,
  YahooDailyDealResponseResponse,
} from '@/app/api/taiwan-stock/v2/daily_deal/types';
import { useContext, useEffect } from 'react';
import useSWR from 'swr';
import { SelectStockContext } from '../(context)/selectStockContext';
import fetcherWithCancel from '../(utils)/fetcherWithCancel';
import useCancelToken from '@/hooks/useCancelToken';

export default function useSwrFetchDeal(stock_id: string) {
  const { newCancelToken, isAbortError, handleCancel } = useCancelToken();
  const { daily_db_data_set } = useContext(SelectStockContext);
  const { data } = useSWR<
    PrismaDailyDealResponseResponse | YahooDailyDealResponseResponse
  >(
    daily_db_data_set
      ? `http://localhost:3000/api/taiwan-stock/v2/daily_deal/${stock_id}`
      : `http://localhost:3000/api/taiwan-stock/v2/daily_deal/yahoo/${stock_id}`,
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