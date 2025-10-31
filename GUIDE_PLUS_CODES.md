# 📍 Guide d'Utilisation des Plus Codes Google Maps

## Qu'est-ce qu'un Plus Code ?

Un **Plus Code** (ou Open Location Code) est un code court créé par Google pour identifier n'importe quel endroit sur Terre, même sans adresse postale.

**Exemple** : `M4H8+H57, Bamako, Mali`

### Pourquoi utiliser les Plus Codes ?

✅ **Précis** : Localisation exacte à quelques mètres près  
✅ **Simple** : Facile à partager et à copier  
✅ **Universel** : Fonctionne partout dans le monde  
✅ **Gratuit** : Pas besoin de clé API  
✅ **Fiable** : Créé et maintenu par Google  

## 📱 Comment Obtenir un Plus Code

### Sur Mobile (Android/iOS)

1. **Ouvrez l'application Google Maps**
2. **Trouvez votre localisation** (utilisez la recherche ou naviguez)
3. **Appuyez longuement** sur le point exact où se trouve la station
4. **Un marqueur rouge apparaît**
5. **En bas de l'écran**, vous verrez les informations du lieu
6. **Le Plus Code est affiché** juste en dessous des coordonnées

**Exemple d'affichage** :
```
📍 Point marqué
M4H8+H57, Bamako, Mali
12.6286, -8.0414
```

7. **Appuyez sur le Plus Code** pour le copier
8. **Collez-le dans JigiFuel** !

### Sur Ordinateur (PC/Mac)

1. **Ouvrez Google Maps** dans votre navigateur
2. **Trouvez votre localisation**
3. **Clic droit** sur le point exact
4. **Cliquez sur les coordonnées** qui apparaissent dans le menu
5. **Une fenêtre s'ouvre** avec les détails
6. **Le Plus Code est affiché** en haut

**Exemple** :
```
M4H8+H57, Bamako
12.6286, -8.0414
```

7. **Cliquez sur le Plus Code** pour le copier
8. **Collez-le dans JigiFuel** !

## 🎯 Utilisation dans JigiFuel

### Créer une Station

1. **Dashboard** → **Stations** → **Créer une Station**
2. Remplissez le nom et le code
3. Dans **"📍 Localisation"**, vous avez 2 options :

#### Option A : Vous avez déjà le Plus Code
```
1. Collez le Plus Code : M4H8+H57, Bamako, Mali
2. Cliquez sur "🔍 Trouver"
3. Les coordonnées sont automatiquement remplies !
```

#### Option B : Vous devez trouver le Plus Code
```
1. Cliquez sur "🗺️ Ouvrir Maps"
2. Google Maps s'ouvre sur Bamako
3. Trouvez votre station
4. Copiez le Plus Code (voir instructions ci-dessus)
5. Revenez sur JigiFuel
6. Collez le Plus Code
7. Cliquez sur "🔍 Trouver"
```

## 📝 Formats Acceptés

JigiFuel accepte plusieurs formats de Plus Codes :

### Format Court (Recommandé)
```
M4H8+H57
M4H8+H57, Bamako
M4H8+H57, Bamako, Mali
```

### Format Complet
```
7FWM4H8+H57
7FWM4H8+H57, Mali
```

### Avec ou Sans Espaces
```
M4H8+H57          ✅ Fonctionne
M4H8 + H57        ✅ Fonctionne
m4h8+h57          ✅ Fonctionne (converti en majuscules)
```

## 🗺️ Exemples de Plus Codes à Bamako

Voici quelques exemples de Plus Codes pour des lieux connus à Bamako :

| Lieu | Plus Code | Coordonnées |
|------|-----------|-------------|
| Hippodrome | M4C3+CMP | 12.621, -8.046 |
| ACI 2000 | M4F4+X2 | 12.625, -7.995 |
| Point G | M4G6+7QJ | 12.626, -8.018 |
| Badalabougou | M4C8+VH | 12.622, -7.984 |
| Hamdallaye | M4F3+WR | 12.625, -8.046 |

## 🔍 Vérifier un Plus Code

Pour vérifier qu'un Plus Code est correct :

### Méthode 1 : Google Maps
1. Ouvrez Google Maps
2. Tapez le Plus Code dans la barre de recherche
3. Maps vous montre l'emplacement exact

### Méthode 2 : Plus.codes
1. Allez sur https://plus.codes
2. Entrez votre Plus Code
3. La carte vous montre l'emplacement

### Méthode 3 : Dans JigiFuel
1. Créez une station avec le Plus Code
2. Allez sur la carte d'accueil
3. Vérifiez que le marqueur est au bon endroit
4. Si incorrect, modifiez la station

## 🎨 Anatomie d'un Plus Code

Un Plus Code est composé de plusieurs parties :

```
M4H8+H57, Bamako, Mali
│││││││││  │       │
│││││││││  │       └─ Pays (optionnel)
│││││││││  └───────── Ville (optionnel)
││││││││└──────────── Code fin (2-3 caractères)
│││││││└───────────── Séparateur (+)
│││││└────────────── Code de grille (4 caractères)
└────────────────── Code de zone (4 caractères, optionnel pour codes courts)
```

### Précision

- **8 caractères** (ex: M4H8+H57) : ~14m × 14m
- **10 caractères** (ex: M4H8+H57Q) : ~3.5m × 3.5m
- **11+ caractères** : Encore plus précis

Pour les stations de carburant, **8 caractères suffisent** !

## 💡 Astuces

### 1. Sauvegardez vos Plus Codes
Créez une liste de Plus Codes pour vos stations fréquentes :
```
Station Total Hippodrome : M4C3+CMP
Station Shell ACI : M4F4+X2
Station Oryx Hamdallaye : M4F3+WR
```

### 2. Partagez facilement
Les Plus Codes sont faciles à partager par SMS, WhatsApp, etc.

### 3. Utilisez la recherche Google
Tapez simplement le Plus Code dans Google et il vous montrera l'emplacement !

### 4. Codes courts vs complets
- **Codes courts** (M4H8+H57) : Plus faciles à retenir
- **Codes complets** (7FWM4H8+H57) : Fonctionnent partout dans le monde

Pour Bamako, utilisez les **codes courts** !

## ⚠️ Erreurs Courantes

### Erreur 1 : Caractères invalides
```
❌ M4H8+057  (contient 0)
❌ M4H8+L57  (contient L)
✅ M4H8+H57  (tous les caractères sont valides)
```

**Caractères valides** : `23456789CFGHJMPQRVWX`

### Erreur 2 : Pas de séparateur
```
❌ M4H8H57   (manque le +)
✅ M4H8+H57  (avec le +)
```

### Erreur 3 : Mauvaise ville
```
❌ M4H8+H57, Paris      (code de Bamako, ville de Paris)
✅ M4H8+H57, Bamako     (cohérent)
```

### Erreur 4 : Coordonnées inversées
Si le marqueur apparaît au mauvais endroit :
- Vérifiez que vous avez copié le **Plus Code** et non les **coordonnées**
- Le Plus Code contient des lettres : `M4H8+H57`
- Les coordonnées sont des nombres : `12.6286, -8.0414`

## 🚀 Workflow Recommandé

### Pour Créer une Station

1. **Préparez les informations** :
   - Nom de la station
   - Code unique (ex: TOTAL-HIP)
   - Plus Code Google Maps

2. **Obtenez le Plus Code** :
   - Ouvrez Google Maps
   - Trouvez la station
   - Copiez le Plus Code

3. **Créez dans JigiFuel** :
   - Dashboard → Créer une Station
   - Collez le Plus Code
   - Cliquez sur "🔍 Trouver"
   - Vérifiez les coordonnées
   - Enregistrez

4. **Vérifiez sur la carte** :
   - Allez sur la page d'accueil
   - Vérifiez que le marqueur est bien placé
   - Testez le bouton "Démarrer le trajet"

## 📚 Ressources

- **Google Maps** : https://maps.google.com
- **Plus Codes** : https://plus.codes
- **Documentation** : https://maps.google.com/pluscodes/

---

**Avec les Plus Codes, créer des stations dans JigiFuel est simple et précis !** 🎯
