
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    // Admin only - TODO: Add auth check
    try {
        const data = await prisma.message.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const created = await prisma.message.create({
            data: {
                name: data.name,
                email: data.email,
                content: data.content,
            },
        });
        return NextResponse.json(created);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
    }
}
