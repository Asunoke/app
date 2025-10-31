import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { headers } from 'next/headers';

export async function POST(request: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is admin or manager
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        station: true,
      },
    });

    if (!user || (user.role !== 'ADMIN' && user.role !== 'MANAGER')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const { ticketId, action } = body;

    // Find the ticket
    const ticket = await prisma.ticket.findUnique({
      where: { ticketId },
      include: {
        station: true,
      },
    });

    if (!ticket) {
      return NextResponse.json(
        { message: 'Ticket non trouvé' },
        { status: 404 }
      );
    }

    // If manager, check if ticket belongs to their station
    if (user.role === 'MANAGER') {
      if (!user.station || ticket.stationId !== user.station.id) {
        return NextResponse.json(
          { message: 'Ce ticket n\'appartient pas à votre station' },
          { status: 403 }
        );
      }
    }

    // Check if ticket is still valid
    if (ticket.status !== 'active') {
      return NextResponse.json(
        { message: 'Ce ticket n\'est plus actif' },
        { status: 400 }
      );
    }

    if (new Date(ticket.expiresAt) < new Date()) {
      return NextResponse.json(
        { message: 'Ce ticket a expiré' },
        { status: 400 }
      );
    }

    // Update ticket status
    const updatedTicket = await prisma.ticket.update({
      where: { id: ticket.id },
      data: {
        status: action === 'validate' ? 'used' : 'rejected',
      },
    });

    return NextResponse.json({
      message: action === 'validate' ? 'Ticket validé' : 'Ticket rejeté',
      ticket: updatedTicket,
    });
  } catch (error) {
    console.error('Error validating ticket:', error);
    return NextResponse.json(
      { error: 'Failed to validate ticket' },
      { status: 500 }
    );
  }
}
