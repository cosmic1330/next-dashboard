import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

export type V2StocksResponseRow = {
  stock_id: string;
  stock_name: string;
  enabled: boolean;
  listed: boolean;
  eps: [{ season: string; eps_data: string }];
  monthly_revenue: [
    {
      year: number;
      month: number;
      stock_id: string;
      current_month_revenue: number; // 本月營收
      previous_month_revenue: number; // 上月營收
      previous_year_same_month_revenue: number; // 去年同月營收
      month_over_month_revenue: string; // 月增率
      year_over_year_revenue: string; // 年增率
      current_year_cumulative_revenue: number; // 本年累計營收
      previous_year_cumulative_revenue: number; // 去年累計營收
      compare_cumulative_revenue: string; // 累計營收比較
    },
  ];
};
export type V2StocksResponse = V2StocksResponseRow[];

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
        monthly_revenue: {
          where: {},
          orderBy: {
            year: 'desc',
          },
          distinct: ['year', 'month'],
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
