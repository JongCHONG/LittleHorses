# Little Horses

Une application de jeu de société construite avec Next.js, React, TypeScript et Tailwind CSS.

## 🚀 Migration vers Next.js

Ce projet a été migré de Vite vers Next.js 15 avec l'App Router pour bénéficier des dernières fonctionnalités et optimisations.

## 🛠️ Technologies utilisées

- **Next.js 15** - Framework React avec App Router
- **React 19** - Bibliothèque UI
- **TypeScript** - Typage statique
- **Tailwind CSS 4.x** - Framework CSS utilitaire
- **Redux Toolkit** - Gestion d'état
- **Framer Motion** - Animations
- **React Icons** - Icônes

## 📦 Installation et démarrage

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Construire pour la production
npm run build

# Lancer la version de production
npm start

# Vérifier le linting
npm run lint

# Vérifier les types TypeScript
npm run type-check
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000).

## 🏗️ Architecture du projet

```
├── app/                    # App Router de Next.js
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Page d'accueil
│   └── StoreProvider.tsx  # Fournisseur Redux
├── src/
│   ├── components/        # Composants React réutilisables
│   └── utils/            # Utilitaires, store Redux, types
├── public/               # Fichiers statiques
└── Configuration files
```

## 🎯 Fonctionnalités

- Interface de jeu interactive
- Gestion d'état avec Redux Toolkit
- Animations fluides avec Framer Motion
- Design responsive avec Tailwind CSS
- Support TypeScript complet
- Optimisations de performance Next.js

## 🔧 Configuration

- **Next.js**: Configuration dans `next.config.js`
- **TypeScript**: Configuration dans `tsconfig.json`
- **Tailwind CSS**: Configuration dans `tailwind.config.js`
- **PostCSS**: Configuration dans `postcss.config.js`
- **ESLint**: Configuration dans `.eslintrc.json`

## 📝 Notes de migration

- Migration réussie de Vite vers Next.js 15
- Conservation de tous les composants et utilitaires existants
- Mise à jour vers React 19 et Tailwind CSS 4.x
- Utilisation de l'App Router pour une meilleure structure
- Configuration optimisée pour les performances

## 🎮 Comment jouer

Le jeu suit les règles classiques des petits chevaux avec une interface moderne et interactive.
