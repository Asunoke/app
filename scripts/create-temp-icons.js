/**
 * Script pour créer des icônes PWA temporaires
 * Ces icônes sont des placeholders simples en attendant les vraies icônes
 * 
 * Usage: node scripts/create-temp-icons.js
 */

const fs = require('fs');
const path = require('path');

// Créer un SVG simple avec le logo JigiFuel
function createSVGIcon(size) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <!-- Fond orange -->
  <rect width="${size}" height="${size}" fill="#FF7A00" rx="${size * 0.15}"/>
  
  <!-- Cercle intérieur -->
  <circle cx="${size / 2}" cy="${size / 2}" r="${size * 0.35}" fill="#FFB800" opacity="0.3"/>
  
  <!-- Lettre J stylisée -->
  <text 
    x="${size / 2}" 
    y="${size / 2 + size * 0.15}" 
    font-family="Arial, sans-serif" 
    font-size="${size * 0.5}" 
    font-weight="bold" 
    fill="white" 
    text-anchor="middle"
  >J</text>
  
  <!-- Petit texte F -->
  <text 
    x="${size * 0.7}" 
    y="${size * 0.35}" 
    font-family="Arial, sans-serif" 
    font-size="${size * 0.2}" 
    font-weight="bold" 
    fill="white" 
    text-anchor="middle"
  >F</text>
</svg>`;
}

// Tailles d'icônes requises
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Créer le dossier public s'il n'existe pas
const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

console.log('🎨 Création des icônes PWA temporaires...\n');

// Créer chaque icône
sizes.forEach(size => {
  const filename = `icon-${size}x${size}.png`;
  const svgFilename = `icon-${size}x${size}.svg`;
  const filepath = path.join(publicDir, svgFilename);
  
  const svgContent = createSVGIcon(size);
  
  try {
    fs.writeFileSync(filepath, svgContent);
    console.log(`✅ Créé: ${svgFilename}`);
  } catch (error) {
    console.error(`❌ Erreur pour ${svgFilename}:`, error.message);
  }
});

console.log('\n📝 Note: Ces icônes sont au format SVG.');
console.log('Pour de meilleures performances, convertissez-les en PNG:');
console.log('1. Utilisez https://realfavicongenerator.net/');
console.log('2. Ou utilisez un outil comme ImageMagick');
console.log('3. Ou utilisez un éditeur d\'images (Photoshop, GIMP, etc.)\n');

console.log('💡 Pour créer des icônes PNG directement:');
console.log('npm install sharp');
console.log('Puis utilisez le script create-png-icons.js\n');

// Créer aussi un favicon.ico simple
const faviconSVG = createSVGIcon(32);
const faviconPath = path.join(publicDir, 'favicon.svg');

try {
  fs.writeFileSync(faviconPath, faviconSVG);
  console.log('✅ Créé: favicon.svg\n');
} catch (error) {
  console.error('❌ Erreur pour favicon.svg:', error.message);
}

console.log('✨ Terminé! Les icônes SVG sont dans le dossier public/');
console.log('🚀 Vous pouvez maintenant tester votre PWA!\n');
