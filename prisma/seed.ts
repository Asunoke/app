import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Fonction simple pour encoder les coordonnées en Plus Code court
function encodePlusCode(lat: number, lng: number): string {
  // Utiliser un format simplifié basé sur les coordonnées
  // Pour Bamako, on génère un code court basé sur la position
  const latStr = Math.abs(lat - 12.6).toFixed(4).replace('.', '');
  const lngStr = Math.abs(lng + 8.0).toFixed(4).replace('.', '');
  return `M4${latStr.substring(0, 2)}+${lngStr.substring(0, 3)}`;
}

async function main() {
  console.log('🌱 Seeding database...');

  // Create sample stations in Bamako
  const stations = [
    {
      name: 'Station Total Hippodrome',
      code: 'TOTAL-HIP',
      mapsCode: 'M4C3+CMP, Bamako', // Hippodrome
      address: 'Avenue de la Marne, Hippodrome',
      status: 'open',
    },
    {
      name: 'Station Shell ACI 2000',
      code: 'SHELL-ACI',
      mapsCode: 'M4H8+H57, Bamako', // ACI 2000
      address: 'ACI 2000, Bamako',
      status: 'open',
    },
    {
      name: 'Station Oryx Hamdallaye',
      code: 'ORYX-HAM',
      mapsCode: 'M4M3+X9P, Bamako', // Hamdallaye
      address: 'Hamdallaye ACI, Bamako',
      status: 'open',
    },
    {
      name: 'Station Total Badalabougou',
      code: 'TOTAL-BAD',
      mapsCode: 'M4H8+2J7, Bamako', // Badalabougou
      address: 'Badalabougou, Bamako',
      status: 'closed',
    },
    {
      name: 'Station Libya Oil Sogoniko',
      code: 'LIBYA-SOG',
      mapsCode: 'M4C8+XWG, Bamako', // Sogoniko
      address: 'Sogoniko, Bamako',
      status: 'open',
    },
    {
      name: 'Station Total Lafiabougou',
      code: 'TOTAL-LAF',
      mapsCode: 'M4P9+2R9, Bamako', // Lafiabougou
      address: 'Lafiabougou, Bamako',
      status: 'open',
    },
  ];

  for (const station of stations) {
    await prisma.station.upsert({
      where: { code: station.code },
      update: {},
      create: station,
    });
  }

  console.log('✅ Seeding completed!');
  console.log(`Created ${stations.length} stations`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
