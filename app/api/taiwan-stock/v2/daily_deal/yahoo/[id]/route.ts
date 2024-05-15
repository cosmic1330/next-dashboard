import { ItemType } from '@/app/selectstock/(components)/Container/CacheTable/type';
import formateIsoDate from '@/utils/formateIsoDate';
import { PrismaClient } from '@prisma/client';
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
      `https://tw.quote.finance.yahoo.net/quote/q?type=ta&perd=d&mkt=10&sym=${id}&v=1&callback=`,
      { cache: 'no-store' },
    ).then((res1) => res1.text());
    res1 = res1.replace(/^\(|\);$/g, '');
    let parse = JSON.parse(res1);
    let ta = parse.ta as ItemType;

    const prisma = new PrismaClient();
    // last
    const res2 = await prisma.legal_person.findMany({
      where: {
        stock_id: id,
        transaction_date: {
          gte: new Date(formateIsoDate(ta[0].t)), // 大於等於起始日期
          lte: new Date(formateIsoDate(ta[ta.length - 1].t)), // 小於等於結束日期
        },
      },
    });

    await prisma.$disconnect();

    const arr = ta.map((item, index) => {
      if (res2[index]) {
        return {
          transaction_date: formateIsoDate(item.t),
          stock_id: res2[0].stock_id,
          stock_name: res2[0].stock_name,
          volume: item.v,
          open_price: item.o,
          close_price: item.c,
          high_price: item.h,
          low_price: item.l,
          legal_person: [
            {
              transaction_date: formateIsoDate(item.t),
              foreign_investors: res2[index].foreign_investors,
              investment_trust: res2[index].investment_trust,
              dealer: res2[index].dealer,
            },
          ],
        };
      }
      return {
        transaction_date: formateIsoDate(item.t),
        stock_id: res2[0].stock_id,
        stock_name: res2[0].stock_name,
        volume: item.v,
        open_price: item.o,
        close_price: item.c,
        high_price: item.h,
        low_price: item.l,
        legal_person: [
          {
            transaction_date: formateIsoDate(item.t),
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
