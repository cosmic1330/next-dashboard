'use client';
import { Fragment, Suspense, useEffect, useState } from 'react';
import Controller from './(components)/controller';
import { fetchStockList } from './(utils)/requestData';
import { StocksType } from './type';
import { Typography } from '@mui/material';

export default function CacheTable() {
  const [stocks, setStocks] = useState<StocksType[]>([]);
  useEffect(() => {
    fetchStockList().then((stocks) => setStocks(stocks));
  }, []);

  return (
    <Fragment>
      <Typography variant="h4" align="center">
        Cache選股
      </Typography>
      <Suspense>
        {stocks.length > 0 && <Controller stocks={stocks} />}
      </Suspense>
    </Fragment>
  );
}
