# API Stations - Documentation

## Endpoints disponibles

### 1. GET /api/stations

Récupère la liste de toutes les stations.

**Authentification**: Non requise

**Réponse**:
```json
[
  {
    "id": "clxxx...",
    "name": "Station Total Hippodrome",
    "code": "TOTAL-HIP",
    "mapsCode": "M4H8+H57",
    "address": "Avenue de la Marne, Hippodrome",
    "status": "open",
    "manager": {
      "id": "clxxx...",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "MANAGER"
    },
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

---

### 2. POST /api/stations

Crée une nouvelle station.

**Authentification**: Requise (ADMIN uniquement)

**Body**:
```json
{
  "name": "Station Total Hippodrome",
  "code": "TOTAL-HIP",
  "mapsCode": "M4H8+H57",
  "address": "Avenue de la Marne, Hippodrome",
  "managerId": "clxxx..." // Optionnel
}
```

**Réponse** (201):
```json
{
  "id": "clxxx...",
  "name": "Station Total Hippodrome",
  "code": "TOTAL-HIP",
  "mapsCode": "M4H8+H57",
  "address": "Avenue de la Marne, Hippodrome",
  "status": "open",
  "managerId": "clxxx...",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Erreurs**:
- `401`: Non autorisé (pas connecté)
- `403`: Accès refusé (pas ADMIN)
- `500`: Erreur serveur

---

### 3. GET /api/stations/[id]

Récupère une station par son ID.

**Authentification**: Non requise

**Paramètres**:
- `id`: ID de la station

**Réponse** (200):
```json
{
  "id": "clxxx...",
  "name": "Station Total Hippodrome",
  "code": "TOTAL-HIP",
  "mapsCode": "M4H8+H57",
  "address": "Avenue de la Marne, Hippodrome",
  "status": "open",
  "manager": {
    "id": "clxxx...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "MANAGER"
  },
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Erreurs**:
- `404`: Station non trouvée
- `500`: Erreur serveur

---

### 4. PUT /api/stations/[id]

Met à jour une station.

**Authentification**: Requise (ADMIN ou MANAGER)

**Permissions**:
- **ADMIN**: Peut modifier tous les champs
- **MANAGER**: Peut modifier uniquement le `status` de sa propre station

**Body (ADMIN)**:
```json
{
  "name": "Station Total Hippodrome",
  "code": "TOTAL-HIP",
  "mapsCode": "M4H8+H57",
  "address": "Avenue de la Marne, Hippodrome",
  "status": "open",
  "managerId": "clxxx..."
}
```

**Body (MANAGER)**:
```json
{
  "status": "closed"
}
```

**Réponse** (200):
```json
{
  "id": "clxxx...",
  "name": "Station Total Hippodrome",
  "code": "TOTAL-HIP",
  "mapsCode": "M4H8+H57",
  "address": "Avenue de la Marne, Hippodrome",
  "status": "closed",
  "manager": {
    "id": "clxxx...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "MANAGER"
  },
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Erreurs**:
- `401`: Non autorisé (pas connecté)
- `403`: Accès refusé (MANAGER essaie de modifier une autre station)
- `404`: Utilisateur non trouvé
- `500`: Erreur serveur

---

### 5. DELETE /api/stations/[id]

Supprime une station.

**Authentification**: Requise (ADMIN uniquement)

**Paramètres**:
- `id`: ID de la station

**Réponse** (200):
```json
{
  "message": "Station supprimée avec succès"
}
```

**Erreurs**:
- `400`: Impossible de supprimer (tickets actifs)
- `401`: Non autorisé (pas connecté)
- `403`: Accès refusé (pas ADMIN)
- `500`: Erreur serveur

---

## Modèle de données

### Station

```typescript
interface Station {
  id: string;              // ID unique (cuid)
  name: string;            // Nom de la station
  code: string;            // Code unique (ex: TOTAL-HIP)
  mapsCode: string;        // Code Google Maps (ex: M4H8+H57)
  address?: string;        // Adresse complète (optionnel)
  status: string;          // "open" ou "closed"
  manager?: User;          // Manager assigné (optionnel)
  managerId?: string;      // ID du manager (optionnel)
  createdAt: Date;         // Date de création
  updatedAt: Date;         // Date de dernière modification
}
```

### User (Manager)

```typescript
interface User {
  id: string;
  name?: string;
  email: string;
  role: "USER" | "MANAGER" | "ADMIN";
}
```

---

## Règles de validation

### Code Maps (mapsCode)
- **Format**: Plus Code Google Maps
- **Exemples valides**:
  - `M4H8+H57`
  - `M4H8+H57, Bamako`
  - `M4H8+H57, Bamako, Mali`
- **Requis**: Oui

### Code Station (code)
- **Format**: Lettres majuscules et tirets
- **Exemple**: `TOTAL-HIP`
- **Unique**: Oui
- **Requis**: Oui

### Status
- **Valeurs acceptées**: `"open"` ou `"closed"`
- **Défaut**: `"open"`
- **Requis**: Oui

### Name
- **Format**: Texte libre
- **Requis**: Oui

### Address
- **Format**: Texte libre
- **Requis**: Non

---

## Exemples d'utilisation

### Exemple 1: Admin crée une station

```javascript
const response = await fetch('/api/stations', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'Station Total Hippodrome',
    code: 'TOTAL-HIP',
    mapsCode: 'M4H8+H57',
    address: 'Avenue de la Marne, Hippodrome',
    managerId: 'clxxx...'
  })
});

const station = await response.json();
console.log(station);
```

### Exemple 2: Manager ferme sa station

```javascript
const response = await fetch(`/api/stations/${stationId}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    status: 'closed'
  })
});

const station = await response.json();
console.log(station.status); // "closed"
```

### Exemple 3: Admin modifie une station

```javascript
const response = await fetch(`/api/stations/${stationId}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'Station Total Hippodrome - Nouveau',
    code: 'TOTAL-HIP',
    mapsCode: 'M4H9+J58',
    address: 'Nouvelle adresse',
    status: 'open',
    managerId: 'clxxx...'
  })
});

const station = await response.json();
```

### Exemple 4: Récupérer toutes les stations

```javascript
const response = await fetch('/api/stations');
const stations = await response.json();

stations.forEach(station => {
  console.log(`${station.name}: ${station.status}`);
});
```

---

## Sécurité

### Authentification
- Utilise Better Auth pour la gestion des sessions
- Les tokens sont vérifiés via `auth.api.getSession()`

### Autorisation

| Endpoint | USER | MANAGER | ADMIN |
|----------|------|---------|-------|
| GET /api/stations | ✅ | ✅ | ✅ |
| GET /api/stations/[id] | ✅ | ✅ | ✅ |
| POST /api/stations | ❌ | ❌ | ✅ |
| PUT /api/stations/[id] (tout) | ❌ | ❌ | ✅ |
| PUT /api/stations/[id] (status) | ❌ | ✅* | ✅ |
| DELETE /api/stations/[id] | ❌ | ❌ | ✅ |

*\* Uniquement pour sa propre station*

### Validation
- Tous les champs requis sont vérifiés
- Le code de la station doit être unique
- Un manager ne peut avoir qu'une seule station
- Impossible de supprimer une station avec des tickets actifs

---

## Migration de latitude/longitude vers mapsCode

### Avant
```json
{
  "latitude": 12.6392,
  "longitude": -8.0029
}
```

### Après
```json
{
  "mapsCode": "M4H8+H57"
}
```

### Avantages
1. Un seul champ au lieu de deux
2. Format standardisé par Google
3. Lien direct vers Google Maps
4. Plus facile à copier-coller
5. Plus précis pour les utilisateurs

### Obtenir un code Maps depuis des coordonnées
Utiliser l'API Google Maps Geocoding ou le site [plus.codes](https://plus.codes/)

---

## Notes de version

### Version 2.0 (Actuelle)
- ✅ Remplacement de latitude/longitude par mapsCode
- ✅ Managers peuvent modifier le statut de leur station
- ✅ Validation améliorée
- ✅ Liens directs vers Google Maps

### Version 1.0
- Gestion basique des stations
- Seuls les admins pouvaient modifier
- Utilisation de latitude/longitude
