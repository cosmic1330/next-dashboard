import redis from '@/lib/redis';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { PrismaDailyDealResponse } from '../types';

export const GET = async (
  req: Request,
  { params }: { params: { id: string } },
) => {
  try {
    const id = params.id;
    const prisma = new PrismaClient();

    const key = `stock:${id}:data`;
    if (redis) {
      let cached = await redis?.get(key);
      if (cached) {
        cached = JSON.parse(cached);
        return NextResponse.json(cached, {
          headers: { 'x-cache': 'HIT' },
        });
      }
    }

    // last
    const res: PrismaDailyDealResponse = await prisma.daily_deal.findMany({
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

    // key 隔日六點到期
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    tomorrow.setHours(18, 0, 0, 0);
    const expiryTimeInSeconds = Math.floor(tomorrow.getTime() / 1000);

    if (redis) {
      await redis?.set(key, JSON.stringify(res), 'EXAT', expiryTimeInSeconds);
    }
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
