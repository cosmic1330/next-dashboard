import { FinialDayDataType } from '@/app/api/taiwan-stock/v1/stocks/id/day/route';
import { FinialWeekDataType } from '@/app/api/taiwan-stock/v1/stocks/id/week/route';

import { Ema, slope } from '@ch20026103/anysis';
import { useCallback } from 'react';

export default function useStrategy() {
  // 可能多:布林軌道縮口變開口
  /*
    1. 找趨勢往上
    2. 明日K棒不破前低且收紅
   */
  const strategy1 = useCallback((data: FinialDayDataType[]) => {
    try {
      const lastIndex = data.length - 1;
      if (
        data[lastIndex]?.v > 2000 &&
        data[lastIndex]?.c > data[lastIndex]?.ma5 &&
        data[lastIndex]?.l > data[lastIndex - 1]?.l &&
        data[lastIndex]?.c > data[lastIndex]?.o &&
        // EMA
        data[lastIndex]?.ma5 > data[lastIndex]?.ma10 &&
        data[lastIndex]?.ma10 > data[lastIndex]?.ma20 &&
        data[lastIndex]?.ma5 > data[lastIndex]?.ma20 &&
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
          data.map((item: FinialDayDataType) => item.obv),
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
    3. 紅二兵
   */
  const strategy2 = useCallback((data: FinialDayDataType[]) => {
    try {
      const lastIndex = data.length - 1;
      if (
        data[lastIndex]?.v > 1000 &&
        data[lastIndex]?.c > data[lastIndex]?.ma5 &&
        data[lastIndex]?.l > data[lastIndex - 1]?.l &&
        data[lastIndex]?.c > data[lastIndex]?.o &&
        data[lastIndex - 1]?.c > data[lastIndex - 1]?.o &&
        // EMA
        data[lastIndex]?.ma5 > data[lastIndex]?.ma10 &&
        data[lastIndex]?.ma10 > data[lastIndex]?.ma20 &&
        data[lastIndex]?.ma5 > data[lastIndex]?.ma20 &&
        // Boll
        // 1. 昨日K棒穿過布林中線
        data[lastIndex - 1]?.c > data[lastIndex - 1]?.bollMa &&
        data[lastIndex - 1]?.l < data[lastIndex - 1]?.bollMa &&
        // 2. 今日K棒在完整布林中線上方
        data[lastIndex]?.c > data[lastIndex]?.bollMa &&
        data[lastIndex]?.l > data[lastIndex]?.bollMa &&
        // KD
        data[lastIndex]?.k > data[lastIndex]?.d &&
        data[lastIndex - 1]?.k < data[lastIndex - 1]?.d
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
    4. 滿足條件做多: 整體趨勢向上，前段為盤整，為做多位置 
    5. 滿足條件做空: 看趨勢向下，且觀察日後未站上月線為做空位置
   */
  const strategy3 = useCallback((data: FinialDayDataType[]) => {
    const lastIndex = data.length - 1;
    if (
      // EMA
      data[lastIndex]?.v > 2000 &&
      data[lastIndex]?.l > data[lastIndex - 1]?.l &&
      data[lastIndex]?.h > data[lastIndex - 1]?.h &&
      data[lastIndex]?.c > data[lastIndex - 1]?.h &&
      data[lastIndex]?.c > data[lastIndex]?.o &&
      // Boll
      // 1. 昨日K棒穿過布林底線
      data[lastIndex - 1]?.l < data[lastIndex - 1]?.bollLb &&
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

  // KD選股
  /* 
    日線
    1. 近期KD黃金交叉
    2. 20MA趨勢往上
    3. 大於60MA
    4. 站上5MA
    5. 吞噬前日低價
   */
  const strategy4 = useCallback(
    (data: FinialDayDataType[]) => {
      const lastIndex = data.length - 1;
      if (
        data[lastIndex]?.v > 1000 &&
        data[lastIndex]?.c > data[lastIndex - 2]?.l &&
        data[lastIndex]?.l > data[lastIndex - 1]?.l &&
        data[lastIndex]?.c > data[lastIndex - 1]?.h &&
        data[lastIndex]?.c > data[lastIndex]?.ma60 &&
        data[lastIndex]?.c > data[lastIndex]?.ma20 &&
        data[lastIndex]?.c > data[lastIndex]?.ma5 &&
        // EMA
        data[lastIndex]?.ma5 > data[lastIndex]?.ma10 &&
        data[lastIndex]?.ma10 > data[lastIndex]?.ma20 &&
        data[lastIndex]?.ma5 > data[lastIndex]?.ma20 &&
        // MACD 黃金交叉
        // data[lastIndex]?.dif > data[lastIndex]?.macd &&
        // data[lastIndex - 1]?.dif < data[lastIndex - 1]?.macd &&
        data[lastIndex]?.osc > data[lastIndex - 1]?.osc &&
        // KD
        ((data[lastIndex]?.k > data[lastIndex]?.d &&
          data[lastIndex - 1]?.k < data[lastIndex - 1]?.d) ||
          (data[lastIndex - 1]?.k > data[lastIndex - 1]?.d &&
            data[lastIndex - 2]?.k < data[lastIndex - 2]?.d))
      ) {
        return true;
      }
    },
    [],
  );

  // V轉
  /*
   */
  const strategy5 = useCallback(
    (data: FinialDayDataType[]) => {
      const lastIndex = data.length - 1;
      if (
        // 正向排列
        data[lastIndex]?.ma5 > data[lastIndex]?.ma10 &&
        data[lastIndex]?.ma10 > data[lastIndex]?.ma20 &&
        data[lastIndex]?.ma5 > data[lastIndex]?.ma20 &&
        data[lastIndex]?.ma20 > data[lastIndex - 1]?.ma20 &&
        (data[lastIndex - 1]?.ma5 < data[lastIndex - 1]?.ma10 ||
          data[lastIndex - 1]?.ma10 < data[lastIndex - 1]?.ma20) &&
        // EMA
        data[lastIndex]?.v > 1000 &&
        data[lastIndex]?.c > data[lastIndex - 1]?.h &&
        data[lastIndex]?.v > data[lastIndex - 1]?.v &&
        data[lastIndex]?.c > data[lastIndex]?.ma20 &&
        data[lastIndex]?.l > data[lastIndex - 1]?.l &&
        data[lastIndex - 2]?.l > data[lastIndex - 1]?.l
      ) {
        return true;
      }
    },
    [],
  );

  // 週線正向排列
  /*
  手動尋找0軸之上macd黃金交叉
   */
  const strategy6 = useCallback((data: FinialDayDataType[]) => {}, []);

  // ToDo 短空:趨勢向下大量跌破日線5MA挑戰布林中線
  return {
    strategy1,
    strategy2,
    strategy3,
    strategy4,
    strategy5,
    strategy6,
  };
}
