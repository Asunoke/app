# Fonctionnalités Managers - JigiFuel

## Vue d'ensemble

Les managers de stations ont maintenant la possibilité de gérer le statut de leurs stations directement depuis le dashboard, sans avoir besoin de contacter un administrateur.

## Accès Manager

### Connexion
- URL: `/dashboard`
- Rôle requis: `MANAGER`

### Interface Manager

Le dashboard des managers affiche deux onglets principaux:

1. **Valider Tickets** - Valider ou rejeter les tickets des clients
2. **Ma Station** - Gérer sa propre station

## Fonctionnalités disponibles

### 1. Visualisation de la station

Les managers peuvent voir toutes les informations de leur station:

- **Nom de la station**
- **Code de la station** (identifiant unique)
- **Code Google Maps** (lien cliquable vers la localisation)
- **Adresse complète**
- **Statut actuel** (Ouvert/Fermé)

### 2. Modification du statut

Les managers peuvent **ouvrir** ou **fermer** leur station en un clic:

#### Fermer la station
- Cliquer sur le bouton "🔒 Fermer la station"
- La station devient immédiatement fermée
- Les clients ne peuvent plus réserver de tickets
- Le badge passe à "Fermé" (rouge)

#### Ouvrir la station
- Cliquer sur le bouton "🔓 Ouvrir la station"
- La station devient immédiatement ouverte
- Les clients peuvent réserver des tickets
- Le badge passe à "Ouvert" (vert)

### 3. Validation de tickets

Les managers peuvent valider ou rejeter les tickets:

1. Entrer l'ID du ticket (format: `XXXX-XXXX`)
2. Cliquer sur "Valider" ou "Rejeter"
3. Le ticket est traité immédiatement

## Restrictions de sécurité

Pour garantir la sécurité du système:

### ✅ Ce que les managers PEUVENT faire:
- Voir les informations de leur propre station
- Modifier le statut (ouvert/fermé) de leur station
- Valider ou rejeter des tickets

### ❌ Ce que les managers NE PEUVENT PAS faire:
- Modifier le nom de leur station
- Modifier le code de leur station
- Modifier le code Google Maps
- Modifier l'adresse
- Changer de manager assigné
- Voir ou modifier d'autres stations
- Créer de nouvelles stations
- Supprimer des stations
- Voir la liste des utilisateurs

## Code Google Maps

### Qu'est-ce qu'un code Google Maps?

Un code Google Maps (Plus Code) est un identifiant unique pour une localisation géographique.

**Exemple**: `M4H8+H57, Bamako, Mali`

### Pourquoi utiliser un code Maps?

1. **Simplicité**: Un seul champ au lieu de latitude/longitude
2. **Précision**: Standardisé par Google
3. **Facilité**: Copier-coller directement depuis Google Maps
4. **Intégration**: Lien direct vers Google Maps

### Comment obtenir un code Maps?

1. Ouvrir [Google Maps](https://www.google.com/maps)
2. Trouver la localisation exacte de la station
3. Appuyer longuement (mobile) ou clic droit (PC) sur le point
4. Le Plus Code apparaît en haut (ex: M4H8+H57)
5. Copier ce code

### Utilisation du code Maps

Dans le dashboard, le code Maps est affiché comme un lien cliquable:
- Cliquer dessus ouvre Google Maps
- La localisation exacte est affichée
- Possibilité de démarrer la navigation

## Scénarios d'utilisation

### Scénario 1: Fermeture temporaire

**Situation**: La station manque de carburant

**Actions**:
1. Se connecter au dashboard
2. Aller sur "Ma Station"
3. Cliquer sur "🔒 Fermer la station"
4. Les clients ne peuvent plus réserver
5. Une fois le carburant arrivé, cliquer sur "🔓 Ouvrir la station"

### Scénario 2: Fermeture de nuit

**Situation**: La station ferme à 22h

**Actions**:
1. À 22h, fermer la station via le dashboard
2. Le lendemain matin, ouvrir la station
3. Les clients voient le statut en temps réel

### Scénario 3: Validation de tickets

**Situation**: Un client arrive avec un ticket

**Actions**:
1. Demander l'ID du ticket au client
2. Entrer l'ID dans le dashboard
3. Vérifier les informations
4. Cliquer sur "Valider" si tout est correct
5. Le ticket est marqué comme utilisé

## Impact sur les clients

### Quand une station est fermée:
- ❌ Bouton "Réserver un Ticket" désactivé
- 🔴 Badge "Fermé" affiché
- ⚠️ Message "Station fermée"

### Quand une station est ouverte:
- ✅ Bouton "Réserver un Ticket" actif
- 🟢 Badge "Ouvert" affiché
- 🎫 Possibilité de réserver

## Notifications et feedback

### Messages de succès:
- "Station ouverte" (avec toast vert)
- "Station fermée" (avec toast vert)
- "Ticket validé" (avec toast vert)
- "Ticket rejeté" (avec toast vert)

### Messages d'erreur:
- "Erreur lors du changement de statut"
- "Erreur lors de la validation"
- "Accès non autorisé"

## FAQ Managers

### Q: Puis-je gérer plusieurs stations?
**R**: Non, chaque manager est assigné à une seule station.

### Q: Puis-je modifier l'adresse de ma station?
**R**: Non, seuls les administrateurs peuvent modifier ces informations.

### Q: Que se passe-t-il si je ferme ma station avec des tickets actifs?
**R**: Les tickets restent valides. Les clients peuvent toujours les utiliser pendant leur période de validité.

### Q: Puis-je voir l'historique des changements de statut?
**R**: Cette fonctionnalité n'est pas encore disponible.

### Q: Comment savoir si des clients ont réservé des tickets?
**R**: Utilisez l'onglet "Valider Tickets" pour vérifier les tickets.

### Q: Le changement de statut est-il immédiat?
**R**: Oui, le changement est immédiat. Les clients voient le nouveau statut après le prochain rafraîchissement (max 30 secondes).

## Support technique

### Problèmes courants:

1. **"Aucune station n'est assignée à votre compte"**
   - Contactez un administrateur pour vous assigner une station

2. **Impossible de changer le statut**
   - Vérifiez votre connexion internet
   - Rafraîchissez la page
   - Contactez le support si le problème persiste

3. **Le lien Google Maps ne fonctionne pas**
   - Vérifiez que le code Maps est correct
   - Contactez un administrateur pour le mettre à jour

## Contact

Pour toute question ou problème:
- Contactez votre administrateur système
- Email: support@jigifuel.com (exemple)
