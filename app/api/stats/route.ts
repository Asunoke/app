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

    // Taux de satisfaction fixé à 99%
    const satisfactionRate = 99;

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
