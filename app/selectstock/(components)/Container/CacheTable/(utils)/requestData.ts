import { StocksType } from '../type';

export async function fetchStockList() {
  try {
    const json = await fetch(
      'http://localhost:3000/api/taiwan-stock/v1/stocks'
    ).then((res) => res.json());
    const stockList: StocksType[] = json.data;
    return stockList;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch stock list.');
  }
}
