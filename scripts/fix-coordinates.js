#!/usr/bin/env node

/**
 * Script pour corriger les coordonnées des stations hors de Bamako
 */

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Coordonnées de Bamako
const BAMAKO_CENTER = {
  lat: 12.6392,
  lng: -8.0029,
};

// Limites de Bamako (approximatives)
const BAMAKO_BOUNDS = {
  minLat: 12.5,
  maxLat: 12.7,
  minLng: -8.1,
  maxLng: -7.9,
};

function isInBamako(lat, lng) {
  return (
    lat >= BAMAKO_BOUNDS.minLat &&
    lat <= BAMAKO_BOUNDS.maxLat &&
    lng >= BAMAKO_BOUNDS.minLng &&
    lng <= BAMAKO_BOUNDS.maxLng
  );
}

async function fixCoordinates() {
  console.log('🔧 Vérification des coordonnées des stations...\n');

  try {
    const stations = await prisma.station.findMany();
    
    let fixed = 0;
    let correct = 0;

    for (const station of stations) {
      const inBamako = isInBamako(station.latitude, station.longitude);
      
      if (!inBamako) {
        console.log(`❌ ${station.name} (${station.code})`);
        console.log(`   Coordonnées actuelles: ${station.latitude}, ${station.longitude}`);
        console.log(`   ⚠️  Hors de Bamako !`);
        
        // Mettre à jour avec les coordonnées du centre de Bamako
        await prisma.station.update({
          where: { id: station.id },
          data: {
            latitude: BAMAKO_CENTER.lat,
            longitude: BAMAKO_CENTER.lng,
          },
        });
        
        console.log(`   ✅ Corrigé → ${BAMAKO_CENTER.lat}, ${BAMAKO_CENTER.lng}\n`);
        fixed++;
      } else {
        console.log(`✅ ${station.name} (${station.code})`);
        console.log(`   Coordonnées: ${station.latitude}, ${station.longitude}\n`);
        correct++;
      }
    }

    console.log('📊 Résumé:');
    console.log(`   ✅ ${correct} station(s) avec coordonnées correctes`);
    console.log(`   🔧 ${fixed} station(s) corrigée(s)`);
    console.log(`   📍 Total: ${stations.length} station(s)\n`);

    if (fixed > 0) {
      console.log('💡 Conseil: Allez dans le Dashboard pour mettre à jour');
      console.log('   les coordonnées exactes de ces stations.\n');
    }

  } catch (error) {
    console.error('❌ Erreur:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

fixCoordinates();
