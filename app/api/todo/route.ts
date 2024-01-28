import { NextResponse } from "next/server";

export async function GET() {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos/");
    const todos:Todo = await res.json();
    return NextResponse.json(todos);
}

export async function POST(req: Request) {
    const {userId,  title}:Partial<Todo> = await req.json();
    if(!userId)  return NextResponse.json({error: "userId is required"}, {status: 400});
    else if(!title) return NextResponse.json({error: "title is required"}, {status: 400});

    const res = await fetch("https://jsonplaceholder.typicode.com/todos/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "API-Key": "secret" 
        },
        body: JSON.stringify({userId, title, completed: false})
    });

    const todo:Todo = await res.json();
    return NextResponse.json(todo);
}

export async function PUT(req: Request) {
    const {id, userId,  title, completed}:Partial<Todo> = await req.json();
    if(!id)  return NextResponse.json({error: "id is required"}, {status: 400});
    else if(!userId)  return NextResponse.json({error: "userId is required"}, {status: 400});
    else if(!title) return NextResponse.json({error: "title is required"}, {status: 400});
    else if(!completed) return NextResponse.json({error: "completed is required"}, {status: 400});

    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "API-Key": "secret" 
        },
        body: JSON.stringify({userId, title, completed})
    });

    const todo:Todo = await res.json();
    return NextResponse.json(todo);
}

export async function DELETE(req: Request) {
    const {id}:Partial<Todo> = await req.json();
    if(!id)  return NextResponse.json({error: "id is required"}, {status: 400});

    await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "API-Key": "secret" 
        }
    });
    return NextResponse.json({message: `Todo ${id} deleted`});
}