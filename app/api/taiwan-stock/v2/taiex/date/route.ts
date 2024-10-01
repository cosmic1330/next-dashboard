import { dateFormat } from '@ch20026103/anysis';
import { Mode } from '@ch20026103/anysis/dist/esm/stockSkills/utils/dateFormat';
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
    const url = new URL(req.url);
    const start = url.searchParams.get('start');
    const end = url.searchParams.get('end');
    if (!start) throw new Error('start is required');
    if (!end) throw new Error('end is required');

    // 驗證並轉換日期
    const startDate = new Date(dateFormat(parseInt(start, 10), Mode.NumberToTimeStamp));
    const endDate = new Date(dateFormat(parseInt(end, 10), Mode.NumberToTimeStamp));
    
    const prisma = new PrismaClient();
    // last
    const res = await prisma.taiex.findMany({
      where: {
        transaction_date: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: {
        transaction_date: 'desc',
      },
    });
    await prisma.$disconnect();
    // return data to client
    return NextResponse.json(res.reverse(), {
      headers: { 'x-cache': 'MISS' },
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
};
