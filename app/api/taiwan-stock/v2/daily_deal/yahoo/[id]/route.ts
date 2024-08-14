import formateIsoDate from '@/utils/formateIsoDate';
import { NextResponse } from 'next/server';
import { YahooDailyDealResponseResponse } from '../../types';

type TaType = {
  t: number;
  o: number;
  h: number;
  l: number;
  c: number;
  v: number;
};

export const GET = async (req: Request) => {
  try {
    const id = req.url.split('/')[req.url.split('/').length - 1];

    // fetch fresh data from the DB
    let res1 = await fetch(
      `https://tw.quote.finance.yahoo.net/quote/q?type=ta&perd=d&mkt=10&sym=${id}&v=1&callback=`,
      {
        cache: 'no-store',
      },
    ).then((res1) => res1.text());
    res1 = res1.replace(/^\(|\);$/g, '');
    let parse = JSON.parse(res1);
    let ta: TaType[] = parse.ta;

    // unable to fetch data from DB, return data from Yahoo
    const arr: YahooDailyDealResponseResponse = ta.map((item, index) => {
      return {
        transaction_date: formateIsoDate(item.t) + 'T00:00:00.000Z',
        stock_id: parse.mem.id,
        stock_name: parse.mem.name,
        volume: item.v,
        open_price: item.o,
        close_price: item.c,
        high_price: item.h,
        low_price: item.l,
        legal_person: [
          {
            transaction_date: formateIsoDate(item.t) + 'T00:00:00.000Z',
            foreign_investors: 0,
            investment_trust: 0,
            dealer: 0,
          },
        ],
      };
    });
    return NextResponse.json(arr, {
      headers: { 'x-cache': 'MISS' },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
};
