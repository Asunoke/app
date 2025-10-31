# 🧪 Test de la Carte Interactive

## ✅ Checklist de Test

### Test 1 : Chargement Initial

1. **Ouvrez la page d'accueil** : http://localhost:3000
2. **Ouvrez la console** (F12)
3. **Vérifiez** :
   - [ ] La carte s'affiche
   - [ ] Les marqueurs apparaissent
   - [ ] Le compteur affiche le bon nombre
   - [ ] Console affiche : `📍 X station(s) chargée(s) à HH:MM:SS`

**Résultat attendu** :
```
Console : 📍 5 station(s) chargée(s) à 13:05:23
Compteur : 5 station(s) affichée(s)
Carte : 5 marqueurs visibles
```

### Test 2 : Création d'une Nouvelle Station

1. **Allez dans Dashboard** → **Stations**
2. **Cliquez sur "Créer une Station"**
3. **Remplissez** :
   - Nom : `Test Station`
   - Code : `TEST-001`
   - Localisation : `M4G6+7QJ, Bamako`
4. **Cliquez sur "🔍 Trouver"**
5. **Vérifiez** que les coordonnées sont remplies
6. **Cliquez sur "Créer la Station"**
7. **Attendez** le message de succès

**Résultat attendu** :
```
✅ Toast : "Station créée avec succès"
Dashboard : 6 stations dans la liste
```

### Test 3 : Mise à Jour Manuelle

1. **Retournez sur la page d'accueil**
2. **Cliquez sur "🔄 Actualiser"**
3. **Regardez la console**
4. **Regardez le compteur**

**Résultat attendu** :
```
Console : 📍 6 station(s) chargée(s) à 13:06:45
Compteur : 6 station(s) affichée(s)
Dernière mise à jour : 13:06:45
Carte : 6 marqueurs visibles (dont le nouveau)
```

### Test 4 : Mise à Jour Automatique

1. **Restez sur la page d'accueil**
2. **Attendez 30 secondes**
3. **Surveillez la console**

**Résultat attendu** :
```
Après 30s :
Console : 📍 6 station(s) chargée(s) à 13:07:15
Compteur se met à jour automatiquement
```

### Test 5 : Vérification des Marqueurs

1. **Cliquez sur chaque marqueur**
2. **Vérifiez** :
   - [ ] Popup s'ouvre
   - [ ] Nom de la station affiché
   - [ ] Code affiché
   - [ ] Statut affiché (Ouvert/Fermé)
   - [ ] Bouton "Réserver un ticket"
   - [ ] Bouton "🧭 Démarrer le trajet"

### Test 6 : Navigation Google Maps

1. **Cliquez sur un marqueur**
2. **Cliquez sur "🧭 Démarrer le trajet"**
3. **Vérifiez** :
   - [ ] Google Maps s'ouvre dans un nouvel onglet
   - [ ] L'itinéraire est affiché
   - [ ] La destination est correcte

### Test 7 : Suppression de Station

1. **Allez dans Dashboard** → **Stations**
2. **Trouvez "Test Station"**
3. **Cliquez sur "🗑️ Supprimer"**
4. **Confirmez**
5. **Retournez sur la page d'accueil**
6. **Cliquez sur "🔄 Actualiser"**

**Résultat attendu** :
```
Console : 📍 5 station(s) chargée(s) à 13:08:30
Compteur : 5 station(s) affichée(s)
Carte : 5 marqueurs (Test Station disparue)
```

## 🔍 Vérifications Détaillées

### Console du Navigateur

Ouvrez la console (F12) et vérifiez :

**Au chargement** :
```
📍 5 station(s) chargée(s) à 13:05:23
```

**Après clic sur "🔄 Actualiser"** :
```
📍 5 station(s) chargée(s) à 13:05:45
```

**Toutes les 30 secondes** :
```
📍 5 station(s) chargée(s) à 13:06:15
📍 5 station(s) chargée(s) à 13:06:45
📍 5 station(s) chargée(s) à 13:07:15
```

### Terminal du Serveur

Dans le terminal où tourne `npm run dev` :

```
GET /api/stations?t=1730000000000 200 in 126ms
GET /api/stations?t=1730000030000 200 in 124ms
GET /api/stations?t=1730000060000 200 in 128ms
```

### Compteur en Bas à Gauche

```
5 station(s) affichée(s)
Dernière mise à jour : 13:05:23
```

Le compteur doit :
- Afficher le bon nombre de stations
- Se mettre à jour après clic sur "🔄 Actualiser"
- Se mettre à jour automatiquement toutes les 30s
- Afficher l'heure de dernière mise à jour

## 🐛 Problèmes Courants et Solutions

### Problème 1 : Carte Vide

**Symptômes** :
- Carte s'affiche mais aucun marqueur
- Compteur affiche "0 station(s)"

**Vérifications** :
```bash
# 1. Vérifier la base de données
npm run db:check

# 2. Vérifier l'API
# Ouvrir dans le navigateur :
http://localhost:3000/api/stations
```

**Solutions** :
```bash
# Si aucune station dans la DB :
npm run db:seed

# Si l'API ne répond pas :
# Redémarrer le serveur (Ctrl+C puis npm run dev)
```

### Problème 2 : Nouvelle Station Non Visible

**Symptômes** :
- Station créée dans Dashboard
- Pas visible sur la carte après actualisation

**Vérifications** :
1. Console : Vérifier le nombre de stations chargées
2. Compteur : Vérifier le nombre affiché
3. Coordonnées : Vérifier qu'elles sont dans Bamako

**Solutions** :
```
1. Cliquez plusieurs fois sur "🔄 Actualiser"
2. Rafraîchissez la page (F5)
3. Vérifiez les coordonnées dans Dashboard
4. Vérifiez la console pour des erreurs
```

### Problème 3 : Carte ne se Met Pas à Jour

**Symptômes** :
- Clic sur "🔄 Actualiser" ne fait rien
- Compteur ne change pas
- Pas de log dans la console

**Vérifications** :
```javascript
// Console navigateur :
// Cherchez des erreurs en rouge

// Terminal serveur :
// Vérifiez que les requêtes arrivent
GET /api/stations?t=... 200
```

**Solutions** :
```
1. Vider le cache : Ctrl + Shift + Delete
2. Redémarrer le serveur : Ctrl+C puis npm run dev
3. Rafraîchir la page : Ctrl + F5 (force refresh)
```

### Problème 4 : Carte Clignote

**Symptômes** :
- La carte se recharge constamment
- Perte du zoom/position
- Marqueurs qui disparaissent/réapparaissent

**Cause** :
Mise à jour trop fréquente

**Solution** :
```typescript
// Dans app/page.tsx, augmenter l'intervalle :
const interval = setInterval(() => {
  fetchStations();
}, 60000); // 60 secondes au lieu de 30
```

## 📊 Métriques de Performance

### Temps de Chargement

**Acceptable** :
- Chargement initial : < 2s
- Mise à jour : < 500ms
- Clic sur "🔄 Actualiser" : < 1s

**Si plus lent** :
- Vérifier la connexion internet
- Vérifier le nombre de stations (> 50 peut ralentir)
- Vérifier la console pour des erreurs

### Consommation Mémoire

**Normal** :
- 50-100 MB pour la page
- +10 MB par mise à jour

**Si trop élevé** :
- Rafraîchir la page toutes les heures
- Réduire la fréquence de mise à jour

## ✅ Checklist Finale

Avant de considérer que tout fonctionne :

- [ ] Chargement initial affiche toutes les stations
- [ ] Compteur affiche le bon nombre
- [ ] Console affiche les logs de chargement
- [ ] Bouton "🔄 Actualiser" fonctionne
- [ ] Mise à jour automatique toutes les 30s
- [ ] Création de station → visible après actualisation
- [ ] Suppression de station → disparaît après actualisation
- [ ] Tous les marqueurs sont cliquables
- [ ] Bouton "Démarrer le trajet" ouvre Google Maps
- [ ] Aucune erreur dans la console
- [ ] Aucune erreur dans le terminal

## 🎯 Test Complet (5 minutes)

```
1. [0:00] Ouvrir la page d'accueil
2. [0:10] Vérifier que 5 stations s'affichent
3. [0:20] Aller dans Dashboard
4. [0:30] Créer une nouvelle station
5. [1:00] Retourner sur la page d'accueil
6. [1:10] Cliquer sur "🔄 Actualiser"
7. [1:20] Vérifier que 6 stations s'affichent
8. [1:30] Attendre 30 secondes
9. [2:00] Vérifier la console (mise à jour auto)
10. [2:10] Cliquer sur un marqueur
11. [2:20] Tester "Démarrer le trajet"
12. [2:30] Retourner dans Dashboard
13. [2:40] Supprimer la station test
14. [3:00] Retourner sur la page d'accueil
15. [3:10] Cliquer sur "🔄 Actualiser"
16. [3:20] Vérifier que 5 stations s'affichent
17. [3:30] Attendre 30 secondes
18. [4:00] Vérifier la mise à jour auto
19. [4:30] Vérifier qu'il n'y a aucune erreur
20. [5:00] ✅ Test terminé !
```

---

**Si tous les tests passent, la carte fonctionne parfaitement !** 🎉
