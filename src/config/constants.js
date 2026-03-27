/**
 * Configuration Google Sheets
 */
export const SHEET_CONFIG = {
  SHEET_ID: "1ddbFAYQZfoZxoXsFb8zBun_jqdoyVRU1Sqino-d26HI",
  API_KEY: "AIzaSyCFFjXwy5MVYE561EA8t6K3qCNAhYEoKnU",
  RANGE: "Form Responses 1",
};

/**
 * Clés de colonnes Google Sheet
 */
export const SHEET_KEYS = {
  horodateur: "Horodateur",
  nom: "NOM ET PRÉNOMS",
  naissance: "DATE ET LIEU DE NAISSANCE",
  niveau: "NIVEAU D'ÉTUDES",
  filiere: "DOMAINE D'ETUDE",
  telephone: "NUMERO TELEPHONE",
  email: "EMAIL",
  formation: "FORMATION OU FILIÈRE SOLLICITÉE",
  heure: "HEURE DISPONIBLE APRÈS VALIDATION DU",
  emailAddr: "Adresse e-mail",
  option: "OPTION",  // Colonne pour le mode (En ligne / Présentiel)
};

/**
 * Variantes possibles pour les clés (pour gérer les problèmes d'accents)
 */
export const SHEET_KEYS_VARIANTS = {
  niveau: ["NIVEAU D'ÉTUDES", "NIVEAU D'ETUDES", "NIVEAU ETUDES", "NIVEAU"],
  filiere: ["DOMAINE D'ETUDE", "DOMAINE D'ÉTUDE", "FILLIERE", "FILIÈRE"],
  formation: ["FORMATION OU FILIÈRE SOLLICITÉE", "FORMATION OU FILIERE SOLLICITEE", "FORMATION"],
  option: ["OPTION", "MODE", "TYPE"],
};

/**
 * Ordre des niveaux d'études
 */
export const NIVEAU_ORDER = [
  "Master 1",
  "Master 2",
  "Doctorat",
];

/**
 * Options de navigation
 */
export const NAVIGATION_ITEMS = [
  { id: "dashboard", label: "Vue d'ensemble", icon: "LayoutDashboard" },
  { id: "table", label: "Liste candidats", icon: "Table2" },
];

/**
 * Options de source de données
 */
export const DATA_SOURCE_OPTIONS = [
  { label: "API Google Sheets", value: false, icon: "Wifi" },
];

/**
 * Delay d'animation pour les effets de fade
 */
export const FADE_DELAYS = {
  0: "0ms",
  1: "60ms",
  2: "120ms",
  3: "180ms",
  4: "240ms",
  5: "300ms",
  6: "360ms",
};
