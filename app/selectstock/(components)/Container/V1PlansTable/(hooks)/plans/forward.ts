import { isSufficientTradingVolume } from '@/app/selectstock/(utils)/conditions';
import { StockData } from '@/app/selectstock/types';
export default function forward(stockData: StockData[], rollback_date: number) {
  let length = stockData.length - 1;
  if (
    isSufficientTradingVolume(stockData, rollback_date, 500) &&
    // 收盤價持續大於10日均線
    stockData[length - rollback_date].c >
      <number>stockData[length - rollback_date].ma10 &&
    stockData[length - (rollback_date + 1)].c >
      <number>stockData[length - rollback_date].ma10 &&
    stockData[length - (rollback_date + 2)].c >
      <number>stockData[length - rollback_date].ma10 &&
    // 均線正向排列
    <number>stockData[length - rollback_date].ma5 >
      <number>stockData[length - rollback_date].ma10 &&
    <number>stockData[length - rollback_date].ma10 >
      <number>stockData[length - rollback_date].ma20 &&
    <number>stockData[length - rollback_date].ma20 >
      <number>stockData[length - rollback_date].ma60 &&
    // 10日線往上
    <number>stockData[length - rollback_date].ma10 >
      <number>stockData[length - (rollback_date + 1)].ma10 &&
    <number>stockData[length - (rollback_date + 1)].ma10 >
      <number>stockData[length - (rollback_date + 2)].ma10 &&
    // 五日均線往上
    <number>stockData[length - rollback_date].ma5 >
      <number>stockData[length - (rollback_date + 1)].ma5 &&
    // 月線及五日均線差距小於3%
    ((<number>stockData[length - rollback_date].ma5 -
      <number>stockData[length - rollback_date].ma20) /
      <number>stockData[length - rollback_date].ma20) *
      100 <
      3
  ) {
    return true;
  }
  return false;
}
