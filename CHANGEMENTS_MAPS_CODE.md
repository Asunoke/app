# Changements: Code Maps et Gestion des Managers

## Résumé des modifications

Ce document décrit les changements apportés au système pour :
1. Remplacer les champs `latitude` et `longitude` par un champ `mapsCode`
2. Permettre aux managers de modifier le statut de leurs stations

## 1. Modifications de la base de données

### Schéma Prisma
- **Supprimé**: `latitude: Float` et `longitude: Float`
- **Ajouté**: `mapsCode: String`

### Migration
La migration `20251031150425_replace_lat_long_with_maps_code` a été créée et appliquée.

**Important**: Les stations existantes ont reçu un code maps par défaut `M4H8+H57`. Les administrateurs doivent mettre à jour ces valeurs avec les vrais codes Google Maps.

## 2. Modifications de l'API

### `/api/stations/[id]/route.ts`
- **Modification PUT**: 
  - Les managers peuvent maintenant modifier le statut de leur propre station
  - Les admins peuvent toujours tout modifier
  - Le champ `mapsCode` remplace `latitude` et `longitude`

### `/api/stations/route.ts`
- **Modification POST**: Le champ `mapsCode` remplace `latitude` et `longitude`

## 3. Modifications du Frontend

### Dashboard (`/app/dashboard/page.tsx`)
- **Pour les ADMIN**:
  - Formulaire de création/modification de stations utilise maintenant `mapsCode`
  - Affichage du code maps avec lien cliquable vers Google Maps
  - Instructions pour obtenir un code Google Maps

- **Pour les MANAGER**:
  - Nouvel onglet "Ma Station"
  - Affichage des informations de leur station
  - Bouton pour ouvrir/fermer leur station
  - Le code maps est affiché avec un lien vers Google Maps

### Page d'accueil (`/app/page.tsx`)
- L'interface `Station` utilise maintenant `mapsCode`
- Le bouton "Démarrer le Trajet" utilise le code maps pour ouvrir Google Maps
- Affichage du code maps au lieu des coordonnées

## 4. Utilisation du Code Google Maps

### Comment obtenir un code Google Maps (Plus Code)
1. Ouvrir Google Maps
2. Trouver la localisation exacte de la station
3. Appuyer longuement (mobile) ou clic droit (PC) sur le point
4. Le Plus Code apparaît en haut (ex: M4H8+H57)
5. Copier et coller ce code dans le champ

### Format accepté
- `M4H8+H57`
- `M4H8+H57, Bamako`
- `M4H8+H57, Bamako, Mali`

## 5. Permissions

### ADMIN
- Créer des stations
- Modifier toutes les informations des stations (nom, code, mapsCode, adresse, manager, statut)
- Supprimer des stations
- Voir tous les utilisateurs

### MANAGER
- Voir leur propre station
- Modifier uniquement le statut de leur station (ouvert/fermé)
- Valider des tickets

### USER
- Voir les stations
- Réserver des tickets
- Voir leurs tickets

## 6. Actions requises après déploiement

1. **Mettre à jour les codes maps des stations existantes**:
   - Se connecter en tant qu'admin
   - Aller dans l'onglet "Stations"
   - Modifier chaque station pour ajouter le vrai code Google Maps

2. **Vérifier les permissions des managers**:
   - S'assurer que chaque manager a une station assignée
   - Tester que les managers peuvent modifier le statut de leur station

3. **Régénérer le client Prisma** (si nécessaire):
   ```bash
   npx prisma generate
   ```

## 7. Notes techniques

- Les erreurs TypeScript concernant `mapsCode` disparaîtront après la régénération du client Prisma
- Le composant Map (`components/map.tsx`) n'a pas été modifié car il n'est pas utilisé actuellement
- Si vous souhaitez réactiver la carte, il faudra décoder les codes maps en coordonnées

## 8. Avantages du Code Maps

1. **Plus simple**: Pas besoin de gérer deux champs (latitude/longitude)
2. **Plus précis**: Les codes Google Maps sont standardisés
3. **Plus facile**: Copier-coller directement depuis Google Maps
4. **Intégration directe**: Lien cliquable vers Google Maps
