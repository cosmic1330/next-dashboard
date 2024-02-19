'use client';
import { FinialDataType } from '@/app/api/taiwan-stock/v1/stocks/symbol/route';
import { memo, useMemo } from 'react';
import useStrategy from '../(hooks)/useStrategy';
import { StocksType } from '../type';
import Link from 'next/link';

export default memo(function Strategy({
  stocksData,
  item,
}: {
  item: StocksType;
  stocksData: FinialDataType[];
}) {
  const { strategy1, strategy2, strategy3, strategy4 } = useStrategy();

  const [strategy1Res, strategy2Res, strategy3Res, strategy4Res] =
    useMemo(() => {
      const res = [false, false, false, false];
      if (stocksData && strategy1(stocksData)) res[0] = true;
      if (stocksData && strategy2(stocksData)) res[1] = true;
      if (stocksData && strategy3(stocksData)) res[2] = true;
      if (stocksData && strategy4(stocksData)) res[3] = true;
      return res;
    }, [stocksData, strategy1, strategy2, strategy3, strategy4]);

  return (
    (strategy1Res || strategy2Res || strategy3Res || strategy4Res) && (
      <>
        <div className="rounded-lg p-6 shadow-md">
          <Link
            href={`https://www.wantgoo.com/stock/${item[0]}/major-investors/main-trend#main-trend`}
            target="_blank"
          >
            {stocksData[stocksData.length - 1].t}
          </Link>
        </div>
        <div className="rounded-lg p-6 shadow-md">
          <Link
            href={`https://tw.tradingview.com/chart/?symbol=TWSE%3A${item[0]}`}
            target="_blank"
          >
            {item[0]}
          </Link>
        </div>
        <div className="rounded-lg p-6 shadow-md">
          <Link
            href={`https://pchome.megatime.com.tw/stock/sto0/ock1/sid${item[0]}.html`}
            target="_blank"
          >
            {item[1]}
          </Link>
        </div>
        <div className="rounded-lg p-6 shadow-md">
          <Link
            target="_blank"
            rel="noreferrer"
            href={`https://tw.stock.yahoo.com/q/ta?s=${item[0]}`}
          >
            {strategy1Res && '1'}, {strategy2Res && '2'}, {strategy3Res && '3'},
            {strategy4Res && 'KD'}
          </Link>
        </div>
      </>
    )
  );
});
