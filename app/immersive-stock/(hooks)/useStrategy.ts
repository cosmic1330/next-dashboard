import { FinialDataType } from '@/app/api/taiwan-stock/v1/stocks/symbol/route';
import { Ema, slope } from '@ch20026103/anysis';
import { useCallback } from 'react';

export default function useStrategy() {
  // 可能多:布林軌道縮口變開口
  /*
    1. 找趨勢往上
    2. 明日K棒不破前低且收紅
   */
  const strategy1 = useCallback((data: FinialDataType[]) => {
    try {
      const lastIndex = data.length - 1;
      if (
        data[lastIndex]?.v > 2000 &&
        data[lastIndex]?.c > data[lastIndex]?.ma5 &&
        data[lastIndex]?.l > data[lastIndex - 1]?.l &&
        data[lastIndex]?.c > data[lastIndex]?.o &&
        // OBV
        slope([
          data[lastIndex - 2].obv,
          data[lastIndex - 1].obv,
          data[lastIndex].obv,
        ]) > 0 &&
        // Boll
        data[lastIndex]?.bollUb > data[lastIndex - 1]?.bollUb &&
        data[lastIndex]?.bollLb < data[lastIndex - 1]?.bollLb &&
        // K
        data[lastIndex].l > data[lastIndex].bollMa &&
        data[lastIndex].c > data[lastIndex].bollMa &&
        // MACD
        data[lastIndex]?.dif > data[lastIndex - 1]?.dif &&
        data[lastIndex]?.osc > 0 &&
        // KD
        data[lastIndex]?.k < 80
      ) {
        // emaOBV
        const ema = new Ema();
        const emaOBV = ema.getEma(
          data.map((item: FinialDataType) => item.obv),
          20,
        );
        const emaOBV_y = emaOBV.slice(-60);
        const emaOBV_trend = slope(emaOBV_y as number[]);
        if (emaOBV_trend > 0) {
          return true;
        }
      }
    } catch (error) {
      return false;
    }
  }, []);

  // 多:KD黃金交叉, 布林穿過中線
  /* 
    1. 找趨勢往上
    2. 明日K棒不破前低且收紅
   */
  const strategy2 = useCallback((data: FinialDataType[]) => {
    try {
      const lastIndex = data.length - 1;
      if (
        // EMA
        data[lastIndex]?.v > 2000 &&
        data[lastIndex]?.c > data[lastIndex]?.ma5 &&
        data[lastIndex]?.l > data[lastIndex - 1]?.l &&
        data[lastIndex]?.c > data[lastIndex]?.o &&
        // OBV
        slope([
          data[lastIndex - 2].obv,
          data[lastIndex - 1].obv,
          data[lastIndex].obv,
        ]) > 0 &&
        // Boll
        // 1. 昨日K棒穿過布林中線
        data[lastIndex - 1]?.c > data[lastIndex - 1]?.bollMa &&
        data[lastIndex - 1]?.l < data[lastIndex - 1]?.bollMa &&
        // 2. 今日K棒在完整布林中線上方
        data[lastIndex]?.c > data[lastIndex]?.bollMa &&
        data[lastIndex]?.l > data[lastIndex]?.bollMa &&
        // KD
        data[lastIndex]?.k < 80 &&
        data[lastIndex]?.d < 80 &&
        data[lastIndex]?.k > data[lastIndex]?.d &&
        // MACD
        data[lastIndex]?.dif > data[lastIndex - 1]?.dif
      ) {
        return true;
      }
    } catch (error) {
      return false;
    }
  }, []);

  // 可能多:KD黃金交叉, 布林穿過底線站回，2紅K且不破前低
  /* 
    1. 找趨勢往上
    2. obv破低 價沒破低
    3. k沒破低
   */
  const strategy3 = useCallback((data: FinialDataType[]) => {
    const lastIndex = data.length - 1;
    if (
      // EMA
      data[lastIndex]?.v > 2000 &&
      data[lastIndex]?.l > data[lastIndex - 1]?.l &&
      data[lastIndex]?.h > data[lastIndex - 1]?.h &&
      data[lastIndex]?.c > data[lastIndex]?.o &&
      data[lastIndex]?.c > data[lastIndex - 1]?.h &&
      // Boll
      // 1. 昨日K棒穿過布林底線
      (data[lastIndex - 1]?.l < data[lastIndex - 1]?.bollLb ||
        data[lastIndex - 2]?.l < data[lastIndex - 2]?.bollLb) &&
      // 2. 今日K棒在完整布林底線上方
      data[lastIndex]?.c > data[lastIndex]?.bollLb &&
      data[lastIndex]?.l > data[lastIndex]?.bollLb &&
      // KD
      (data[lastIndex]?.k > data[lastIndex]?.d ||
        data[lastIndex - 1]?.k > data[lastIndex - 1]?.d) &&
      (data[lastIndex - 1]?.k < data[lastIndex - 1]?.d ||
        data[lastIndex - 2]?.k < data[lastIndex - 2]?.d)
    ) {
      return true;
    }
  }, []);

  // 空:趨勢向下跌破五日線挑戰布林中線
  /* 
    1. 找趨勢往下
   */
  const strategy4 = useCallback((data: FinialDataType[]) => {
    const lastIndex = data.length - 1;
    if (
      // EMA
      data[lastIndex]?.v > 3000 &&
      data[lastIndex]?.l < data[lastIndex - 1]?.l &&
      data[lastIndex]?.h > data[lastIndex]?.ma20 &&
      data[lastIndex]?.c < data[lastIndex]?.ma20 &&
      data[lastIndex]?.c < data[lastIndex]?.o &&
      // OBV
      slope([
        data[lastIndex - 2].obv,
        data[lastIndex - 1].obv,
        data[lastIndex].obv,
      ]) < 0 &&
      // MACD
      data[lastIndex]?.osc < data[lastIndex - 1]?.osc &&
      data[lastIndex]?.dif < data[lastIndex - 1]?.dif &&
      data[lastIndex]?.osc < 0 &&
      // KD
      data[lastIndex]?.k < data[lastIndex - 1]?.k &&
      data[lastIndex]?.d < data[lastIndex - 1]?.d &&
      data[lastIndex]?.k > 20
    ) {
      return true;
    }
  }, []);

  return {
    strategy1,
    strategy2,
    strategy3,
    strategy4,
  };
}