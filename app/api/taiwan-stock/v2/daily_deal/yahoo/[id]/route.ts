import formateIsoDate from '@/utils/formateIsoDate';
import { NextResponse } from 'next/server';
import { YahooDailyDealResponse } from '../../types';

type TaType = {
  t: number;
  o: number;
  h: number;
  l: number;
  c: number;
  v: number;
};

export const GET = async (
  req: Request,
  { params }: { params: { id: string } },
) => {
  try {
    const id = params.id;

    // fetch fresh data from the DB
    let response = await fetch(
      `https://tw.quote.finance.yahoo.net/quote/q?type=ta&perd=d&mkt=10&sym=${id}&v=1&callback=`,
      {
        cache: 'no-store',
      },
    ).then((res) => res.text());

    let ta_index = response.indexOf('"ta":');
    let json_ta = '{' + response.slice(ta_index).replace(');', '');
    let parse = JSON.parse(json_ta);
    let ta: TaType[] = parse.ta;

    let idMatch = response.slice(0, ta_index).match(/"id":"(\d+)"/);
    let nameMatch = response.slice(0, ta_index).match(/"name":"([^"]+)"/);
    let stock_id = idMatch ? idMatch[1] : null;
    let stock_name = nameMatch ? nameMatch[1] : null;

    // unable to fetch data from DB, return data from Yahoo
    const arr: YahooDailyDealResponse = ta.map((item, index) => {
      return {
        transaction_date: formateIsoDate(item.t) + 'T00:00:00.000Z',
        stock_id,
        stock_name,
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
      { error: 'Internal Server Error', message: error },
      { status: 500 },
    );
  }
};
