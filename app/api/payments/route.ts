import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { headers } from 'next/headers';

// POST /api/payments -> confirm payment for a ticket
export async function POST(request: Request) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { ticketId, amount }: { ticketId: string; amount?: number } = body;

    const ticket = await prisma.ticket.findUnique({ where: { ticketId } });
    if (!ticket) {
      return NextResponse.json({ error: 'Ticket non trouvé' }, { status: 404 });
    }
    if (ticket.userId !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // If already paid, return success idempotently via ticket relation
    const ticketWithPayment = await prisma.ticket.findUnique({
      where: { id: ticket.id },
      include: { payment: true },
    });
    if (ticketWithPayment?.payment) {
      if (ticket.status !== 'used') {
        await prisma.ticket.update({ where: { id: ticket.id }, data: { status: 'used' } });
      }
      return NextResponse.json({ message: 'Paiement déjà confirmé', payment: ticketWithPayment.payment });
    }

    // Create payment via nested write on ticket relation
    const updatedWithPayment = await prisma.ticket.update({
      where: { id: ticket.id },
      data: {
        payment: {
          create: {
            userId: session.user.id,
            stationId: ticket.stationId,
            method: 'ORANGE_MONEY',
            amount: amount ?? null,
            status: 'confirmed',
          },
        },
      },
      include: { payment: true },
    });

    // Mark ticket as used immediately
    await prisma.ticket.update({ where: { id: ticket.id }, data: { status: 'used' } });

    return NextResponse.json({ message: 'Paiement confirmé', payment: updatedWithPayment.payment });
  } catch (error) {
    console.error('Error confirming payment:', error);
    return NextResponse.json({ error: 'Failed to confirm payment' }, { status: 500 });
  }
}

// GET /api/payments -> admin only, list recent payments
export async function GET() {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const me = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!me || me.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const payments = await prisma.payment.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        ticket: true,
        station: true,
        user: true,
      },
      take: 200,
    });

    return NextResponse.json(payments);
  } catch (error) {
    console.error('Error fetching payments:', error);
    return NextResponse.json({ error: 'Failed to fetch payments' }, { status: 500 });
  }
}
