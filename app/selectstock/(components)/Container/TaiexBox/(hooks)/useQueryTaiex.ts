import { PrismaDailyDealResponseResponse } from '@/app/api/taiwan-stock/v2/daily_deal/types';
import { SelectStockContext } from '@/app/selectstock/(context)/selectStockContext';
import useCancelToken from '@/hooks/useCancelToken';
import FormateDate from '@/utils/formateStrDate';
import { Kd, Ma, Macd } from '@ch20026103/anysis';
import { useCallback, useContext, useEffect, useMemo } from 'react';
import useSWR from 'swr';

export default function useQueryTaiex() {
  const { newCancelToken, isAbortError, handleCancel } = useCancelToken();

  const { rollback_date } = useContext(SelectStockContext);
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
    useSWR<PrismaDailyDealResponseResponse>(
      `http://localhost:3000/api/taiwan-stock/v2/taiex`,
      fetcherWithCancel,
      {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        revalidateIfStale: false,
      },
    );

  const method = useCallback(
    (rollback_date: number) => {
      if (!data) return;

      let ma = new Ma();
      let macd = new Macd();
      let kd = new Kd();
      try {
        const stockData = data
          .map((item) => ({
            t: FormateDate(item.transaction_date),
            c: parseFloat(`${item.close_price}`),
            h: parseFloat(`${item.high_price}`),
            l: parseFloat(`${item.low_price}`),
            o: parseFloat(`${item.open_price}`),
          }))
          .reverse();
        if (rollback_date) stockData.splice(0, rollback_date);

        let macdData = macd.init(stockData[0]);
        let kdData = kd.init(stockData[0]);
        let ma5Data = ma.init(stockData[0], 5);
        let ma10Data = ma.init(stockData[0], 10);
        let ma20Data = ma.init(stockData[0], 20);
        let ma60Data = ma.init(stockData[0], 60);
        let finallyData = [
          {
            ...stockData[0],
            ema12: macdData.ema12,
            ema26: macdData.ema26,
            macd: macdData.macd,
            osc: macdData.osc,
            dif: macdData.dif[macdData.dif.length - 1],
            rsv: kdData.rsv,
            k: kdData.k,
            d: kdData.d,
            'k-d': kdData['k-d'],
            ma5: ma5Data.ma,
            exclusionValueMa5: ma5Data.exclusionValue,
            ma10: ma10Data.ma,
            exclusionValueMa10: ma10Data.exclusionValue,
            ma20: ma20Data.ma,
            exclusionValueMa20: ma20Data.exclusionValue,
            ma60: ma60Data.ma,
            exclusionValueMa60: ma60Data.exclusionValue,
          },
        ];
        for (let i = 1; i < stockData.length; i++) {
          macdData = macd.next(stockData[i], macdData);
          kdData = kd.next(stockData[i], kdData, 9);
          ma5Data = ma.next(stockData[i], ma5Data, 5);
          ma10Data = ma.next(stockData[i], ma10Data, 10);
          ma20Data = ma.next(stockData[i], ma20Data, 20);
          ma60Data = ma.next(stockData[i], ma60Data, 60);
          finallyData.push({
            ...stockData[i],
            ema12: macdData.ema12,
            ema26: macdData.ema26,
            macd: macdData.macd,
            osc: macdData.osc,
            dif: macdData.dif[macdData.dif.length - 1],
            rsv: kdData.rsv,
            k: kdData.k,
            d: kdData.d,
            'k-d': kdData['k-d'],
            ma5: ma5Data.ma,
            exclusionValueMa5: ma5Data.exclusionValue,
            ma10: ma10Data.ma,
            exclusionValueMa10: ma10Data.exclusionValue,
            ma20: ma20Data.ma,
            exclusionValueMa20: ma20Data.exclusionValue,
            ma60: ma60Data.ma,
            exclusionValueMa60: ma60Data.exclusionValue,
          });
        }
        return finallyData;
      } catch (e) {
        console.log(e);
      }
    },
    [data],
  );

  const taiexData = useMemo(() => {
    return method(rollback_date);
  }, [method, rollback_date]);

  useEffect(() => {
    return () => handleCancel();
  }, [handleCancel]);

  return { taiexData };
}
