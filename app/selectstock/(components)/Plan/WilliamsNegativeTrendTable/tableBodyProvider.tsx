'use client';
import { V2StocksResponseRow } from '@/app/api/taiwan-stock/v2/stocks/route';
import useQueryDeal from '@/app/selectstock/(hooks)/useQueryDeal';
import TableBodyRow from '@/app/selectstock/(layout)/tableBodyRow';
import { Fragment } from 'react';
import useConform from './(hooks)/useConform';

export default function TableBodyRowProvider({
  stock,
}: {
  stock: V2StocksResponseRow;
}) {
  const { volume, stockData, positives, rollback_date, negatives } =
    useQueryDeal(stock.stock_id);
  const conform = useConform(stockData, rollback_date);
  return conform && stockData[stockData.length - 1]?.v > volume &&
  parseInt(stock.eps[0]?.eps_data) > 0 ? (
    <TableBodyRow
      {...{
        volume,
        stock,
        stockData,
        positives,
        negatives,
        conform,
        rollback_date,
      }}
      plan="Williams Negative Trend Plan"
    />
  ) : (
    <Fragment />
  );
}