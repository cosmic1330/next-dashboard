import redis from '@/lib/redis/helper';
import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
  // build a key (it does not matter how)
  const key = `stocks`;
  // try fetch cached data
  let cached = await redis.get(key);

  // if cached, we're good!
  if (cached) {
    cached = JSON.parse(cached);
    return NextResponse.json(cached, {
      headers: { 'x-cache': 'HIT' },
    });
  }

  // fetch fresh data from the DB
  let res = await fetch(
    `https://www.twse.com.tw/rwd/zh/afterTrading/BWIBBU_d?response=json&_=1688900750130`,
  );
  res = await res.json();

  // cache data setting an expiry of 1 hour
  // this means that the cached data will remain alive for 60 minutes
  // after that, we'll get fresh data from the DB
  const MAX_AGE = 60_000 * 60; // 1 hour
  const EXPIRY_MS = `PX`; // milliseconds

  // cache data
  await redis.set(key, JSON.stringify(res), EXPIRY_MS, MAX_AGE);

  // return data to client
  return NextResponse.json(res, {
    headers: { 'x-cache': 'MISS' },
  });
};
