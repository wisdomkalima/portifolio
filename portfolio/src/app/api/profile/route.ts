
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const profile = await prisma.profile.findFirst();
        return NextResponse.json(profile || {});
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const data = await request.json();
        // Assuming ID 1 is the main profile, or use upsert logic
        const profile = await prisma.profile.upsert({
            where: { id: 1 },
            update: data,
            create: data,
        });
        return NextResponse.json(profile);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
    }
}
