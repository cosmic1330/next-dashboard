import { StocksType } from '@/app/api/taiwan-stock/v1/stocks/id/day/type';
import { V1StocksResponse } from '@/app/api/taiwan-stock/v1/stocks/route';
import {
  V2StocksResponse,
  V2StocksResponseRow,
} from '@/app/api/taiwan-stock/v2/stocks/route';
import { SelectStockContext } from '@/app/selectstock/(context)/selectStockContext';
import useCancelToken from '@/hooks/useCancelToken';
import { useContext, useEffect } from 'react';
import useSWR from 'swr';

export default function useQueryStock() {
  const { newCancelToken, isAbortError, handleCancel } = useCancelToken();
  const { stock_db_data_set } = useContext(SelectStockContext);
  const fetcherWithCancel = async (url: string) => {
    try {
      const response = await fetch(url, {
        signal: newCancelToken().signal,
      });

      const data = await response.json();
      if (stock_db_data_set) {
        const res = data.filter(
          (stock: V2StocksResponseRow) =>
            stock.eps.length > 0 && parseFloat(stock.eps[0].eps_data) > 0,
        );
        return res;
      } else {
        const stockList: V1StocksResponse = data.data;
        const res = stockList.map((stock) => {
          const [stock_id, stock_name] = stock;
          return {
            stock_id,
            stock_name,
          };
        });
        return res;
      }
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
    useSWR<V2StocksResponse>(
      stock_db_data_set
        ? `http://localhost:3000/api/taiwan-stock/v2/stocks`
        : `http://localhost:3000/api/taiwan-stock/v1/stocks`,
      fetcherWithCancel,
      {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        revalidateIfStale: false,
        revalidateOnMount: false,
      },
    );

  useEffect(() => {
    return () => handleCancel();
  }, [handleCancel]);

  return {
    data,
    error,
    mutate,
  };
}
