import { NextResponse } from 'next/server';

export async function GET() {
  const todos = { id: 'test59' };
  return NextResponse.json(todos);
}
