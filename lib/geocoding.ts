/**
 * Convertit un Plus Code Google Maps en coordonnées latitude/longitude
 * Exemple: "M4C3+CMP, Bamako, Mali" -> { lat: 12.6211, lng: -8.0461 }
 */

export interface Coordinates {
  latitude: number;
  longitude: number;
}

// Alphabet utilisé par les Plus Codes (base 20)
const CODE_ALPHABET = '23456789CFGHJMPQRVWX';
const PAIR_CODE_LENGTH = 10;
const SEPARATOR = '+';
const SEPARATOR_POSITION = 8;
const LATITUDE_MAX = 90;
const LONGITUDE_MAX = 180;
const GRID_SIZE_DEGREES = 20;

/**
 * Décode un Plus Code complet en coordonnées
 * Format: M4G6+7QJ ou M4G6+7Q (avec ou sans la partie fine)
 */
export function decodePlusCode(plusCode: string): Coordinates | null {
  try {
    // Nettoyer le Plus Code (enlever la ville/pays et espaces)
    let cleanCode = plusCode.split(',')[0].trim().toUpperCase().replace(/\s/g, '');
    
    // Vérifier la présence du séparateur
    if (!cleanCode.includes(SEPARATOR)) {
      return null;
    }

    // Séparer les parties avant et après le +
    const parts = cleanCode.split(SEPARATOR);
    if (parts.length !== 2) {
      return null;
    }

    const [prefix, suffix] = parts;
    
    // Pour un Plus Code court (comme M4G6+7QJ), on a besoin d'une référence
    // On utilise Bamako comme référence par défaut
    const BAMAKO_LAT = 12.6392;
    const BAMAKO_LNG = -8.0029;

    // Reconstruire le code complet si nécessaire
    let fullCode = cleanCode;
    
    // Si le code est court (moins de 8 caractères avant le +), on le complète
    if (prefix.length < 8) {
      // Calculer le code de zone pour Bamako
      const latGrid = Math.floor((BAMAKO_LAT + LATITUDE_MAX) / GRID_SIZE_DEGREES);
      const lngGrid = Math.floor((BAMAKO_LNG + LONGITUDE_MAX) / GRID_SIZE_DEGREES);
      
      // Convertir en caractères du code
      const latChar1 = CODE_ALPHABET[Math.floor(latGrid / 20)];
      const latChar2 = CODE_ALPHABET[latGrid % 20];
      const lngChar1 = CODE_ALPHABET[Math.floor(lngGrid / 20)];
      const lngChar2 = CODE_ALPHABET[lngGrid % 20];
      
      // Compléter le code
      const areaCode = `${lngChar1}${latChar1}${lngChar2}${latChar2}`;
      fullCode = areaCode + cleanCode;
    }

    // Maintenant décoder le code complet
    const codeParts = fullCode.replace(SEPARATOR, '');
    
    let latitude = -LATITUDE_MAX;
    let longitude = -LONGITUDE_MAX;
    let latPlaceValue = GRID_SIZE_DEGREES * GRID_SIZE_DEGREES;
    let lngPlaceValue = GRID_SIZE_DEGREES * GRID_SIZE_DEGREES;

    // Décoder les paires de caractères
    for (let i = 0; i < Math.min(codeParts.length, PAIR_CODE_LENGTH); i += 2) {
      if (i < codeParts.length - 1) {
        const lngCode = CODE_ALPHABET.indexOf(codeParts[i]);
        const latCode = CODE_ALPHABET.indexOf(codeParts[i + 1]);
        
        if (lngCode < 0 || latCode < 0) {
          return null;
        }

        latitude += latCode * latPlaceValue;
        longitude += lngCode * lngPlaceValue;
        
        latPlaceValue /= GRID_SIZE_DEGREES;
        lngPlaceValue /= GRID_SIZE_DEGREES;
      }
    }

    // Ajuster au centre de la cellule
    latitude += latPlaceValue / 2;
    longitude += lngPlaceValue / 2;

    return {
      latitude: Math.round(latitude * 1000000) / 1000000,
      longitude: Math.round(longitude * 1000000) / 1000000,
    };
  } catch (error) {
    console.error('Erreur lors du décodage du Plus Code:', error);
    return null;
  }
}

/**
 * Valide si une chaîne ressemble à un Plus Code
 */
export function isPlusCode(input: string): boolean {
  const cleanInput = input.split(',')[0].trim().toUpperCase().replace(/\s/g, '');
  // Format: XXXX+XXX ou XXXX+XX (peut être court ou long)
  const plusCodeRegex = /^[23456789CFGHJMPQRVWX]{2,8}\+[23456789CFGHJMPQRVWX]{2,}$/;
  return plusCodeRegex.test(cleanInput);
}

/**
 * Géocode une adresse en utilisant Nominatim (OpenStreetMap)
 * Gratuit et sans clé API requise
 */
export async function geocodeAddress(address: string): Promise<Coordinates | null> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`,
      {
        headers: {
          'User-Agent': 'JigiFuel App',
        },
      }
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    
    if (data && data.length > 0) {
      return {
        latitude: parseFloat(data[0].lat),
        longitude: parseFloat(data[0].lon),
      };
    }

    return null;
  } catch (error) {
    console.error('Erreur de géocodage:', error);
    return null;
  }
}

/**
 * Convertit un Plus Code Google Maps en coordonnées en utilisant l'API Google
 * Note: Nécessite une clé API Google Maps (optionnel)
 */
export async function geocodePlusCode(plusCode: string): Promise<Coordinates | null> {
  try {
    // Nettoyer le Plus Code
    const cleanCode = plusCode.split(',')[0].trim();
    
    // Utiliser Nominatim pour géocoder le Plus Code + ville
    const fullAddress = plusCode.includes(',') ? plusCode : `${cleanCode}, Bamako, Mali`;
    
    return await geocodeAddress(fullAddress);
  } catch (error) {
    console.error('Erreur lors du géocodage du Plus Code:', error);
    return null;
  }
}
