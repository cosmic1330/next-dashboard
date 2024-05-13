import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

export type V2DailyDealResponseRow = {
  transaction_date: string;
  stock_id: string;
  stock_name: string;
  volume: number;
  open_price: string;
  close_price: string;
  high_price: string;
  low_price: string;
};

export type V2DailyDealResponse = V2DailyDealResponseRow[];

export const GET = async (req: Request) => {
  try {
    const id = req.url.split('/')[req.url.split('/').length - 1];
    const prisma = new PrismaClient();
    // last
    const res = await prisma.daily_deal.findFirst({
      where: {
        stock_id: id,
      },
      orderBy: {
        transaction_date: 'desc',
      },
    });
    await prisma.$disconnect();
    // return data to client
    return NextResponse.json(res, {
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
