'use client';
import { useStockStore } from '@/store/zustand';
import { memo, useMemo } from 'react';
import { SWRConfig } from 'swr';
import useStockData from '../(hooks)/useStockData';
import { StocksType } from '../type';
import Strategy from './strategy';

export default memo(function Item({ item }: { item: StocksType }) {
  const { isLoading, data } = useStockData(item);
  const { retrospect } = useStockStore();

  const stockData = useMemo(() => {
    try {
      if (retrospect !== '0') {
        return data?.slice(0, retrospect);
      } else {
        return data;
      }
    } catch (error) {
      console.log(data);
      return [];
    }
  }, [data, retrospect]);

  return (
    <SWRConfig>
      {!isLoading && <Strategy stocksData={stockData} item={item} />}
    </SWRConfig>
  );
});
