import redis from '@/lib/redis/helper';
import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
  const key = `stocks`;
  if (redis) {
    let cached = await redis?.get(key);
    if (cached) {
      cached = JSON.parse(cached);
      return NextResponse.json(cached, {
        headers: { 'x-cache': 'HIT' },
      });
    }
  }

  let res = await fetch(
    `https://www.twse.com.tw/rwd/zh/afterTrading/BWIBBU_d?response=json&_=1688900750130`,
  );
  res = await res.json();

  if (redis) {
    const MAX_AGE = 60_000 * 60; // 1 hour
    const EXPIRY_MS = `PX`; // milliseconds
    await redis?.set(key, JSON.stringify(res), EXPIRY_MS, MAX_AGE);
  }

  // return data to client
  return NextResponse.json(res, {
    headers: { 'x-cache': 'MISS' },
  });
};
