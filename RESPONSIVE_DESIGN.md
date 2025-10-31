# Guide Responsive Design - JigiFuel

## 📱 Breakpoints Tailwind CSS

JigiFuel utilise les breakpoints standard de Tailwind CSS:

```
sm:  640px   (Téléphones en paysage, petites tablettes)
md:  768px   (Tablettes)
lg:  1024px  (Petits ordinateurs portables)
xl:  1280px  (Ordinateurs de bureau)
2xl: 1536px  (Grands écrans)
```

## ✅ Pages optimisées pour le responsive

Toutes les pages ont été optimisées pour fonctionner parfaitement sur tous les appareils:

### 1. Page d'accueil (/)
- **Mobile**: Grille 1 colonne, cartes empilées
- **Tablette**: Grille 2 colonnes
- **Desktop**: Grille 3 colonnes

### 2. Page About (/about)
- **Hero**: Texte adaptatif (4xl → 7xl)
- **Stats**: Grille 2 colonnes → 4 colonnes
- **Features**: 1 colonne → 2 → 4 colonnes
- **Sections**: Padding et spacing adaptatifs

### 3. Dashboard (/dashboard)
- **Formulaires**: Largeur complète sur mobile
- **Grilles de stations**: 1 → 2 → 3 colonnes
- **Boutons**: Empilés sur mobile, côte à côte sur desktop

### 4. Tickets (/tickets)
- **Cartes**: Largeur complète sur mobile
- **QR codes**: Taille adaptative
- **Boutons**: Largeur complète sur mobile

### 5. Navbar
- **Mobile**: Menu hamburger (à implémenter)
- **Desktop**: Navigation horizontale complète

## 🎨 Classes Tailwind utilisées

### Spacing adaptatif
```tsx
// Padding
py-8 sm:py-12 md:py-16 lg:py-24

// Margin
mb-4 sm:mb-6 md:mb-8

// Gap
gap-4 sm:gap-6 lg:gap-8
```

### Typography adaptative
```tsx
// Titres
text-3xl sm:text-4xl md:text-5xl lg:text-6xl

// Paragraphes
text-base sm:text-lg md:text-xl

// Petits textes
text-xs sm:text-sm md:text-base
```

### Grilles adaptatives
```tsx
// Colonnes
grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4

// Flex direction
flex-col sm:flex-row

// Items
items-start sm:items-center
```

### Largeurs adaptatives
```tsx
// Conteneurs
w-full sm:w-auto

// Max width
max-w-sm sm:max-w-md lg:max-w-4xl

// Padding horizontal
px-4 sm:px-6 lg:px-8
```

## 📐 Principes de design responsive

### 1. Mobile First
Toujours commencer par le design mobile, puis ajouter les breakpoints:

```tsx
// ❌ Mauvais
<div className="lg:text-base text-sm">

// ✅ Bon
<div className="text-sm lg:text-base">
```

### 2. Grilles flexibles
Utiliser des grilles qui s'adaptent:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Contenu */}
</div>
```

### 3. Images responsives
Toujours définir des dimensions adaptatives:

```tsx
<img 
  className="w-full h-auto max-w-md mx-auto"
  alt="Description"
/>
```

### 4. Typography fluide
Utiliser des tailles de texte qui s'adaptent:

```tsx
<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
  Titre
</h1>
```

### 5. Spacing cohérent
Maintenir des espacements proportionnels:

```tsx
<section className="py-12 sm:py-16 md:py-20 lg:py-24">
  <div className="px-4 sm:px-6 lg:px-8">
    {/* Contenu */}
  </div>
</section>
```

## 🔍 Tests responsive

### Outils de test

1. **Chrome DevTools**
   - F12 → Toggle Device Toolbar (Ctrl+Shift+M)
   - Tester différents appareils
   - Vérifier les breakpoints

2. **Firefox Responsive Design Mode**
   - Ctrl+Shift+M
   - Tester différentes résolutions

3. **Appareils réels**
   - Tester sur de vrais téléphones
   - Tester sur tablettes
   - Tester sur différents navigateurs

### Checklist de test

- [ ] iPhone SE (375px)
- [ ] iPhone 12/13 (390px)
- [ ] iPhone 12/13 Pro Max (428px)
- [ ] iPad Mini (768px)
- [ ] iPad Pro (1024px)
- [ ] Desktop 1280px
- [ ] Desktop 1920px

## 🎯 Points d'attention

### Navigation
```tsx
// Mobile: Menu hamburger
<div className="md:hidden">
  {/* Menu mobile */}
</div>

// Desktop: Menu horizontal
<div className="hidden md:flex">
  {/* Menu desktop */}
</div>
```

### Formulaires
```tsx
// Largeur complète sur mobile
<input className="w-full sm:w-auto" />

// Boutons empilés sur mobile
<div className="flex flex-col sm:flex-row gap-4">
  <button>Bouton 1</button>
  <button>Bouton 2</button>
</div>
```

### Cartes
```tsx
// Padding adaptatif
<Card className="p-4 sm:p-6 lg:p-8">
  {/* Contenu */}
</Card>
```

### Modales
```tsx
// Largeur adaptative
<div className="w-full sm:max-w-md md:max-w-lg lg:max-w-2xl">
  {/* Contenu modal */}
</div>
```

## 🚀 Optimisations

### 1. Lazy Loading
```tsx
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('@/components/map'), { 
  ssr: false 
});
```

### 2. Images optimisées
```tsx
import Image from 'next/image';

<Image
  src="/image.jpg"
  width={800}
  height={600}
  alt="Description"
  className="w-full h-auto"
/>
```

### 3. Conditional Rendering
```tsx
// Afficher différent contenu selon la taille
{isMobile ? <MobileView /> : <DesktopView />}
```

## 📱 Composants responsive

### Button
```tsx
// Largeur complète sur mobile
<Button className="w-full sm:w-auto">
  Cliquez ici
</Button>
```

### Card
```tsx
// Padding adaptatif
<Card className="p-4 sm:p-6 lg:p-8">
  <CardContent className="space-y-4 sm:space-y-6">
    {/* Contenu */}
  </CardContent>
</Card>
```

### Input
```tsx
// Taille de texte adaptative
<Input 
  className="text-sm sm:text-base"
  placeholder="Entrez votre texte"
/>
```

## 🎨 Exemples pratiques

### Hero Section
```tsx
<section className="py-12 sm:py-16 md:py-20 lg:py-32">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
      Titre principal
    </h1>
    <p className="text-base sm:text-lg md:text-xl mt-4 sm:mt-6">
      Description
    </p>
    <div className="flex flex-col sm:flex-row gap-4 mt-8">
      <Button className="w-full sm:w-auto">CTA 1</Button>
      <Button className="w-full sm:w-auto">CTA 2</Button>
    </div>
  </div>
</section>
```

### Grid de cartes
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
  {items.map((item) => (
    <Card key={item.id} className="p-4 sm:p-6">
      {/* Contenu */}
    </Card>
  ))}
</div>
```

### Formulaire
```tsx
<form className="space-y-4 sm:space-y-6">
  <Input 
    label="Nom"
    className="w-full"
  />
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <Input label="Prénom" />
    <Input label="Email" />
  </div>
  <div className="flex flex-col sm:flex-row gap-4">
    <Button type="submit" className="w-full sm:flex-1">
      Envoyer
    </Button>
    <Button type="button" variant="outline" className="w-full sm:flex-1">
      Annuler
    </Button>
  </div>
</form>
```

## ✅ Bonnes pratiques

1. **Toujours tester sur mobile d'abord**
2. **Utiliser des unités relatives (rem, %, vh/vw)**
3. **Éviter les largeurs fixes en pixels**
4. **Utiliser flexbox et grid pour les layouts**
5. **Optimiser les images pour chaque taille**
6. **Tester sur de vrais appareils**
7. **Vérifier les performances sur mobile**
8. **Assurer la lisibilité du texte (min 16px)**
9. **Espacement tactile suffisant (min 44x44px)**
10. **Tester l'orientation paysage**

## 🔧 Outils utiles

- **Tailwind CSS IntelliSense**: Extension VS Code
- **Responsive Viewer**: Extension Chrome
- **BrowserStack**: Tests multi-appareils
- **Chrome DevTools**: Device Mode
- **Lighthouse**: Audit de performance

---

**Développé par Florynx Labs SARL**
