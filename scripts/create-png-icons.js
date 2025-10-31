/**
 * Script pour créer des icônes PWA en PNG avec Sharp
 * 
 * Installation: npm install sharp
 * Usage: node scripts/create-png-icons.js
 */

const fs = require('fs');
const path = require('path');

// Vérifier si Sharp est installé
let sharp;
try {
  sharp = require('sharp');
} catch (error) {
  console.error('❌ Sharp n\'est pas installé.');
  console.log('📦 Installez-le avec: npm install sharp');
  console.log('Ou utilisez create-temp-icons.js pour créer des SVG\n');
  process.exit(1);
}

// SVG de base
const baseSVG = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <!-- Fond orange avec dégradé -->
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#FF7A00;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#FFB800;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <rect width="512" height="512" fill="url(#grad)" rx="76.8"/>
  
  <!-- Cercle décoratif -->
  <circle cx="256" cy="256" r="180" fill="#FFB800" opacity="0.2"/>
  
  <!-- Lettre J stylisée -->
  <text 
    x="256" 
    y="320" 
    font-family="Arial, sans-serif" 
    font-size="280" 
    font-weight="bold" 
    fill="white" 
    text-anchor="middle"
  >J</text>
  
  <!-- Petit F -->
  <text 
    x="360" 
    y="180" 
    font-family="Arial, sans-serif" 
    font-size="100" 
    font-weight="bold" 
    fill="white" 
    text-anchor="middle"
  >F</text>
  
  <!-- Icône pompe à essence stylisée -->
  <g transform="translate(140, 380)">
    <rect x="0" y="0" width="40" height="60" fill="white" opacity="0.9" rx="5"/>
    <rect x="10" y="10" width="20" height="20" fill="#FF7A00" rx="3"/>
    <circle cx="20" cy="50" r="8" fill="#FF7A00"/>
  </g>
</svg>`;

// Tailles d'icônes requises
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Créer le dossier public s'il n'existe pas
const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

console.log('🎨 Création des icônes PWA en PNG...\n');

// Fonction pour créer une icône PNG
async function createIcon(size) {
  const filename = `icon-${size}x${size}.png`;
  const filepath = path.join(publicDir, filename);
  
  try {
    await sharp(Buffer.from(baseSVG))
      .resize(size, size)
      .png()
      .toFile(filepath);
    
    console.log(`✅ Créé: ${filename}`);
  } catch (error) {
    console.error(`❌ Erreur pour ${filename}:`, error.message);
  }
}

// Créer toutes les icônes
async function createAllIcons() {
  for (const size of sizes) {
    await createIcon(size);
  }
  
  console.log('\n✨ Toutes les icônes PNG ont été créées!');
  console.log('📁 Emplacement: public/');
  console.log('🚀 Vous pouvez maintenant tester votre PWA!\n');
  
  // Créer aussi un favicon
  try {
    await sharp(Buffer.from(baseSVG))
      .resize(32, 32)
      .png()
      .toFile(path.join(publicDir, 'favicon.png'));
    
    console.log('✅ Bonus: favicon.png créé\n');
  } catch (error) {
    console.error('❌ Erreur pour favicon.png:', error.message);
  }
}

// Exécuter
createAllIcons().catch(error => {
  console.error('❌ Erreur générale:', error);
  process.exit(1);
});
