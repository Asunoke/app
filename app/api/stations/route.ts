import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const stations = await prisma.station.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json(stations);
  } catch (error) {
    console.error('Error fetching stations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stations' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, code, mapsCode, address, managerId } = body;

    const station = await prisma.station.create({
      data: {
        name,
        code,
        mapsCode,
        address,
        managerId,
        status: 'open',
      },
    });

    return NextResponse.json(station);
  } catch (error) {
    console.error('Error creating station:', error);
    return NextResponse.json(
      { error: 'Failed to create station' },
      { status: 500 }
    );
  }
}
