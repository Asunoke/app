import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { headers } from 'next/headers';

// GET - Récupérer une station par ID
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const station = await prisma.station.findUnique({
      where: { id },
      include: {
        manager: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });

    if (!station) {
      return NextResponse.json({ error: 'Station non trouvée' }, { status: 404 });
    }

    return NextResponse.json(station);
  } catch (error) {
    console.error('Error fetching station:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération de la station' },
      { status: 500 }
    );
  }
}

// PUT - Mettre à jour une station
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    // Vérifier si l'utilisateur est admin ou manager
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        station: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
    }

    const body = await request.json();
    const { name, code, mapsCode, address, status, managerId } = body;

    // Si l'utilisateur est un manager, il ne peut modifier que le statut de sa propre station
    if (user.role === 'MANAGER') {
      if (user.station?.id !== id) {
        return NextResponse.json({ error: 'Vous ne pouvez modifier que votre propre station' }, { status: 403 });
      }
      
      // Le manager ne peut modifier que le statut
      const station = await prisma.station.update({
        where: { id },
        data: {
          status,
        },
        include: {
          manager: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
            },
          },
        },
      });

      return NextResponse.json(station);
    }

    // Si l'utilisateur est admin, il peut tout modifier
    if (user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Accès refusé' }, { status: 403 });
    }

    const station = await prisma.station.update({
      where: { id },
      data: {
        name,
        code,
        mapsCode,
        address,
        status,
        managerId: managerId || null,
      },
      include: {
        manager: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });

    return NextResponse.json(station);
  } catch (error) {
    console.error('Error updating station:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour de la station' },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer une station
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    // Vérifier si l'utilisateur est admin
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Accès refusé' }, { status: 403 });
    }

    // Vérifier s'il y a des tickets actifs pour cette station
    const activeTickets = await prisma.ticket.count({
      where: {
        stationId: id,
        status: 'active',
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    if (activeTickets > 0) {
      return NextResponse.json(
        { error: `Impossible de supprimer : ${activeTickets} ticket(s) actif(s)` },
        { status: 400 }
      );
    }

    await prisma.station.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Station supprimée avec succès' });
  } catch (error) {
    console.error('Error deleting station:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la suppression de la station' },
      { status: 500 }
    );
  }
}
