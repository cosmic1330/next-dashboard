import redis from '@/lib/redis/helper';
import { NextResponse } from 'next/server';
import { StocksType } from './types';

export type V1StocksResponse = StocksType[];
export const GET = async (req: Request) => {
  const key = `stocks`;
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

  let res = await fetch(
    `https://www.twse.com.tw/rwd/zh/afterTrading/BWIBBU_d?response=json&_=1688900750130`,
  );
  res = await res.json();

  try {
    if (redis) {
      await redis?.set(key, JSON.stringify(res));
      await redis?.expire(key, 60 * 30);
    }
  } catch (error) {
    console.error('Error setting to Redis:', error);
  }

  // return data to client
  return NextResponse.json(res, {
    headers: { 'x-cache': 'MISS' },
  });
};
