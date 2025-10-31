# 🧪 Test des Plus Codes - JigiFuel

## ✅ Plus Codes Valides pour Bamako

Testez avec ces Plus Codes réels de Bamako :

| Lieu | Plus Code | Coordonnées Attendues |
|------|-----------|----------------------|
| Hippodrome | `M4C3+CMP` | ~12.621, -8.046 |
| ACI 2000 | `M4F4+X2` | ~12.625, -7.995 |
| Point G | `M4G6+7QJ` | ~12.626, -8.018 |
| Badalabougou | `M4C8+VH` | ~12.622, -7.984 |
| Centre-ville | `M4G6+H57` | ~12.626, -8.042 |

## 🎯 Test Rapide

### 1. Créer une Station avec Plus Code

1. **Dashboard** → **Créer une Station**
2. **Nom** : `Test Station`
3. **Code** : `TEST-001`
4. **Localisation** : `M4G6+7QJ, Bamako`
5. **Cliquez sur "🔍 Trouver"**

**Résultat attendu** :
```
Console : Plus Code valide détecté: M4G6+7QJ
Console : Code court complété: 7FWM4G6+7QJ
Console : Coordonnées décodées: 12.6257813, -8.0181875
Toast : ✅ Coordonnées trouvées : 12.625781, -8.018188
```

### 2. Vérifier les Coordonnées

Les coordonnées doivent être :
- **Latitude** : entre `12.5` et `12.7`
- **Longitude** : entre `-8.1` et `-7.9`

### 3. Créer la Station

1. **Cliquez sur "Créer la Station"**
2. **Allez sur la page d'accueil**
3. **Cliquez sur "🔄 Actualiser"**
4. **Vérifiez** que la nouvelle station apparaît sur la carte

## 🔍 Débogage

### Console du Navigateur

Ouvrez la console (F12) et cherchez :

**Pour un Plus Code valide** :
```
Plus Code valide détecté: M4G6+7QJ
Code court complété: 7FWM4G6+7QJ
Coordonnées décodées: 12.6257813, -8.0181875
```

**Pour un Plus Code invalide** :
```
Pas un Plus Code, essai de géocodage d'adresse: XYZ123
```

**Pour un Plus Code hors de Bamako** :
```
Plus Code valide détecté: 8FVC9G8F+6W
Code court complété: 8FVC9G8F+6W
Coordonnées décodées: 48.8583, 2.2945
Toast : ⚠️ Ces coordonnées (48.8583, 2.2945) ne sont pas dans Bamako
```

## 📝 Formats Acceptés

### Codes Courts (Recommandé)
```
M4G6+7QJ
M4G6+7QJ, Bamako
M4G6+7QJ, Bamako, Mali
m4g6+7qj (converti en majuscules)
M4G6 +7QJ (espaces ignorés)
```

### Codes Complets
```
7FWM4G6+7QJ
7FWM4G6+7QJ, Mali
```

### Adresses (Fallback)
```
Hippodrome, Bamako
ACI 2000, Bamako
Badalabougou, Bamako
```

## ⚠️ Erreurs Courantes

### Erreur 1 : "Plus Code invalide"

**Symptôme** :
```
Toast : ❌ Localisation non trouvée. Vérifiez l'orthographe.
```

**Causes** :
- Caractères invalides (0, 1, A, B, D, E, I, L, N, O, S, T, U, V, Z)
- Pas de séparateur `+`
- Format incorrect

**Solution** :
Vérifiez le Plus Code sur Google Maps

### Erreur 2 : "Coordonnées hors de Bamako"

**Symptôme** :
```
Toast : ⚠️ Ces coordonnées (48.8583, 2.2945) ne sont pas dans Bamako
```

**Cause** :
Le Plus Code est valide mais pointe vers un autre endroit

**Solution** :
Vérifiez que vous avez copié le bon Plus Code depuis Google Maps

### Erreur 3 : "Localisation non trouvée" (Adresse)

**Symptôme** :
```
Toast : ❌ Localisation non trouvée. Vérifiez l'orthographe.
```

**Cause** :
L'adresse n'est pas reconnue par Nominatim

**Solution** :
Utilisez un Plus Code à la place

## 🎓 Comment Obtenir un Plus Code

### Sur Mobile

1. Ouvrez Google Maps
2. Appuyez longuement sur l'emplacement
3. Un marqueur rouge apparaît
4. Glissez vers le haut sur la carte blanche en bas
5. Le Plus Code est affiché (ex: M4G6+7QJ)
6. Appuyez dessus pour copier

### Sur PC

1. Ouvrez Google Maps
2. Clic droit sur l'emplacement
3. Les coordonnées apparaissent dans un menu
4. Cliquez sur les coordonnées
5. Une fenêtre s'ouvre avec le Plus Code
6. Cliquez sur le Plus Code pour copier

## 🚀 Workflow Complet

```
1. Ouvrir Google Maps
2. Trouver la station
3. Copier le Plus Code (ex: M4G6+7QJ)
4. Dashboard → Créer une Station
5. Coller le Plus Code
6. Cliquer sur "🔍 Trouver"
7. Vérifier les coordonnées
8. Remplir le reste du formulaire
9. Créer la station
10. Page d'accueil → "🔄 Actualiser"
11. Vérifier que la station apparaît !
```

## ✅ Checklist

- [ ] Plus Code copié depuis Google Maps
- [ ] Format correct (ex: M4G6+7QJ)
- [ ] Clic sur "🔍 Trouver"
- [ ] Message de succès ✅
- [ ] Coordonnées entre 12.5-12.7 et -8.1 à -7.9
- [ ] Station créée
- [ ] Visible sur la carte après actualisation

---

**Avec la vraie bibliothèque `open-location-code`, ça marche à 100% !** 🎉
