#!/usr/bin/env node

/**
 * Script de diagnostic pour vérifier les stations dans la base de données
 */

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkStations() {
  console.log('🔍 Vérification des stations dans la base de données...\n');

  try {
    const stations = await prisma.station.findMany({
      include: {
        manager: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        _count: {
          select: {
            tickets: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    console.log(`📊 Total: ${stations.length} station(s) trouvée(s)\n`);

    if (stations.length === 0) {
      console.log('⚠️  Aucune station dans la base de données');
      console.log('💡 Exécutez: npm run db:seed pour ajouter des stations de test\n');
      return;
    }

    stations.forEach((station, index) => {
      console.log(`${index + 1}. ${station.name}`);
      console.log(`   Code: ${station.code}`);
      console.log(`   Statut: ${station.status === 'open' ? '🟢 Ouvert' : '🔴 Fermé'}`);
      console.log(`   Coordonnées: ${station.latitude}, ${station.longitude}`);
      if (station.address) {
        console.log(`   Adresse: ${station.address}`);
      }
      if (station.manager) {
        console.log(`   Manager: ${station.manager.name || station.manager.email} (${station.manager.role})`);
      } else {
        console.log(`   Manager: Aucun`);
      }
      console.log(`   Tickets: ${station._count.tickets}`);
      console.log(`   Créée le: ${station.createdAt.toLocaleString('fr-FR')}`);
      console.log('');
    });

    console.log('✅ Vérification terminée\n');

  } catch (error) {
    console.error('❌ Erreur lors de la vérification:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

checkStations();
