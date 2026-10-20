import { NextResponse } from 'next/server';
import { getDatabaseClient } from '@/lib/server/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const events = await getDatabaseClient().event.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { date: 'asc' },
      select: {
        id: true,
        title: true,
        description: true,
        type: true,
        date: true,
        startTime: true,
        endTime: true,
        locationName: true,
        capacity: true,
        audience: true,
      },
    });
    return NextResponse.json({ events }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    console.error('Public events query failed:', error);
    return NextResponse.json({ error: 'Events are temporarily unavailable.' }, { status: 503 });
  }
}
