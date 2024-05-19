import { ItemType } from '@/app/selectstock/(components)/Container/CacheTable/type';
import redis from '@/lib/redis/helper';
import { Boll, Kd, Ma, Macd, Obv } from '@ch20026103/anysis';
import { NextResponse } from 'next/server';

// export finialData type
export type FinialDayDataType = {
  date: string;
  o: number;
  h: number;
  l: number;
  c: number;
  v: number;
  t: number;
  ema12: number;
  ema26: number;
  macd: number;
  osc: number;
  dif: number;
  rsv: number;
  k: number;
  d: number;
  'k-d': number;
  ma5: number;
  ma10: number;
  ma20: number;
  ma60: number;
  bollMa: number;
  bollUb: number;
  bollLb: number;
  obv: number;
  obvMa5: number;
  obvMa10: number;
};

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const stockId = searchParams.get('stockId');
    if (!stockId)
      return NextResponse.json(
        { error: 'stockId is required' },
        { status: 400 },
      );
    const key = `yahoo-${stockId}`;
    try {
      if (redis) {
        let cached = await redis?.get(key);
        if (cached) {
          cached = JSON.parse(cached);
          return NextResponse.json(cached, {
            headers: { 'x-cache': 'HIT' },
          });
        }
      }
    } catch (error) {
      console.error('Error getting from Redis:', error);
    }

    // fetch fresh data from the DB
    let res = await fetch(
      `https://tw.quote.finance.yahoo.net/quote/q?type=ta&perd=d&mkt=10&sym=${stockId}&v=1&callback=`,
    ).then((res) => res.text());
    res = res.replace(/^\(|\);$/g, '');
    let parse = JSON.parse(res);
    let ta = parse.ta as ItemType;
    // calculate technical analysis
    const obv = new Obv();
    const macd = new Macd();
    const kd = new Kd();
    const ma = new Ma();
    const boll = new Boll();
    let obv5Data = obv.init(ta[0], 5);
    let obv10Data = obv.init(ta[0], 10);
    let macdData = macd.init(ta[0]);
    let kdData = kd.init(ta[0]);
    let ma5Data = ma.init(ta[0], 5);
    let ma10Data = ma.init(ta[0], 10);
    let ma20Data = ma.init(ta[0], 20);
    let ma60Data = ma.init(ta[0], 60);
    let bollData = boll.init(ta[0]);
    let finallyData = [
      {
        ...ta[0],
        ema12: macdData.ema12,
        ema26: macdData.ema26,
        macd: macdData.macd,
        osc: macdData.osc,
        dif: macdData.dif[macdData.dif.length - 1],
        obv: obv5Data.obv,
        obvMa5: obv5Data.obvMa,
        obvMa10: obv10Data.obvMa,
        rsv: kdData.rsv,
        k: kdData.k,
        d: kdData.d,
        'k-d': kdData['k-d'],
        ma5: ma5Data.ma,
        ma10: ma10Data.ma,
        ma20: ma20Data.ma,
        ma60: ma60Data.ma,
        bollMa: bollData.bollMa,
        bollUb: bollData.bollUb,
        bollLb: bollData.bollLb,
      },
    ];
    for (let i = 1; i < ta.length; i++) {
      obv5Data = obv.next(ta[i], obv5Data, 5);
      obv10Data = obv.next(ta[i], obv5Data, 10);
      macdData = macd.next(ta[i], macdData);
      kdData = kd.next(ta[i], kdData, 9);
      ma5Data = ma.next(ta[i], ma5Data, 5);
      ma10Data = ma.next(ta[i], ma10Data, 10);
      ma20Data = ma.next(ta[i], ma20Data, 20);
      bollData = boll.next(ta[i], bollData, 20);
      finallyData.push({
        ...ta[i],
        ema12: macdData.ema12,
        ema26: macdData.ema26,
        macd: macdData.macd,
        osc: macdData.osc,
        dif: macdData.dif[macdData.dif.length - 1],
        obv: obv5Data.obv,
        obvMa5: obv5Data.obvMa,
        obvMa10: obv10Data.obvMa,
        rsv: kdData.rsv,
        k: kdData.k,
        d: kdData.d,
        'k-d': kdData['k-d'],
        ma5: ma5Data.ma,
        ma10: ma10Data.ma,
        ma20: ma20Data.ma,
        ma60: ma60Data.ma,
        bollMa: bollData.bollMa,
        bollUb: bollData.bollUb,
        bollLb: bollData.bollLb,
      });
    }
    try {
      if (redis) {
        const MAX_AGE = 60_000 * 60; // 1 hour
        const EXPIRY_MS = `PX`; // milliseconds
        await redis?.set(key, JSON.stringify(finallyData), EXPIRY_MS, MAX_AGE);
      }
    } catch (error) {
      console.error('Error setting to Redis:', error);
    }

    return NextResponse.json(finallyData, {
      headers: { 'x-cache': 'MISS' },
    });
  } catch (error) {
    console.error('Day API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stock data.' },
      { status: 500 },
    );
  }
};
