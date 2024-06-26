import { V2DailyDealResponse } from '@/app/api/taiwan-stock/v2/daily_deal/[id]/route';
import { SelectStockContext } from '@/app/selectstock/(context)/selectStockContext';
import useCancelToken from '@/hooks/useCancelToken';
import FormateDate from '@/utils/formateStrDate';
import { Gold, Kd, Ma, Macd, Obv } from '@ch20026103/anysis';
import { useCallback, useContext, useEffect, useMemo } from 'react';
import useSWR from 'swr';

export default function useQueryDeal(stock_id: string) {
  const { newCancelToken, isAbortError, handleCancel } = useCancelToken();

  const { rollback_date, daily_db_data_set } = useContext(SelectStockContext);
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
    useSWR<V2DailyDealResponse>(
      daily_db_data_set
        ? `http://localhost:3000/api/taiwan-stock/v2/daily_deal/${stock_id}`
        : `http://localhost:3000/api/taiwan-stock/v2/daily_deal/yahoo/${stock_id}`,
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
      let obv = new Obv();
      try {
        const stockData = data.map((item) => ({
          id: stock_id,
          t: FormateDate(item.transaction_date),
          c: parseFloat(item.close_price),
          h: parseFloat(item.high_price),
          l: parseFloat(item.low_price),
          o: parseFloat(item.open_price),
          v: item.volume,
          foreign_investors: item.legal_person[0]?.foreign_investors || 0,
          investment_trust: item.legal_person[0]?.investment_trust || 0,
          dealer: item.legal_person[0]?.dealer || 0,
        }));

        const gold = new Gold();
        const allGold = gold.getGold(stockData);
        let length = stockData.length - 1;

        let macdData = macd.init(stockData[0]);
        let kdData = kd.init(stockData[0]);
        let ma5Data = ma.init(stockData[0], 5);
        let ma10Data = ma.init(stockData[0], 10);
        let ma20Data = ma.init(stockData[0], 20);
        let ma60Data = ma.init(stockData[0], 60);
        let obv5Data = obv.init(stockData[0], 5);
        let obv10Data = obv.init(stockData[0], 10);
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
            obv: obv5Data.obv,
            obvMa5: obv5Data.obvMa,
            obvMa10: obv10Data.obvMa,
          },
        ];
        for (let i = 1; i < stockData.length; i++) {
          macdData = macd.next(stockData[i], macdData);
          kdData = kd.next(stockData[i], kdData, 9);
          ma5Data = ma.next(stockData[i], ma5Data, 5);
          ma10Data = ma.next(stockData[i], ma10Data, 10);
          ma20Data = ma.next(stockData[i], ma20Data, 20);
          ma60Data = ma.next(stockData[i], ma60Data, 60);
          obv5Data = obv.next(stockData[i], obv5Data, 5);
          obv10Data = obv.next(stockData[i], obv10Data, 10);
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
            obv: obv5Data.obv,
            obvMa5: obv5Data.obvMa,
            obvMa10: obv10Data.obvMa,
          });
        }
        if (
          stockData[length - rollback_date].v > 500 &&
          stockData[length - rollback_date].c >
            <number>finallyData[length - rollback_date].ma5 &&
          stockData[length - rollback_date].l >
            <number>finallyData[length - rollback_date].ma5 &&
          // 5日均線往上突破10日、20日或60日均線
          <number>finallyData[length - rollback_date].ma5 >
            <number>finallyData[length - rollback_date].ma10 &&
          <number>finallyData[length - (rollback_date + 1)].ma5 <
            <number>finallyData[length - (rollback_date + 1)].ma10 &&
          <number>finallyData[length - (rollback_date + 2)].ma5 <
            <number>finallyData[length - (rollback_date + 2)].ma10 &&
          <number>finallyData[length - (rollback_date + 1)].ma10 -
            <number>finallyData[length - (rollback_date + 1)].ma5 <
            <number>finallyData[length - (rollback_date + 2)].ma10 -
              <number>finallyData[length - (rollback_date + 2)].ma5 &&
          ((<number>finallyData[length - (rollback_date + 1)].ma10 -
            <number>finallyData[length - (rollback_date + 1)].ma5) /
            <number>finallyData[length - (rollback_date + 1)].ma5) *
            100 <
            2 &&
          // (<number>finallyData[length - rollback_date].ma5 >
          //   <number>finallyData[length - rollback_date].ma20 &&
          //   <number>finallyData[length - (rollback_date + 1)].ma5 <
          //     <number>finallyData[length - (rollback_date + 1)].ma20 &&
          //   <number>finallyData[length - (rollback_date + 2)].ma5 <
          //   <number>finallyData[length - (rollback_date + 2)].ma20 &&
          //   <number>finallyData[length -  (rollback_date + 1)].ma20 -
          //     <number>finallyData[length -  (rollback_date + 1)].ma5 <
          //     <number>finallyData[length - (rollback_date + 2)].ma20 -
          //       <number>finallyData[length - (rollback_date + 2)].ma5 &&
          //   ((<number>finallyData[length -  (rollback_date + 1)].ma20 -
          //     <number>finallyData[length -  (rollback_date + 1)].ma5) /
          //     <number>finallyData[length -  (rollback_date + 1)].ma5) *
          //     100 <
          //     2) || (<number>finallyData[length - rollback_date].ma5 >
          //       <number>finallyData[length - rollback_date].ma60 &&
          //       <number>finallyData[length - (rollback_date + 1)].ma5 <
          //         <number>finallyData[length - (rollback_date + 1)].ma60 &&
          //       <number>finallyData[length - (rollback_date + 2)].ma5 <
          //       <number>finallyData[length - (rollback_date + 2)].ma60 &&
          //       <number>finallyData[length -  (rollback_date + 1)].ma60 -
          //         <number>finallyData[length -  (rollback_date + 1)].ma5 <
          //         <number>finallyData[length - (rollback_date + 2)].ma60 -
          //           <number>finallyData[length - (rollback_date + 2)].ma5 &&
          //       ((<number>finallyData[length -  (rollback_date + 1)].ma60 -
          //         <number>finallyData[length -  (rollback_date + 1)].ma5) /
          //         <number>finallyData[length -  (rollback_date + 1)].ma5) *
          //         100 <
          //         2)
          // 月線往上
          <number>finallyData[length - rollback_date].ma20 >
            <number>finallyData[length - (rollback_date + 1)].ma20 &&
          <number>finallyData[length - (rollback_date + 1)].ma20 >
            <number>finallyData[length - (rollback_date + 2)].ma20 &&
          <number>finallyData[length - (rollback_date + 2)].ma20 >
            <number>finallyData[length - (rollback_date + 3)].ma20 &&
          // 季線往上
          <number>finallyData[length - rollback_date].ma60 >
            <number>finallyData[length - (rollback_date + 1)].ma60 &&
          <number>finallyData[length - (rollback_date + 1)].ma60 >
            <number>finallyData[length - (rollback_date + 2)].ma60 &&
          <number>finallyData[length - (rollback_date + 2)].ma60 >
            <number>finallyData[length - (rollback_date + 3)].ma60 &&
          // 五日均線往上
          <number>finallyData[length - rollback_date].ma5 >
            <number>finallyData[length - (rollback_date + 1)].ma5 &&
          // rsv
          <number>finallyData[length - rollback_date].rsv >
            <number>finallyData[length - (rollback_date + 1)].rsv &&
          <number>finallyData[length - rollback_date].rsv < 75 &&
          <number>finallyData[length - rollback_date].rsv > 30
        ) {
          return {
            ...finallyData[length - rollback_date],
            pre: [
              finallyData[length - (rollback_date + 1)],
              finallyData[length - (rollback_date + 2)],
            ],
            ...allGold,
          };
        }
        return null;
      } catch (e) {
        console.log(stock_id, e);
      }
    },
    [data, stock_id],
  );

  const planData = useMemo(() => {
    return method(rollback_date);
  }, [method, rollback_date]);

  useEffect(() => {
    return () => handleCancel();
  }, [handleCancel]);

  return { planData };
}
