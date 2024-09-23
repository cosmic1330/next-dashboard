import { isOscContractionSignalsBottoming } from '@/app/selectstock/(utils)/assessment/positive';
import {
    isBounceOffTheLowerBollingerBand,
    isSufficientTradingVolume
} from '@/app/selectstock/(utils)/conditions';
import { StockData } from '@/app/selectstock/types';
  
  export default function bullishpolevault (
    stockData: StockData[],
    rollback_date: number,
  ) {
    if (
      isSufficientTradingVolume(stockData, rollback_date, 300) &&
      isBounceOffTheLowerBollingerBand(stockData, rollback_date)
    ) {
      return true;
    }
    return false;
  }
  