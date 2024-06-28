import { ItemType } from '@/app/selectstock/(components)/Container/CacheTable/type';
import redis from '@/lib/redis/helper';
import { getWeekLine, Ma } from '@ch20026103/anysis';
import { NextResponse } from 'next/server';

// export finialData type
export type FinialWeekDataType = {
  h: number;
  t: number;
  o: number;
  c: number;
  l: number;
  detail?: { h: number; t: number; o: number; c: number; l: number }[];
  weekMa5: number;
  weekMa10: number;
  weekMa20: number;
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
    const key = `yahoo-week-${stockId}`;

    try {
      if (redis) {
        // try fetch cached data
        let cached = await redis?.get(key);
        // if cached, we're good!
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
    const weekData = getWeekLine(ta, true);
    const ma = new Ma();
    let weekMa5Data = ma.init(weekData[0], 5);
    let weekMa10Data = ma.init(weekData[0], 10);
    let weekMa20Data = ma.init(weekData[0], 20);

    let finallyData = [
      {
        ...weekData[0],
        weekMa5: weekMa5Data.ma,
        weekMa10: weekMa10Data.ma,
        weekMa20: weekMa20Data.ma,
      },
    ];
    for (let i = 1; i < weekData.length; i++) {
      weekMa5Data = ma.next(weekData[i], weekMa5Data, 5);
      weekMa10Data = ma.next(weekData[i], weekMa10Data, 10);
      weekMa20Data = ma.next(weekData[i], weekMa20Data, 20);

      finallyData.push({
        ...weekData[i],
        weekMa5: weekMa5Data.ma,
        weekMa10: weekMa10Data.ma,
        weekMa20: weekMa20Data.ma,
      });
    }
    try {
      if (redis) {
        await redis?.set(key, JSON.stringify(finallyData));
        await redis?.expire(key, 60*30);
      }
    } catch (error) {
      console.error('Error setting to Redis:', error);
    }

    return NextResponse.json(finallyData, {
      headers: { 'x-cache': 'MISS' },
    });
  } catch (error) {
    console.error('Week API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stock data.' },
      { status: 500 },
    );
  }
};
