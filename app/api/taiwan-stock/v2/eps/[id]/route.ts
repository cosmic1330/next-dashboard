import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

export const GET = async (req: Request,
  { params }: { params: { id: string } }) => {
  try {
    const id = params.id;
    const prisma = new PrismaClient();
    // last
    const res = await prisma.eps.findFirst({
      where: {
        stock_id: id,
      },
      orderBy: {
        season: 'desc',
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
