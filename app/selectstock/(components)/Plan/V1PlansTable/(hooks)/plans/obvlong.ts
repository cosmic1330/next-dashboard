import {
  isMovingAveragesPositiveOrder,
  isMovingAverageTrendUp,
  isObvPositiveOrder,
  isSufficientTradingVolume,
} from '@/app/selectstock/(utils)/conditions';
import { MaType } from '@/app/selectstock/(utils)/conditions/types';
import { StockData } from '@/app/selectstock/types';
export default function obvlong(stockData: StockData[], rollback_date: number) {
  let length = stockData.length - 1;
  if (
    // 交易量大於 4000 張
    isSufficientTradingVolume(stockData, rollback_date, 4000) &&
    // 五日線上
    <number>stockData[length - rollback_date]?.c >
      <number>stockData[length - rollback_date]?.ma5 &&
    // 五日線往上
    isMovingAverageTrendUp(stockData, rollback_date, MaType.MA5) &&
    // KD 往上
    <number>stockData[length - rollback_date]?.k >
      <number>stockData[length - (rollback_date + 1)]?.k &&
    <number>stockData[length - rollback_date]?.k >
      <number>stockData[length - rollback_date]?.d &&
    // 均線正向排列
    isMovingAveragesPositiveOrder(stockData, rollback_date, [
      MaType.MA5,
      MaType.MA10,
      MaType.MA20,
      MaType.MA60,
    ]) &&
    // OBV 正向排列
    isObvPositiveOrder(stockData, rollback_date) &&
    // OBV 均線上揚
    <number>stockData[length - rollback_date]?.obv >
      <number>stockData[length - (rollback_date + 1)]?.obv &&
    <number>stockData[length - rollback_date].obv5Ma >
      <number>stockData[length - (rollback_date + 1)].obv5Ma &&
    <number>stockData[length - rollback_date].obv10Ma >
      <number>stockData[length - (rollback_date + 1)].obv10Ma &&
    // 均線上揚
    <number>stockData[length - rollback_date]?.ma5 >
      <number>stockData[length - (rollback_date + 1)]?.ma5 &&
    <number>stockData[length - rollback_date].ma20 >
      <number>stockData[length - (rollback_date + 1)].ma20 &&
    <number>stockData[length - rollback_date].ma60 >
      <number>stockData[length - (rollback_date + 1)].ma60 &&
    // K棒未跳高
    ((<number>stockData[length - rollback_date].l -
      <number>stockData[length - rollback_date].ma5) /
      <number>stockData[length - rollback_date].ma5) *
      100 <
      1
  ) {
    return true;
  }
  return false;
}
