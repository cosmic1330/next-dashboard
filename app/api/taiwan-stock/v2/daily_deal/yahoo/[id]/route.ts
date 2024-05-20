import { ItemType } from '@/app/selectstock/(components)/Container/CacheTable/type';
import formateIsoDate from '@/utils/formateIsoDate';
import { NextResponse } from 'next/server';

export type V2DailyDealYahooResponseRow = {
  transaction_date: string;
  stock_id: string;
  stock_name: string;
  volume: number;
  open_price: string;
  close_price: string;
  high_price: string;
  low_price: string;
  legal_person: [
    {
      transaction_date: Date;
      stock_id: string;
      stock_name: string;
      foreign_investors: number;
      investment_trust: number;
      dealer: number;
    },
  ];
};

export type V2DailyDealYahooResponse = V2DailyDealYahooResponseRow[];

export const GET = async (req: Request) => {
  try {
    const id = req.url.split('/')[req.url.split('/').length - 1];

    // fetch fresh data from the DB
    let res1 = await fetch(
      `https://tw.quote.finance.yahoo.net/quote/q?type=ta&perd=d&mkt=10&sym=${id}&v=1&callback=`,{
        cache: 'no-store',
      }
    ).then((res1) => res1.text());
    res1 = res1.replace(/^\(|\);$/g, '');
    let parse = JSON.parse(res1);
    let ta = parse.ta as ItemType;

    // unable to fetch data from DB, return data from Yahoo
    const arr = ta.map((item, index) => {
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
