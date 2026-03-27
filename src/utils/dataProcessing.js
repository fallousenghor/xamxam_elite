import { SHEET_KEYS, SHEET_KEYS_VARIANTS, NIVEAU_ORDER } from "../config/constants";

/**
 * Trouve la valeur d'une clé avec des variantes possibles (pour gérer les accents)
 */
function getFieldValue(row, key, variants = []) {
  // Essayez la clé principale d'abord
  if (row[key]) return row[key];
  
  // Essayez les variantes
  for (const variant of variants) {
    if (row[variant]) return row[variant];
  }
  
  // Cherchez une clé qui contient le mot principal
  const mainKey = Object.keys(row).find(k => 
    k.includes(key.split(' ')[0]) || variants.some(v => k.includes(v.split(' ')[0]))
  );
  if (mainKey) return row[mainKey];
  
  return "";
}

/**
 * Extrait le mode de formation (En ligne / Présentiel) depuis la valeur brute
 */
export function extractMode(val = "") {
  // Nettoyer la valeur (espaces, caractères spéciaux)
  const v = val.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  // Maintenant "présentiel" devient "presentiel", "pré" devient "pre"
  
  if (v.includes("en ligne")) return "En ligne";
  if (v.includes("presentiel")) return "Présentiel";
  
  return "Non précisé";
}

/**
 * Extrait le nom de la formation sans le mode
 */
export function extractFormation(val = "") {
  return (
    val
      .replace(/\s*[-–\/]\s*(en ligne|physique|présentiel|presentiel)/gi, "")
      .trim() || val
  );
}

/**
 * Compte les occurrences par clé
 */
export function countBy(data, key) {
  const map = {};
  data.forEach((r) => {
    const v = r[key] || "N/A";
    map[v] = (map[v] || 0) + 1;
  });
  return Object.entries(map)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}

/**
 * Enrichit les données brutes avec les champs dérivés
 */
export function enrichData(rows) {
  return rows.map((r) => ({
    ...r,
    // Le mode est dans la colonne "OPTION" (En ligne / Présentiel)
    _mode: extractMode(getFieldValue(r, SHEET_KEYS.option, SHEET_KEYS_VARIANTS.option)),
    // La formation est dans la colonne "FORMATION OU FILIÈRE SOLLICITÉE"
    _formation: extractFormation(getFieldValue(r, SHEET_KEYS.formation, SHEET_KEYS_VARIANTS.formation)),
    // Le niveau d'études
    _niveau: getFieldValue(r, SHEET_KEYS.niveau, SHEET_KEYS_VARIANTS.niveau),
  }));
}

/**
 * Filtre les données selon les critères
 */
export function filterData(data, search, filterFormation, filterMode) {
  const s = search.toLowerCase();
  return data.filter((r) => {
    const matchSearch =
      !s ||
      [
        r[SHEET_KEYS.nom],
        r[SHEET_KEYS.email],
        r[SHEET_KEYS.emailAddr],
        r[SHEET_KEYS.filiere],
        r._niveau || r[SHEET_KEYS.niveau],
        r._formation,
      ]
        .join(" ")
        .toLowerCase()
        .includes(s);

    const matchFormation =
      filterFormation === "Tous" || r._formation === filterFormation;
    const matchMode = filterMode === "Tous" || r._mode === filterMode;

    return matchSearch && matchFormation && matchMode;
  });
}

/**
 * Prépare les données de niveau triées selon l'ordre défini
 */
export function getNiveauData(filteredData) {
  const raw = countBy(filteredData, "_niveau");
  return NIVEAU_ORDER.map(
    (n) => ({ name: n, value: raw.find((x) => x.name === n)?.value || 0 })
  ).filter((d) => d.value > 0);
}
