import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

export type V2TaiexResponseRow = {
  transaction_date: Date;
  open_price: number;
  close_price: number;
  high_price: number;
  low_price: number;
};
export type V2TaiexResponse = V2TaiexResponseRow[];

export const GET = async (req: Request) => {
  try {
    const prisma = new PrismaClient();
    // last
    const res = await prisma.taiex.findMany({
      orderBy: {
        transaction_date: 'desc',
      },
      take: 300,
    });
    await prisma.$disconnect();
    // return data to client
    return NextResponse.json(res.reverse(), {
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
