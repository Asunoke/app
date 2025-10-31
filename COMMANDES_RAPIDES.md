# Commandes Rapides - JigiFuel

## 🚀 Démarrage rapide

### Démarrer le serveur
```bash
npm run dev
```

### Vérifier les stations
```bash
node scripts/update-stations-maps-code.js
```

## 🗄️ Base de données

### Voir le statut des migrations
```bash
npx prisma migrate status
```

### Appliquer les migrations
```bash
npx prisma migrate dev
```

### Régénérer le client Prisma
```bash
npx prisma generate
```

### Ouvrir Prisma Studio (interface graphique)
```bash
npx prisma studio
```

### Réinitialiser la base de données (⚠️ DANGER)
```bash
npx prisma migrate reset
```

## 🔍 Vérifications

### Vérifier les erreurs TypeScript
```bash
npm run build
```

### Linter le code
```bash
npm run lint
```

## 📊 Données de test

### Créer un utilisateur MANAGER (via Prisma Studio)
1. Ouvrir Prisma Studio: `npx prisma studio`
2. Aller dans la table `User`
3. Créer un nouvel utilisateur avec `role: "MANAGER"`

### Assigner une station à un manager (via Prisma Studio)
1. Ouvrir Prisma Studio: `npx prisma studio`
2. Aller dans la table `Station`
3. Modifier la station et définir `managerId`

## 🧪 Tests manuels

### Tester en tant qu'ADMIN
1. Se connecter avec un compte ADMIN
2. Aller sur `/dashboard`
3. Créer une station avec un code maps
4. Vérifier le lien Google Maps

### Tester en tant que MANAGER
1. Se connecter avec un compte MANAGER
2. Aller sur `/dashboard`
3. Cliquer sur "Ma Station"
4. Changer le statut de la station

### Tester en tant que USER
1. Se connecter avec un compte USER
2. Aller sur `/`
3. Voir les stations avec codes maps
4. Cliquer sur "Démarrer le Trajet"

## 🔧 Dépannage

### Erreur "mapsCode does not exist"
```bash
# Arrêter le serveur (Ctrl+C)
npx prisma generate
npm run dev
```

### Erreur EPERM
```bash
# Arrêter le serveur
# Attendre quelques secondes
npx prisma generate
npm run dev
```

### Base de données désynchronisée
```bash
npx prisma migrate reset
npx prisma migrate dev
npm run dev
```

### Voir les logs de la base de données
```bash
# Dans un terminal séparé
npx prisma studio
```

## 📝 Commandes utiles

### Créer une nouvelle migration
```bash
npx prisma migrate dev --name nom_de_la_migration
```

### Créer une migration sans l'appliquer
```bash
npx prisma migrate dev --create-only --name nom_de_la_migration
```

### Formater le schéma Prisma
```bash
npx prisma format
```

### Valider le schéma Prisma
```bash
npx prisma validate
```

## 🔐 Gestion des utilisateurs

### Promouvoir un utilisateur en ADMIN (Prisma Studio)
1. `npx prisma studio`
2. Table `User`
3. Modifier l'utilisateur
4. Changer `role` à `"ADMIN"`

### Promouvoir un utilisateur en MANAGER (Prisma Studio)
1. `npx prisma studio`
2. Table `User`
3. Modifier l'utilisateur
4. Changer `role` à `"MANAGER"`

## 📦 Installation

### Installer les dépendances
```bash
npm install
```

### Installer Prisma CLI globalement
```bash
npm install -g prisma
```

## 🌐 URLs importantes

### Développement
- Application: http://localhost:3000
- Dashboard: http://localhost:3000/dashboard
- Prisma Studio: http://localhost:5555

### Production
- À définir selon votre déploiement

## 🔄 Workflow de développement

### 1. Modifier le schéma
```bash
# Éditer prisma/schema.prisma
npx prisma format
npx prisma validate
```

### 2. Créer la migration
```bash
npx prisma migrate dev --name ma_modification
```

### 3. Tester
```bash
npm run dev
# Tester manuellement
```

### 4. Vérifier
```bash
npm run build
npm run lint
```

## 🚨 Commandes d'urgence

### Rollback de la dernière migration
```bash
npx prisma migrate resolve --rolled-back nom_de_la_migration
```

### Forcer la synchronisation
```bash
npx prisma db push
```

### Voir la structure de la base
```bash
npx prisma db pull
```

## 📊 Statistiques

### Compter les stations
```sql
-- Dans Prisma Studio ou psql
SELECT COUNT(*) FROM "Station";
```

### Compter les managers
```sql
SELECT COUNT(*) FROM "User" WHERE role = 'MANAGER';
```

### Voir les stations sans manager
```sql
SELECT * FROM "Station" WHERE "managerId" IS NULL;
```

## 🎯 Raccourcis VS Code

### Ouvrir le terminal intégré
`Ctrl + ù` ou `Ctrl + `` `

### Rechercher dans les fichiers
`Ctrl + Shift + F`

### Formater le document
`Shift + Alt + F`

### Aller à la définition
`F12`

## 💡 Astuces

### Voir les logs en temps réel
```bash
npm run dev | grep "Station"
```

### Nettoyer le cache Next.js
```bash
rm -rf .next
npm run dev
```

### Vérifier la version de Node
```bash
node --version
```

### Vérifier la version de npm
```bash
npm --version
```

## 📚 Documentation

### Prisma
- https://www.prisma.io/docs

### Next.js
- https://nextjs.org/docs

### Better Auth
- https://www.better-auth.com/docs

### Google Maps Plus Codes
- https://plus.codes

## ⚡ Commandes en une ligne

### Setup complet
```bash
npm install && npx prisma generate && npx prisma migrate dev && npm run dev
```

### Reset et redémarrage
```bash
npx prisma migrate reset && npm run dev
```

### Build et test
```bash
npm run build && npm run lint
```

---

**Astuce**: Ajoutez ces commandes à vos scripts npm dans `package.json` pour un accès encore plus rapide !
