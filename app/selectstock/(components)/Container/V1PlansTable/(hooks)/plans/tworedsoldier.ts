import { isSufficientTradingVolume } from '@/app/selectstock/(utils)/conditions';
import { StockData } from '@/app/selectstock/types';
export default function tworedsoldier(stockData: StockData[], rollback_date: number) {
  let length = stockData.length - 1;
  if (
    isSufficientTradingVolume(stockData, rollback_date, 500) &&
    stockData[length - rollback_date].v > 1500 &&
    // 收紅
    stockData[length - rollback_date].c >=
      stockData[length - rollback_date].o &&
    // 收盤價高於5ma
    stockData[length - rollback_date].c >
      <number>stockData[length - rollback_date].ma5 &&
    // 底底高
    stockData[length - rollback_date].l >=
      stockData[length - (rollback_date + 1)].l &&
    stockData[length - (rollback_date + 1)].l >=
      stockData[length - (rollback_date + 2)].l &&
    stockData[length - (rollback_date + 2)].l <=
      stockData[length - (rollback_date + 3)].l &&
    // rsv升高
    <number>stockData[length - rollback_date].rsv >
      <number>stockData[length - (rollback_date + 1)].rsv &&
    // kd金叉
    <number>stockData[length - rollback_date].k >
      <number>stockData[length - rollback_date].d &&
    <number>stockData[length - (rollback_date + 1)].k <
      <number>stockData[length - (rollback_date + 1)].d &&
    // 5ma > 20ma > 60ma
    <number>stockData[length - rollback_date].ma5 >
      <number>stockData[length - rollback_date].ma20 &&
    <number>stockData[length - rollback_date].ma20 >
      <number>stockData[length - rollback_date].ma60 &&
    // 60ma持續上升
    <number>stockData[length - rollback_date].ma60 >
      <number>stockData[length - (rollback_date + 1)].ma60 &&
    <number>stockData[length - (rollback_date + 1)].ma60 >
      <number>stockData[length - (rollback_date + 2)].ma60
  ) {
    return true;
  }
  return false;
}
