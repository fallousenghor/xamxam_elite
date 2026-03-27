import { useMemo } from "react";
import { SHEET_KEYS } from "../config/constants";
import { enrichData, filterData, countBy, getNiveauData } from "../utils/dataProcessing";

/**
 * Hook personnalisé pour traiter et filtrer les données
 */
export function useFilteredData(rows, search, filterFormation, filterMode) {
  // Enrichir les données avec les champs dérivés
  const enriched = useMemo(() => enrichData(rows), [rows]);

  // Obtenir la liste unique des formations
  const allFormations = useMemo(
    () => ["Tous", ...new Set(enriched.map((r) => r._formation).filter(Boolean))],
    [enriched]
  );

  // Filtrer les données
  const filtered = useMemo(
    () => filterData(enriched, search, filterFormation, filterMode),
    [enriched, search, filterFormation, filterMode]
  );

  // Préparer les données pour les graphiques
  const formationData = useMemo(
    () => countBy(filtered, "_formation"),
    [filtered]
  );

  const modeData = useMemo(
    () => countBy(filtered, "_mode"),
    [filtered]
  );

  const niveauData = useMemo(
    () => getNiveauData(filtered),
    [filtered]
  );

  const filiereData = useMemo(
    () => countBy(filtered, SHEET_KEYS.filiere).slice(0, 5),
    [filtered]
  );

  // Calculer les statistiques
  const stats = useMemo(
    () => ({
      enLigne: filtered.filter((r) => r._mode === "En ligne").length,
      presentiel: filtered.filter((r) => r._mode === "Présentiel").length,
      total: filtered.length || 1,
    }),
    [filtered]
  );

  return {
    enriched,
    allFormations,
    filtered,
    formationData,
    modeData,
    niveauData,
    filiereData,
    stats,
  };
}
