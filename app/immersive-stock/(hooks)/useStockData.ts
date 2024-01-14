import useSWR from 'swr';
import { StocksType } from '../type';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function useStockData(item: StocksType) {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    `http://localhost:3000/api/taiwan-stock/v1/stocks/symbol?stockId=${item[0]}`,
    fetcher,
    { revalidateOnFocus: false, revalidateOnReconnect: false },
  );

  return {
    data,
    isLoading,
  };
}
