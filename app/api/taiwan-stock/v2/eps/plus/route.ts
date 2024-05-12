import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

export type V2EpsPlusResponseRow = {
  stock_id: string;
  stock_name: string;
  enabled: boolean;
  eps: [{ season: string; eps_data: string }];
};
export type V2EpsPlusResponse = V2EpsPlusResponseRow[];

export const GET = async (req: Request) => {
  try {
    const prisma = new PrismaClient();

    const res = await prisma.stock.findMany({
      where: {
        enabled: true,
      },
      include: {
        eps: {
          where: {},
          orderBy: {
            season: 'desc',
          },
          distinct: ['season'],
          select: {
            season: true,
            eps_data: true,
          },
          take: 1,
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
