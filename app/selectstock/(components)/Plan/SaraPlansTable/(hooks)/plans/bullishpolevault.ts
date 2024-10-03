import { isOscContractionSignalsBottoming } from '@/app/selectstock/(utils)/assessment/positive';
import {
    isBounceOffTheLowerBollingerBand,
    isKDGoldenCross,
    isMovingAveragesPositiveOrder,
    isMovingAverageTrendUp,
    isSufficientTradingVolume,
    isTwoRedSoldiersHigherLows
} from '@/app/selectstock/(utils)/conditions';
import { MaType } from '@/app/selectstock/(utils)/conditions/types';
import { StockData } from '@/app/selectstock/types';
  
  export default function bullishpolevault (
    stockData: StockData[],
    rollback_date: number,
  ) {
    let length = stockData.length - 1;
    if (
      isSufficientTradingVolume(stockData, rollback_date, 300) &&
      // 收紅
      stockData[length - rollback_date].c >=
        stockData[length - rollback_date].o &&
      // 收盤價高於5ma
      stockData[length - rollback_date].c >
        <number>stockData[length - rollback_date].ma5 &&
      // 底底高
      isTwoRedSoldiersHigherLows(stockData, rollback_date) &&
      // kd金叉
      isKDGoldenCross(stockData, rollback_date) &&
      // 5ma > 20ma > 60ma
      isMovingAveragesPositiveOrder(stockData, rollback_date, [
        MaType.MA5,
        MaType.MA20,
        MaType.MA60,
      ]) &&
      // 60ma持續上升
      isMovingAverageTrendUp(stockData, rollback_date, MaType.MA60)
    ) {
      return true;
    }
    return false;
  }
  