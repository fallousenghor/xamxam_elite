# FormTrack - Dashboard de Gestion des Formations

Un tableau de bord React moderne pour visualiser et gérer les candidatures aux formations.

## 🚀 Fonctionnalités

- **Vue d'ensemble** : Statistiques et graphiques interactifs
  - Total candidats
  - Répartition En ligne / Présentiel
  - Formations demandées
  - Niveaux d'études
  - Top filières

- **Liste des candidats** : Tableau détaillé avec
  - Recherche en temps réel
  - Filtres par formation
  - Informations complètes (nom, contact, niveau, filière)

- **Thèmes** : Mode sombre / Mode clair
- **Sources de données** : 
  - Données démo intégrées
  - API Google Sheets (à configurer)

## 📦 Installation

```bash
cd form-dashboard
npm install
```

## 🏃 Démarrage

```bash
npm run dev
```

L'application sera disponible sur `http://localhost:5173`

## 🔧 Configuration Google Sheets

Pour utiliser l'API Google Sheets :

1. Créez un Google Sheet avec vos données de formulaire
2. Activez l'API Google Sheets dans Google Cloud Console
3. Créez une clé API
4. Dans `src/components/FormationsDashboard.jsx`, modifiez :

```javascript
const SHEET_ID = "VOTRE_SHEET_ID";
const API_KEY  = "VOTRE_CLE_API";
const RANGE    = "Form Responses 1";
```

## 📁 Structure du projet

```
form-dashboard/
├── src/
│   ├── components/
│   │   └── FormationsDashboard.jsx   # Composant principal
│   ├── App.jsx                       # Composant App
│   ├── main.jsx                      # Point d'entrée
│   └── index.css                     # Styles globaux
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🛠️ Technologies

- **React 18** - Bibliothèque UI
- **Vite** - Build tool
- **Recharts** - Graphiques
- **Lucide React** - Icônes

## 📊 Données de démonstration

Le projet inclut 20 candidatures de démonstration pour tester toutes les fonctionnalités sans configuration externe.

## 🎨 Personnalisation

Les thèmes sont définis dans l'objet `THEMES` du composant `FormationsDashboard.jsx`. Vous pouvez modifier les couleurs, polices et styles selon vos besoins.
