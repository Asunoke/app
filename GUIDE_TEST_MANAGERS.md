# Guide de Test - Fonctionnalités Managers

## Objectif
Tester que les managers peuvent modifier le statut de leurs stations et que le système utilise correctement les codes Google Maps.

## Prérequis

1. **Base de données mise à jour**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

2. **Serveur de développement en cours d'exécution**
   ```bash
   npm run dev
   ```

3. **Comptes de test**
   - Un compte ADMIN
   - Un compte MANAGER avec une station assignée
   - Un compte USER

## Tests à effectuer

### 1. Test Admin - Création de station avec code Maps

**Étapes:**
1. Se connecter en tant qu'ADMIN
2. Aller sur `/dashboard`
3. Cliquer sur l'onglet "Stations"
4. Cliquer sur "Créer une Station"
5. Remplir le formulaire:
   - Nom: "Station Test Maps"
   - Code: "TEST-MAPS"
   - Code Google Maps: "M4H8+H57" (ou un vrai code)
   - Adresse: "Test Address, Bamako"
   - Manager: Sélectionner un manager
6. Cliquer sur "Créer la Station"

**Résultat attendu:**
- ✅ Station créée avec succès
- ✅ Code maps affiché dans la liste
- ✅ Lien cliquable vers Google Maps fonctionne

### 2. Test Admin - Modification de station

**Étapes:**
1. Dans l'onglet "Stations"
2. Cliquer sur "✏️ Modifier" sur une station
3. Modifier le code Google Maps
4. Cliquer sur "Mettre à jour"

**Résultat attendu:**
- ✅ Station mise à jour
- ✅ Nouveau code maps affiché
- ✅ Lien Google Maps mis à jour

### 3. Test Admin - Changement de statut

**Étapes:**
1. Dans l'onglet "Stations"
2. Cliquer sur "🔒 Fermer" ou "🔓 Ouvrir"

**Résultat attendu:**
- ✅ Statut changé immédiatement
- ✅ Badge mis à jour (Ouvert/Fermé)
- ✅ Bouton change de texte

### 4. Test Manager - Voir sa station

**Étapes:**
1. Se connecter en tant que MANAGER
2. Aller sur `/dashboard`
3. Vérifier l'affichage

**Résultat attendu:**
- ✅ Onglet "Ma Station" visible
- ✅ Onglet "Stations" et "Utilisateurs" NON visibles
- ✅ Onglet "Valider Tickets" visible

### 5. Test Manager - Modifier le statut de sa station

**Étapes:**
1. Connecté en tant que MANAGER
2. Cliquer sur l'onglet "Ma Station"
3. Vérifier les informations affichées:
   - Nom de la station
   - Code de la station
   - Code Maps (avec lien cliquable)
   - Adresse
   - Statut actuel
4. Cliquer sur "🔒 Fermer la station" ou "🔓 Ouvrir la station"

**Résultat attendu:**
- ✅ Statut changé avec succès
- ✅ Message de confirmation affiché
- ✅ Badge mis à jour
- ✅ Bouton change de texte
- ✅ Changement visible sur la page d'accueil

### 6. Test Manager - Tentative de modification d'une autre station

**Étapes:**
1. Connecté en tant que MANAGER
2. Essayer d'accéder à `/api/stations/[autre-station-id]` avec PUT

**Résultat attendu:**
- ✅ Erreur 403 "Vous ne pouvez modifier que votre propre station"

### 7. Test Manager - Voir le code Maps

**Étapes:**
1. Dans l'onglet "Ma Station"
2. Cliquer sur le lien du code Maps

**Résultat attendu:**
- ✅ Google Maps s'ouvre dans un nouvel onglet
- ✅ La localisation correcte est affichée

### 8. Test User - Page d'accueil

**Étapes:**
1. Se connecter en tant que USER
2. Aller sur la page d'accueil `/`
3. Vérifier l'affichage des stations

**Résultat attendu:**
- ✅ Stations affichées avec leur code Maps
- ✅ Pas de coordonnées latitude/longitude
- ✅ Bouton "🧭 Démarrer le Trajet" fonctionne
- ✅ Google Maps s'ouvre avec le bon code Maps

### 9. Test - Stations sans manager

**Étapes:**
1. Créer une station sans manager (admin)
2. Se connecter en tant que MANAGER
3. Aller sur "Ma Station"

**Résultat attendu:**
- ✅ Message "Aucune station n'est assignée à votre compte"
- ✅ Message "Contactez un administrateur..."

### 10. Test - Mise à jour en temps réel

**Étapes:**
1. Ouvrir deux navigateurs:
   - Navigateur 1: MANAGER connecté sur "Ma Station"
   - Navigateur 2: USER sur la page d'accueil
2. Manager change le statut de sa station
3. Attendre 30 secondes (auto-refresh)

**Résultat attendu:**
- ✅ Changement visible dans le dashboard du manager
- ✅ Changement visible sur la page d'accueil après refresh

## Vérifications de sécurité

### API Endpoints

1. **PUT /api/stations/[id]**
   - ✅ ADMIN peut tout modifier
   - ✅ MANAGER peut modifier uniquement le statut de SA station
   - ✅ MANAGER ne peut PAS modifier une autre station
   - ✅ USER ne peut rien modifier

2. **POST /api/stations**
   - ✅ Seul ADMIN peut créer des stations
   - ✅ Utilise mapsCode au lieu de latitude/longitude

3. **DELETE /api/stations/[id]**
   - ✅ Seul ADMIN peut supprimer
   - ✅ Impossible si tickets actifs

## Checklist finale

- [ ] Migration Prisma appliquée
- [ ] Client Prisma régénéré
- [ ] Serveur redémarré
- [ ] Stations existantes ont des codes Maps valides
- [ ] Tous les tests ADMIN passent
- [ ] Tous les tests MANAGER passent
- [ ] Tous les tests USER passent
- [ ] Liens Google Maps fonctionnent
- [ ] Aucune erreur dans la console
- [ ] Aucune erreur TypeScript

## Problèmes connus

1. **Erreur EPERM lors de `prisma generate`**
   - Cause: Serveur de dev en cours d'exécution
   - Solution: Arrêter le serveur, régénérer, redémarrer

2. **Stations avec code Maps par défaut**
   - Les stations existantes ont `M4H8+H57` par défaut
   - Mettre à jour manuellement via le dashboard

## Support

Si vous rencontrez des problèmes:
1. Vérifier les logs du serveur
2. Vérifier la console du navigateur
3. Vérifier que la migration est appliquée: `npx prisma migrate status`
4. Vérifier les permissions de l'utilisateur dans la base de données
