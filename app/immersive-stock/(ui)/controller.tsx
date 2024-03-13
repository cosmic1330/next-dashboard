'use client';

import { memo, useMemo, useState } from 'react';
import { StocksType } from '../type';
import Content from './content';
import Range from './range';

export default memo(function Controller({ stocks }: { stocks: StocksType[] }) {
  // 本益比
  const [peRatio, setPeRatio] = useState(true);
  // 殖利率
  const [dividendYield, setDividendYield] = useState(true);
  // 股價淨值比
  const [pbRatio, setPbRatio] = useState(true);

  const filterStocks = useMemo(() => {
    return stocks.filter((stock) => {
      if (peRatio && stock[4] === '-') return false;
      if (dividendYield && parseInt(stock[2]) === 0) return false;
      if (pbRatio && parseFloat(stock[5]) < 1.5) return false;
      return true;
    });
    // return [['2330', '台積電', '', '', '', '', '']];
  }, [stocks, peRatio, dividendYield, pbRatio]);

  return (
    <div>
      <p>Stocks: {filterStocks.length}</p>
      <label>
        有本益比
        <input
          type="checkbox"
          name="有本益比"
          checked={peRatio}
          onChange={() => setPeRatio(!peRatio)}
        />
      </label>

      <label>
        有殖利率
        <input
          type="checkbox"
          name="殖利率"
          checked={dividendYield}
          onChange={() => setDividendYield(!dividendYield)}
        />
      </label>

      <label>
        股價淨值比 小於 1.5
        <input
          type="checkbox"
          name="股價淨值比"
          checked={pbRatio}
          onChange={() => setPbRatio(!pbRatio)}
        />
      </label>

      <fieldset>
        <legend>策略１注意事項:</legend>
        <label>隔日最高價未高於今日最高價 賣出</label>
        <label>隔日最低價未高於今日最低價 賣出</label>
      </fieldset>

      <fieldset>
        <legend>策略2注意事項:</legend>
        <label>隔日再次跌破月線 賣出</label>
        <label>隔日最低價跌破於今日最低價 賣出</label>
      </fieldset>
      <Range />
      <div className="mx-auto grid max-w-4xl grid-cols-4 gap-3">
        {filterStocks.map((item) => (
          <Content item={item} key={item[0]} />
        ))}
      </div>
    </div>
  );
});
