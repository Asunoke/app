import { NextResponse } from 'next/server';

const OpenLocationCode = require('open-location-code');

export async function POST(request: Request) {
  try {
    const { plusCode } = await request.json();

    if (!plusCode) {
      return NextResponse.json({ error: 'Plus Code requis' }, { status: 400 });
    }

    // Nettoyer le Plus Code
    const cleanCode = plusCode.split(',')[0].trim().toUpperCase().replace(/\s/g, '');

    // Vérifier si c'est un Plus Code valide
    if (!OpenLocationCode.isValid(cleanCode)) {
      return NextResponse.json({ error: 'Plus Code invalide' }, { status: 400 });
    }

    let fullCode = cleanCode;

    // Si c'est un code court, le compléter avec la référence Bamako
    if (OpenLocationCode.isShort(cleanCode)) {
      const BAMAKO_LAT = 12.6392;
      const BAMAKO_LNG = -8.0029;
      fullCode = OpenLocationCode.recoverNearest(cleanCode, BAMAKO_LAT, BAMAKO_LNG);
    }

    // Décoder le Plus Code
    const decoded = OpenLocationCode.decode(fullCode);

    return NextResponse.json({
      latitude: decoded.latitudeCenter,
      longitude: decoded.longitudeCenter,
      fullCode,
    });
  } catch (error) {
    console.error('Erreur décodage Plus Code:', error);
    return NextResponse.json(
      { error: 'Erreur lors du décodage du Plus Code' },
      { status: 500 }
    );
  }
}
