'use client';
import { Fragment, Suspense, useEffect, useState } from 'react';
import Controller from './(components)/controller';
import { fetchStockList } from './(utils)/requestData';
import { StocksType } from './type';

export default function CacheTable() {
  const [stocks, setStocks] = useState<StocksType[]>([]);
  useEffect(() => {
    fetchStockList().then((stocks) => setStocks(stocks));
  }, []);

  return (
    <Fragment>
      <Suspense>
        {stocks.length > 0 && <Controller stocks={stocks} />}
      </Suspense>
    </Fragment>
  );
}
