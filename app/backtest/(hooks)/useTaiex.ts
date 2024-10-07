import { V2TaiexResponse } from '@/app/api/taiwan-stock/v2/taiex/route';
import fetcherWithCancel from '@/app/selectstock/(utils)/fetcherWithCancel';
import useCancelToken from '@/hooks/useCancelToken';
import { useBackTest } from '@/store/zustand';
import FormateDate from '@/utils/formateStrDate';
import Market from '@ch20026103/backtest/dist/esm/market';
import { useEffect } from 'react';
import useSWR from 'swr';

export default function useTaiex() {
  const { context, startDate, endDate } = useBackTest();
  const { newCancelToken, isAbortError, handleCancel } = useCancelToken();

  const { data, isLoading } = useSWR<V2TaiexResponse>(
    `http://localhost:3000/api/taiwan-stock/v2/taiex/date?start=${startDate}&end=${endDate}`,
    (url) => fetcherWithCancel(url, newCancelToken, isAbortError),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
    },
  );

  useEffect(() => {
    if (data && context?.dateSequence) {
      const res = data.map((item) => ({
        t: FormateDate(item.transaction_date),
        c: parseFloat(`${item.close_price}`),
        h: parseFloat(`${item.high_price}`),
        l: parseFloat(`${item.low_price}`),
        o: parseFloat(`${item.open_price}`),
      }));
      const market = new Market({
        data: res,
        dateSequence: context?.dateSequence,
      });
      context.updateOptions({ market });
    }
  }, [context, data]);

  useEffect(() => {
    return () => handleCancel();
  }, [handleCancel]);

  return { data, isLoading };
}
