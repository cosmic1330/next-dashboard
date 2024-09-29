import fetcherWithCancel from '@/app/selectstock/(utils)/fetcherWithCancel';
import useCancelToken from '@/hooks/useCancelToken';
import { useBackTest } from '@/store/zustand';
import { dateFormat } from '@ch20026103/anysis';
import { Context, DateSequence } from '@ch20026103/backtest';
import { BuyPrice, SellPrice } from '@ch20026103/backtest/dist/esm/context';
import { useCallback, useEffect } from 'react';
import useSWR from 'swr';
import buyMethod from '../(utils)/buy';
import sellMethod from '../(utils)/sell';

export default function useBacktestContext() {
  const { context, setContext } = useBackTest();
  const { newCancelToken, isAbortError, handleCancel } = useCancelToken();
  const { data } = useSWR(
    `http://localhost:3000/api/taiwan-stock/v2/taiex`,
    (url) => fetcherWithCancel(url, newCancelToken, isAbortError),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
    },
  );

  const refresh = useCallback(() => {
    if (!data) return;
    const dates: {
      l: number;
      h: number;
      c: number;
      o: number;
      t: number;
    }[] = data.map(
      (item: {
        low_price: string;
        high_price: string;
        close_price: string;
        open_price: string;
        transaction_date: number;
      }) => ({
        t: dateFormat(item.transaction_date, 5),
        v: 0,
        o: parseFloat(item.open_price),
        c: parseFloat(item.close_price),
        h: parseFloat(item.high_price),
        l: parseFloat(item.low_price),
      }),
    );
    const date = new DateSequence({
      data: dates.map((item) => item.t),
    });
    const ctx = new Context({
      stocks: {},
      dateSequence: date,
      buyMethod,
      sellMethod,
      options: {
        buyPrice: BuyPrice.OPEN,
        sellPrice: SellPrice.LOW,
      },
    });
    setContext(ctx);
  }, [data]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    return () => handleCancel();
  }, [handleCancel]);

  return { refresh };
}
