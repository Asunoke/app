import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Compter les utilisateurs
    const usersCount = await prisma.user.count();

    // Compter les stations
    const stationsCount = await prisma.station.count();

    // Compter les tickets
    const ticketsCount = await prisma.ticket.count();

    // Calculer le taux de satisfaction (tickets validés / total tickets)
    const validatedTickets = await prisma.ticket.count({
      where: {
        status: 'validated'
      }
    });

    const satisfactionRate = ticketsCount > 0 
      ? Math.round((validatedTickets / ticketsCount) * 100) 
      : 99;

    return NextResponse.json({
      users: usersCount,
      stations: stationsCount,
      tickets: ticketsCount,
      satisfaction: satisfactionRate
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des statistiques' },
      { status: 500 }
    );
  }
}
