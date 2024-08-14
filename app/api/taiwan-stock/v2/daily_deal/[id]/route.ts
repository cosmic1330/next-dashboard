import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { PrismaDailyDealResponseResponse } from '../types';


export const GET = async (req: Request) => {
  try {
    const id = req.url.split('/')[req.url.split('/').length - 1];
    const prisma = new PrismaClient();
    // last
    const res: PrismaDailyDealResponseResponse = await prisma.daily_deal.findMany({
      where: {
        stock_id: id,
      },
      take: 365,
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
    console.log(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
};
