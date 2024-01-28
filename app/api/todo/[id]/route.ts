import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const id = req.url.split('/')[req.url.split('/').length - 1];
  const res = await fetch('https://jsonplaceholder.typicode.com/todos/' + id);
  const todo: Todo = await res.json();
  if (!todo.id)
    return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
  return NextResponse.json(todo);
}
