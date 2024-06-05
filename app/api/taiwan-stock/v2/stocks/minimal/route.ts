import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

export type V2StocksMinimalResponseRow = {
  stock_id: string;
  stock_name: string;
  enabled: boolean;
  listed: boolean;
};
export type V2StocksMinimalResponse = V2StocksMinimalResponseRow[];

export const GET = async (req: Request) => {
  try {
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
