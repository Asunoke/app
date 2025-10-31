# Génération des Icônes PWA

## Icônes requises

Pour que la PWA fonctionne correctement, vous devez créer les icônes suivantes dans le dossier `public/`:

### Liste des icônes
- `icon-72x72.png` (72x72 pixels)
- `icon-96x96.png` (96x96 pixels)
- `icon-128x128.png` (128x128 pixels)
- `icon-144x144.png` (144x144 pixels)
- `icon-152x152.png` (152x152 pixels)
- `icon-192x192.png` (192x192 pixels)
- `icon-384x384.png` (384x384 pixels)
- `icon-512x512.png` (512x512 pixels)

## Méthode 1: Utiliser un outil en ligne

### Recommandé: RealFaviconGenerator
1. Allez sur https://realfavicongenerator.net/
2. Uploadez votre logo (minimum 512x512px)
3. Configurez les options:
   - iOS: Activé
   - Android: Activé
   - Windows: Activé
4. Téléchargez le package
5. Copiez tous les fichiers dans `public/`

### Alternative: PWA Asset Generator
1. Allez sur https://www.pwabuilder.com/imageGenerator
2. Uploadez votre logo
3. Téléchargez toutes les tailles
4. Renommez les fichiers selon la liste ci-dessus
5. Placez-les dans `public/`

## Méthode 2: Utiliser ImageMagick (ligne de commande)

Si vous avez ImageMagick installé:

\`\`\`bash
# À partir d'un logo 512x512
convert logo-512.png -resize 72x72 public/icon-72x72.png
convert logo-512.png -resize 96x96 public/icon-96x96.png
convert logo-512.png -resize 128x128 public/icon-128x128.png
convert logo-512.png -resize 144x144 public/icon-144x144.png
convert logo-512.png -resize 152x152 public/icon-152x152.png
convert logo-512.png -resize 192x192 public/icon-192x192.png
convert logo-512.png -resize 384x384 public/icon-384x384.png
convert logo-512.png -resize 512x512 public/icon-512x512.png
\`\`\`

## Méthode 3: Créer une icône simple temporaire

Pour tester rapidement, vous pouvez créer une icône simple avec du texte:

1. Ouvrez un éditeur d'image (Paint, Photoshop, GIMP, etc.)
2. Créez une image 512x512 pixels
3. Fond orange (#FF7A00)
4. Ajoutez le texte "JF" en blanc au centre
5. Exportez en PNG
6. Utilisez un outil de redimensionnement pour créer toutes les tailles

## Spécifications du logo JigiFuel

### Couleurs
- Couleur principale: #FF7A00 (Orange)
- Couleur secondaire: #FFB800 (Jaune)
- Texte: Blanc (#FFFFFF)

### Suggestions de design
- Icône avec une pompe à essence stylisée
- Lettre "J" stylisée
- Goutte de carburant
- Combinaison de "JF" (JigiFuel)

## Vérification

Après avoir ajouté les icônes, vérifiez:

1. **Taille des fichiers**: Chaque icône doit faire moins de 100KB
2. **Format**: PNG avec transparence si nécessaire
3. **Qualité**: Nette et claire à toutes les tailles
4. **Cohérence**: Même design pour toutes les tailles

## Test

Pour tester vos icônes PWA:

1. Démarrez le serveur: `npm run dev`
2. Ouvrez Chrome DevTools
3. Allez dans l'onglet "Application"
4. Section "Manifest" - vérifiez que toutes les icônes sont listées
5. Section "Service Workers" - vérifiez qu'il est enregistré

## Icônes temporaires

En attendant de créer vos propres icônes, vous pouvez utiliser des icônes génériques ou créer des icônes de texte simple avec les initiales "JF".
