import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create sample stations in Bamako
  const stations = [
    {
      name: 'Station Total Hippodrome',
      code: 'TOTAL-HIP',
      latitude: 12.6392,
      longitude: -8.0029,
      address: 'Avenue de la Marne, Hippodrome',
      status: 'open',
    },
    {
      name: 'Station Shell ACI 2000',
      code: 'SHELL-ACI',
      latitude: 12.6458,
      longitude: -7.9897,
      address: 'ACI 2000, Bamako',
      status: 'open',
    },
    {
      name: 'Station Oryx Hamdallaye',
      code: 'ORYX-HAM',
      latitude: 12.6528,
      longitude: -7.9956,
      address: 'Hamdallaye ACI, Bamako',
      status: 'open',
    },
    {
      name: 'Station Total Badalabougou',
      code: 'TOTAL-BAD',
      latitude: 12.6289,
      longitude: -7.9856,
      address: 'Badalabougou, Bamako',
      status: 'closed',
    },
    {
      name: 'Station Libya Oil Sogoniko',
      code: 'LIBYA-SOG',
      latitude: 12.6156,
      longitude: -8.0234,
      address: 'Sogoniko, Bamako',
      status: 'open',
    },
    {
      name: 'Station Total Lafiabougou',
      code: 'TOTAL-LAF',
      latitude: 12.6678,
      longitude: -7.9823,
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
