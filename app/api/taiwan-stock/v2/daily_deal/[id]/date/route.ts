import { dateFormat } from '@ch20026103/anysis';
import { Mode } from '@ch20026103/anysis/dist/esm/stockSkills/utils/dateFormat';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { PrismaDailyDealResponse } from '../../types';

export const GET = async (
  req: Request,
  { params }: { params: { id: string } },
) => {
  try {
    const url = new URL(req.url);
    let start = url.searchParams.get('start');
    let end = url.searchParams.get('end');
    if (!start) throw new Error('start is required');
    if (!end) throw new Error('end is required');

    // 驗證並轉換日期
    const startDate = new Date(
      dateFormat(parseInt(start, 10), Mode.NumberToTimeStamp),
    );
    const endDate = new Date(
      dateFormat(parseInt(end, 10), Mode.NumberToTimeStamp),
    );

    const id = params.id;
    const prisma = new PrismaClient();

    const res: PrismaDailyDealResponse = await prisma.daily_deal.findMany({
      where: {
        stock_id: id,
        transaction_date: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        legal_person: {
          select: {
            transaction_date: true,
            foreign_investors: true,
            investment_trust: true,
            dealer: true,
          },
        },
      },
    });
    await prisma.$disconnect();
    // return data to client
    return NextResponse.json(res, {
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
