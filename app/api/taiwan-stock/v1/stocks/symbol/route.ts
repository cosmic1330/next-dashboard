import redis from '@/lib/redis/helper';
import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const stockId = searchParams.get('stockId');
  if (!stockId)
    return NextResponse.json({ error: 'stockId is required' }, { status: 400 });
  // build a key (it does not matter how)
  const key = `yahoo-${stockId}`;

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
    `https://tw.quote.finance.yahoo.net/quote/q?type=ta&perd=d&mkt=10&sym=${stockId}&v=1&callback=`,
  ).then((res) => res.text());
  res = await res.replace(/^\(|\);$/g, '');
  const { ta } = JSON.parse(res);

  // cache data setting an expiry of 1 hour
  // this means that the cached data will remain alive for 60 minutes
  // after that, we'll get fresh data from the DB
  const MAX_AGE = 60_000 * 60; // 1 hour
  const EXPIRY_MS = `PX`; // milliseconds

  // cache data
  await redis.set(key, JSON.stringify(ta), EXPIRY_MS, MAX_AGE);

  // return data to client
  return NextResponse.json(ta, {
    headers: { 'x-cache': 'MISS' },
  });
};

export const PUT = async (req: Request) => {
  const { userId } = await req.json();
};
