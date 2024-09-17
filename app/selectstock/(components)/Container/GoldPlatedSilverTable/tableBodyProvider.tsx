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
  const { stockData, positives, rollback_date, negatives } = useQueryDeal(
    stock.stock_id,
  );
  const conform = useConform(stockData, rollback_date);
  return !conform ? (
    <Fragment />
  ) : (
    <TableBodyRow
      {...{
        stock,
        stockData,
        positives,
        negatives,
        conform,
        rollback_date,
      }}
      plan="Gold Plated Silver Plan"
    />
  );
}
