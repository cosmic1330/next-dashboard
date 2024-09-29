import {
  V2StocksResponse,
  V2StocksResponseRow,
} from '@/app/api/taiwan-stock/v2/stocks/route';
import fetcherWithCancel from '@/app/selectstock/(utils)/fetcherWithCancel';
import formatStockdata from '@/app/selectstock/(utils)/indicator/formatStockdata';
import useCancelToken from '@/hooks/useCancelToken';
import { useBackTest } from '@/store/zustand';
import { Context } from '@ch20026103/backtest';
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';

const fetchDetails = async (stock: V2StocksResponseRow) => {
  const res = await fetch(
    `http://localhost:3000/api/taiwan-stock/v2/daily_deal/${stock.stock_id}`,
  );
  return res.json();
};

const fetchBatchDetails = async (batch: V2StocksResponseRow[]) => {
  const results = [];
  for (let i = 0; i < batch.length; i++) {
    const stock = batch[i];
    results.push(fetchDetails(stock));
  }
  return Promise.all(results);
};

const fetchAllBatch = async (
  batchSize: number,
  stocks: V2StocksResponseRow[],
  context: Context,
  setSuccess: Dispatch<SetStateAction<number>>,
) => {
  for (let i = 0; i < stocks.length; i += batchSize) {
    const batch = stocks.slice(i, i + batchSize);
    const res = await fetchBatchDetails(batch);
    res.forEach((stockData, index) => {
      context.bind(
        stockData[0].stock_id,
        stockData[0].stock_name,
        formatStockdata(stockData, stockData[0].stock_id),
      );
    });
    setSuccess((pre) => pre + batch.length);
  }
  return false;
};

export default function useStocks() {
  const { context, setDataStatus } = useBackTest();
  const { newCancelToken, isAbortError, handleCancel } = useCancelToken();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(0);

  const { data, mutate } = useSWR<V2StocksResponse>(
    `http://localhost:3000/api/taiwan-stock/v2/stocks`,
    (url) => fetcherWithCancel(url, newCancelToken, isAbortError),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
    },
  );

  useEffect(() => {
    setSuccess(0);
    setIsLoading(true);
    setDataStatus(false);
    if (data && context) {
      fetchAllBatch(50, data, context, setSuccess).then((status) => {
        setIsLoading(status);
        setDataStatus(true);
      });
    }
  }, [context, data, setDataStatus, setSuccess]);

  const progress = useMemo(() => {
    if (data) {
      return Math.floor((success / data.length) * 100);
    }
    return 0;
  }, [success, data]);

  useEffect(() => {
    return () => handleCancel();
  }, [handleCancel]);

  return { isLoading, progress, success, mutate };
}
