import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { headers } from 'next/headers';

function generateTicketId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function GET(request: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const tickets = await prisma.ticket.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        station: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(tickets);
  } catch (error) {
    console.error('Error fetching tickets:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tickets' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { stationId } = body;

    // Check if user already has an active ticket for this station
    const existingTicket = await prisma.ticket.findFirst({
      where: {
        userId: session.user.id,
        stationId,
        status: 'active',
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    if (existingTicket) {
      return NextResponse.json(
        { error: 'Vous avez déjà un ticket actif pour cette station' },
        { status: 400 }
      );
    }

    // Create ticket that expires in 2 hours
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 2);

    const ticket = await prisma.ticket.create({
      data: {
        ticketId: generateTicketId(),
        userId: session.user.id,
        stationId,
        status: 'active',
        expiresAt,
      },
      include: {
        station: true,
      },
    });

    return NextResponse.json(ticket);
  } catch (error) {
    console.error('Error creating ticket:', error);
    return NextResponse.json(
      { error: 'Failed to create ticket' },
      { status: 500 }
    );
  }
}
