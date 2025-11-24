import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const stations = await prisma.station.findMany({
      include: {
        manager: true,
      },
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
    const { name, code, mapsCode, address, managerId, fuels } = body;

    const station = await prisma.station.create({
      data: {
        name,
        code,
        mapsCode,
        address,
        status: 'open',
        fuels: Array.isArray(fuels) ? fuels : [],
        ...(managerId ? { manager: { connect: { id: managerId } } } : {}),
      },
      include: { manager: true },
    });

    if (managerId) {
      await prisma.user.update({ where: { id: managerId }, data: { role: 'MANAGER' } });
    }

    return NextResponse.json(station);
  } catch (error) {
    console.error('Error creating station:', error);
    return NextResponse.json(
      { error: 'Failed to create station' },
      { status: 500 }
    );
  }
}
