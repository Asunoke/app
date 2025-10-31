/**
 * Script pour mettre à jour les codes Google Maps des stations existantes
 * 
 * Usage:
 * node scripts/update-stations-maps-code.js
 * 
 * Ce script permet de mettre à jour manuellement les codes maps des stations
 * après la migration de latitude/longitude vers mapsCode
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateStationsMapsCode() {
  console.log('🔄 Mise à jour des codes Google Maps des stations...\n');

  try {
    // Récupérer toutes les stations
    const stations = await prisma.station.findMany({
      select: {
        id: true,
        name: true,
        code: true,
        mapsCode: true,
      },
    });

    console.log(`📊 ${stations.length} station(s) trouvée(s)\n`);

    // Afficher les stations avec leur code maps actuel
    stations.forEach((station, index) => {
      console.log(`${index + 1}. ${station.name} (${station.code})`);
      console.log(`   Code Maps actuel: ${station.mapsCode}`);
      console.log('');
    });

    console.log('\n📝 Instructions pour mettre à jour:');
    console.log('1. Connectez-vous au dashboard en tant qu\'admin');
    console.log('2. Allez dans l\'onglet "Stations"');
    console.log('3. Cliquez sur "✏️ Modifier" pour chaque station');
    console.log('4. Obtenez le code Google Maps:');
    console.log('   - Ouvrez Google Maps');
    console.log('   - Trouvez la localisation exacte');
    console.log('   - Clic droit ou appui long sur le point');
    console.log('   - Copiez le Plus Code (ex: M4H8+H57)');
    console.log('5. Collez le code dans le champ "Code Google Maps"');
    console.log('6. Cliquez sur "Mettre à jour"\n');

    console.log('✅ Vérification terminée!');
  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Exécuter le script
updateStationsMapsCode();
