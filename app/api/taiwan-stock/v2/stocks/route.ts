import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

export type V2StocksResponseRow = {
  stock_id: string;
  stock_name: string;
  enabled: boolean;
};
export type V2StocksResponse = V2StocksResponseRow[];

export const GET = async (req: Request) => {
  try {
    const id = req.url.split('/')[req.url.split('/').length - 1];
    const prisma = new PrismaClient();
    // last
    const res = await prisma.stock.findMany({
      where: {
        enabled: true,
      },
      orderBy: {
        stock_id: 'asc',
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
