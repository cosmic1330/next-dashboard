import fetcherWithCancel from '@/app/selectstock/(utils)/fetcherWithCancel';
import useCancelToken from '@/hooks/useCancelToken';
import { useBackTest } from '@/store/zustand';
import { dateFormat } from '@ch20026103/anysis';
import { StockListType } from '@ch20026103/anysis/dist/esm/stockSkills/types';
import { Mode } from '@ch20026103/anysis/dist/esm/stockSkills/utils/dateFormat';
import { Context, DateSequence } from '@ch20026103/backtest';
import { BuyPrice, SellPrice } from '@ch20026103/backtest/dist/esm/context';
import { useCallback, useEffect } from 'react';
import useSWR from 'swr';
import buyMethod from '../(utils)/buy';
import sellMethod from '../(utils)/sell';

export default function useBacktestContext() {
  const {
    setContext,
    endDate,
    startDate,
    lowStockPrice,
    hightStockPrice,
    capital,
    buyPrice,
    sellPrice,
  } = useBackTest();
  const { newCancelToken, isAbortError, handleCancel } = useCancelToken();
  const { data } = useSWR(
    `http://localhost:3000/api/taiwan-stock/v2/taiex/date?start=${startDate}&end=${endDate}`,
    (url) => fetcherWithCancel(url, newCancelToken, isAbortError),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
    },
  );

  const refresh = useCallback(() => {
    if (!data) return;
    const dates: StockListType = data.map(
      (item: {
        low_price: string;
        high_price: string;
        close_price: string;
        open_price: string;
        transaction_date: number;
      }) => ({
        t: dateFormat(item.transaction_date, Mode.TimeStampToNumber),
        o: parseFloat(item.open_price),
        c: parseFloat(item.close_price),
        h: parseFloat(item.high_price),
        l: parseFloat(item.low_price),
      }),
    );
    const date = new DateSequence({
      data: dates.map((item) => item.t),
    });
    const options: {
      lowStockPrice?: number;
      hightStockPrice?: number;
      capital?: number;
      buyPrice?: BuyPrice;
      sellPrice?: SellPrice;
    } = {};
    if (lowStockPrice) options.lowStockPrice = lowStockPrice;
    if (hightStockPrice) options.hightStockPrice = hightStockPrice;
    if (capital) options.capital = capital;
    if (buyPrice) options.buyPrice = buyPrice as BuyPrice;
    if (sellPrice) options.sellPrice = sellPrice as SellPrice;
    const ctx = new Context({
      stocks: {},
      dateSequence: date,
      buyMethod,
      sellMethod,
      options,
    });
    setContext(ctx);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, setContext]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    return () => handleCancel();
  }, [handleCancel]);

  return { refresh };
}
