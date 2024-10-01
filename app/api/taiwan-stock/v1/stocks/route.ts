import redis from '@/lib/redis';
import { NextResponse } from 'next/server';
import { StocksType } from './types';

export type V1StocksResponse = StocksType[];
export const GET = async (req: Request) => {
  const key = `v1:stocks:ids`;

  try {
    if (redis) {
      let cached = await redis?.get(key);
      if (cached) {
        cached = JSON.parse(cached);
        console.log('cache');
        return NextResponse.json(cached, {
          headers: { 'x-cache': 'HIT' },
        });
      }
    }
  } catch (error) {
    console.error('Error getting from Redis:', error);
  }

  let res = await fetch(
    `https://www.twse.com.tw/rwd/zh/afterTrading/BWIBBU_d?response=json`,
  );
  res = await res.json();

  try {
    if (redis) {
      await redis?.set(key, JSON.stringify(res), 'EX', 5);
    }
  } catch (error) {
    console.error('Error setting to Redis:', error);
  }

  // return data to client
  return NextResponse.json(res, {
    headers: { 'x-cache': 'MISS' },
  });
};
